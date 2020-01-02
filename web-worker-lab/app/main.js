(() => {
  const worker = new Worker('/worker.js');
  console.log(worker);
  const form = document.getElementById('form');
  const submit = document.getElementById('submit');
  const results = document.getElementById('results');

  const sendResults = (event) => {
    console.log(event);
    const formData = new FormData(form);
    const breakdownText = formData.get('breakdown text');

    worker.postMessage({breakdownText});

    event.preventDefault();
  };

  const generateResults = (event) => {
    console.log('from worker', event);
    const listItems = event.data.reduce((acc, item) => `${acc}<li>${item}</li>`, '');
    results.innerHTML = listItems;
  };


  worker.onmessage = generateResults;
  worker.onerror = error => console.error(error);
  form.addEventListener('submit', sendResults);
})();
