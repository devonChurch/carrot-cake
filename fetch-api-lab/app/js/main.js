/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.error(error);
}


// Fetch JSON ----------

function fetchJSON() {
  fetch('./examples/animals.json')
    .then(response => {
      isError = !response.ok;
      if(isError) throw new Error(response.statusText);
      return response;
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(logError)
}
// async function fetchJSON() {
//   try {
//     const response = await fetch('./examples/animals.json');
//     console.log(response);
//   } catch(error) {
//     console.error(error);
//   }
// }
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------

function fetchImage() {
  fetch('./examples/fetching.jpg')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(response => response.blob())
    .then(blob => {
      // console.log(blob) // { ... }
      // console.log(src); // blob:http://localhost:8080/69f9192e-101c-4448-90cd-d3994d7a8586
      const imgNode = document.createElement('img');
      imgNode.src = window.URL.createObjectURL(blob);
      document.getElementById('img-container').appendChild(imgNode);
    })
    .catch(error => console.error(error));
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------

async function fetchText() {
  try {
    const response = await fetch('./examples/words.txt');
    if (!response.ok) throw new Error(response.statusText);
    const text = await response.text();
    document.getElementById('message').append(text);
  } catch (error) {
    console.error(error);
  }
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// HEAD request ----------

function headRequest() {
  fetch('./examples/fetching.jpg', {
    method: 'HEAD'
  })
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
      console.log(response.headers.get('content-length')); // 66139 (bytes)
    })
    .catch(error => console.error(error))
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
  fetch('http://localhost:5000/', {
    method: 'POST',
    body: new FormData(document.getElementById('msg-form')), // 'name=david&message=hello'
    // mode: 'no-cors'
    headers: {
      potato: 'banana'
    }
  })
  .then(response => {
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);
    return response;
  })
  .then(response => console.log(response))
  .catch(error => console.error(error))
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);
