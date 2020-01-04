onmessage = event => {
  console.log("from browser", event);
  const quantity = Number(event.data.quantity);
  const createRandomNumber = (from, to) =>
    Math.ceil(Math.random() * (to - from) + from);
  const createItem = () => ({ value: createRandomNumber(100000, 999999) });
  const items = new Array(quantity).fill().map(createItem);

  postMessage(items);
};
