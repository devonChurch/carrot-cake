/*
Copyright 2016 Google Inc.

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

var DEFAULT_ITEMS = [
    {
      name: 'Couch',
      id: 'cch-blk-ma',
      price: 499.99,
      color: 'black',
      material: 'mahogany',
      description: 'A very comfy couch',
      quantity: 3
    },
    {
      name: 'Armchair',
      id: 'ac-gr-pin',
      price: 299.99,
      color: 'grey',
      material: 'pine',
      description: 'A plush recliner armchair',
      quantity: 7
    },
    {
      name: 'Stool',
      id: 'st-re-pin',
      price: 59.99,
      color: 'red',
      material: 'pine',
      description: 'A light, high-stool',
      quantity: 3
    },
    {
      name: 'Chair',
      id: 'ch-blu-pin',
      price: 49.99,
      color: 'blue',
      material: 'pine',
      description: 'A plain chair for the kitchen table',
      quantity: 1
    },
    {
      name: 'Dresser',
      id: 'dr-wht-ply',
      price: 399.99,
      color: 'white',
      material: 'plywood',
      description: 'A plain dresser with five drawers',
      quantity: 4
    },
    {
      name: 'Cabinet',
      id: 'ca-brn-ma',
      price: 799.99,
      color: 'brown',
      material: 'mahogany',
      description: 'An intricately-designed, antique cabinet',
      quantity: 11
    }
  ];

const DB_VERSION = 4;
const DB_NAME = 'couches-n-things';

window.idbApp = (function() {
  'use strict';

  // TODO 2 - check for support
  if(!('indexedDB' in window)) {
    console.warn('your browser does not support indexedDB');
    return;
  }

  const { openDB, deleteDB, unwrap, wrap } = window.idb;

  var dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade: (db, oldVersion, newVersion, tx) => {
      console.log('upgrade', {db, oldVersion, newVersion, tx});
      if (!oldVersion) {
        console.log('first time to init');
        const store = db.createObjectStore('products', {keyPath: 'id'});
      }

      console.log('add indexes');
      tx.store.createIndex('name', 'name', {unique: true});
      tx.store.createIndex('price', 'price');
      tx.store.createIndex('description', 'description');
    }
  });
  // console.log('dbPromise', dbPromise);

  const addProducts = async () => {
    console.log('addProducts');

    // TODO 3.3 - add objects to the products store

    try {
      const db = await dbPromise;
      const tx = db.transaction('products', 'readwrite');

      DEFAULT_ITEMS.map(item => tx.store.put(item));
      await tx.done;

      // Shortcut...
      // const updates = DEFAULT_ITEMS.map(item => db.put('products', item));
      // await Promise.all(updates);

    } catch (error) {
      console.error(error);
    }
  }

  const getByName = async (key) => {

    console.log('getByName', key);

    // TODO 4.3 - use the get method to get an object by name

    try {
      const db = await dbPromise;
      const tx = db.transaction('products', 'readonly');
      let items = await tx.store.index('name').openCursor('Chair');

      while(items.request) {
        console.log(items.key, items.value);
        await items.continue();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function displayByName() {
    var key = document.getElementById('name').value;
    if (key === '') {return;}
    var s = '';
    getByName(key).then(function(object) {
      if (!object) {return;}

      s += '<h2>' + object.name + '</h2><p>';
      for (var field in object) {
        s += field + ' = ' + object[field] + '<br/>';
      }
      s += '</p>';

    }).then(function() {
      if (s === '') {s = '<p>No results.</p>';}
      document.getElementById('results').innerHTML = s;
    });
  }

  const getByPrice = async () => {

    console.log('getByPrice');

    // TODO 4.4a - use a cursor to get objects by price


    try {
      const db = await dbPromise;
      const tx = db.transaction('products', 'readonly');
      const range = IDBKeyRange.bound(300, 500)
      let items = await tx.store.index('price').openCursor(range);

      while(items.request) {
        console.log(items.key, items.value);
        await items.continue();
      }

    } catch (error) {
      console.error(error);
    }

  }

  function getByDesc() {
    var key = document.getElementById('desc').value;
    if (key === '') {return;}
    var range = IDBKeyRange.only(key);
    var s = '';
    dbPromise.then(function(db) {

      // TODO 4.4b - get items by their description

    }).then(function() {
      if (s === '') {s = '<p>No results.</p>';}
      document.getElementById('results').innerHTML = s;
    });
  }

  function addOrders() {

    // TODO 5.2 - add items to the 'orders' object store

  }

  function showOrders() {
    var s = '';
    dbPromise.then(function(db) {

      // TODO 5.3 - use a cursor to display the orders on the page

    }).then(function() {
      if (s === '') {s = '<p>No results.</p>';}
      document.getElementById('orders').innerHTML = s;
    });
  }

  function getOrders() {

    // TODO 5.4 - get all objects from 'orders' object store

  }

  function fulfillOrders() {
    getOrders().then(function(orders) {
      return processOrders(orders);
    }).then(function(updatedProducts) {
      updateProductsStore(updatedProducts);
    });
  }

  function processOrders(orders) {

    // TODO 5.5 - get items in the 'products' store matching the orders

  }

  function decrementQuantity(product, order) {

    // TODO 5.6 - check the quantity of remaining products

  }

  function updateProductsStore(products) {
    dbPromise.then(function(db) {

      // TODO 5.7 - update the items in the 'products' object store

    }).then(function() {
      console.log('Orders processed successfully!');
      document.getElementById('receipt').innerHTML =
      '<h3>Order processed successfully!</h3>';
    });
  }

  return {
    dbPromise: (dbPromise),
    addProducts: (addProducts),
    getByName: (getByName),
    displayByName: (displayByName),
    getByPrice: (getByPrice),
    getByDesc: (getByDesc),
    addOrders: (addOrders),
    showOrders: (showOrders),
    getOrders: (getOrders),
    fulfillOrders: (fulfillOrders),
    processOrders: (processOrders),
    decrementQuantity: (decrementQuantity),
    updateProductsStore: (updateProductsStore)
  };
})();
