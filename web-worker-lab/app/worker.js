 onmessage = (event) => {
   console.log('from client', event);
   const result = event.data.breakdownText.split('').filter(char => char);
   postMessage(result);
 }
