const NAME = "form-validation";
const COLLECTION = "items";
const VERSION = 1;
const IDB = `${NAME}-${VERSION}`;

(async () => {
  console.log("init");

  const { openDB, deleteDB, wrap, unwrap } = window.idb;
  const worker = new Worker("/worker.js");
  const indexdb = openDB(NAME, VERSION, {
    upgrade(db) {
      // object store (collection)
      // - transaction
      //   - store
      db.createObjectStore(COLLECTION, { keyPath: "value" });
    }
  });
  const $queryForm = document.getElementById("queryForm");
  const $queryInputs = $queryForm.querySelectorAll("input");
  const $password = $queryForm.querySelector("#password");
  const $curateForm = document.getElementById("curateForm");
  const $lessThan = $curateForm.querySelector("#lessThan");
  const $itemList = document.getElementById("item-list");

  const validatePassword = () => {
    const { value } = $password;
    const minLength = 5;
    const maxLength = 10;
    const hasLength = value.length > minLength && value.length < maxLength;
    const hasNumber = /[0-9]/.test(value);
    const isValid = hasLength && hasNumber;
    const message = (() => {
      switch (false) {
        case hasLength:
          return `Must have a length between ${minLength} and ${maxLength}`;
        case hasNumber:
          return "Must have at least one number";
        default:
          return "";
      }
    })();

    $password.setCustomValidity(message);
  };

  const addAttemptedFlag = event =>
    event.target.classList.add("input--attempted");

  const submitQueryForm = event => {
    $queryForm.classList.add("form--attempted");
    const formData = new FormData($queryForm);
    const postData = [...formData.entries()].reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );

    // fetch('/spacial-endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify(postData)
    // });

    worker.postMessage(postData);
    event.preventDefault();
  };

  const curateListItems = async items => {
    const lessThan = Number($lessThan.value);
    if (!lessThan) return items;

    console.log("curate", lessThan);
    const db = await indexdb;
    const tx = db.transaction(COLLECTION, "readonly");
    const store = tx.store;
    const range = IDBKeyRange.upperBound(lessThan, true);
    // let cursor = store.index('value').openCursor(range);
    let cursor = await store.openCursor(range);
    const curatedItems = [];

    console.log("cursor", cursor);

    while (cursor) {
      console.log(cursor);
      curatedItems.push(cursor.value);
      cursor = await cursor.continue();
    }

    await tx.done;
    return curatedItems;
  };

  const buildItemList = items => {
    console.log("building", items);
    const createItem = value => `<li class="item">${value}</li>`;
    const html = items.reduce(
      (acc, { value }) => `${acc}${createItem(value)}`,
      ""
    );

    $itemList.innerHTML = html;
  };

  const handleWorkerResponse = async event => {
    console.log("from worker", event);
    //
    const db = await indexdb;
    const tx = db.transaction(COLLECTION, "readwrite");
    const store = tx.store;

    store.clear();
    event.data.map(async item => {
      return await store.add(item);
    });
    await tx.done;
    buildItemList(await curateListItems(event.data));
  };

  const setupInitialItemList = async () => {
    const db = await indexdb;
    const tx = db.transaction(COLLECTION, "readonly");
    const store = tx.store;
    const items = await store.getAll();

    await tx.done;
    buildItemList(await curateListItems(items));
  };

  const submitCurateForm = event => {
    event.preventDefault();
    const { value } = $lessThan;
    const { protocol, host, pathname } = window.location;
    const newUrl = `${pathname}?lt=${$lessThan.value}`;

    history.replaceState({}, "", newUrl);
    setupInitialItemList();
  };

  const setupInitialLessThan = () => {
    const queryString = window.location.search.substring(1);
    const lessThan = new URLSearchParams(queryString).get("lt") || "";

    $lessThan.value = lessThan;
  };

  worker.onmessage = handleWorkerResponse;
  $password.addEventListener("input", validatePassword);
  $queryInputs.forEach($input =>
    $input.addEventListener("blur", addAttemptedFlag)
  );
  $queryForm.addEventListener("submit", submitQueryForm);
  $curateForm.addEventListener("submit", submitCurateForm);
  setupInitialLessThan();
  setupInitialItemList();
})();
