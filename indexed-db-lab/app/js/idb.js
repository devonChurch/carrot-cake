// var idb=function(e){"use strict";const t=(e,t)=>t.some(t=>e instanceof t);let n,r;const o=new WeakMap,s=new WeakMap,a=new WeakMap,i=new WeakMap,c=new WeakMap;let u={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return s.get(e);if("objectStoreNames"===t)return e.objectStoreNames||a.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(e[t])},has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function d(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(r||(r=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(l(this),t),p(o.get(this))}:function(...t){return p(e.apply(l(this),t))}:function(t,...n){const r=e.call(l(this),t,...n);return a.set(r,t.sort?t.sort():[t]),p(r)}}function f(e){return"function"==typeof e?d(e):(e instanceof IDBTransaction&&function(e){if(s.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{t(),r()},s=()=>{n(e.error),r()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});s.set(e,t)}(e),t(e,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,u):e)}function p(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{t(p(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&o.set(t,e)}).catch(()=>{}),c.set(t,e),t}(e);if(i.has(e))return i.get(e);const t=f(e);return t!==e&&(i.set(e,t),c.set(t,e)),t}const l=e=>c.get(e);const D=["get","getKey","getAll","getAllKeys","count"],v=["put","add","delete","clear"],B=new Map;function I(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(B.get(t))return B.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=v.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!D.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,o?"readwrite":"readonly");let a=s.store;r&&(a=a.index(t.shift()));const i=a[n](...t);return o&&await s.done,i};return B.set(t,s),s}return u=(e=>({get:(t,n,r)=>I(t,n)||e.get(t,n,r),has:(t,n)=>!!I(t,n)||e.has(t,n)}))(u),e.openDB=function(e,t,{blocked:n,upgrade:r,blocking:o}={}){const s=indexedDB.open(e,t),a=p(s);return r&&s.addEventListener("upgradeneeded",e=>{r(p(s.result),e.oldVersion,e.newVersion,p(s.transaction))}),n&&s.addEventListener("blocked",()=>n()),o&&a.then(e=>e.addEventListener("versionchange",o)).catch(()=>{}),a},e.deleteDB=function(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",()=>t()),p(n).then(()=>void 0)},e.unwrap=l,e.wrap=p,e}({});


var idb=function(e){"use strict";const t=(e,t)=>t.some(t=>e instanceof t);let n,r;const o=new WeakMap,s=new WeakMap,a=new WeakMap,i=new WeakMap,c=new WeakMap;let u={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return s.get(e);if("objectStoreNames"===t)return e.objectStoreNames||a.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return l(e[t])},has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function d(e){u=e(u)}function f(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(r||(r=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(D(this),t),l(o.get(this))}:function(...t){return l(e.apply(D(this),t))}:function(t,...n){const r=e.call(D(this),t,...n);return a.set(r,t.sort?t.sort():[t]),l(r)}}function p(e){return"function"==typeof e?f(e):(e instanceof IDBTransaction&&function(e){if(s.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{t(),r()},s=()=>{n(e.error),r()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});s.set(e,t)}(e),t(e,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,u):e)}function l(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{t(l(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&o.set(t,e)}).catch(()=>{}),c.set(t,e),t}(e);if(i.has(e))return i.get(e);const t=p(e);return t!==e&&(i.set(e,t),c.set(t,e)),t}const D=e=>c.get(e);const I=["get","getKey","getAll","getAllKeys","count"],B=["put","add","delete","clear"],v=new Map;function g(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(v.get(t))return v.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=B.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!I.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,o?"readwrite":"readonly");let a=s.store;r&&(a=a.index(t.shift()));const i=a[n](...t);return o&&await s.done,i};return v.set(t,s),s}d(e=>({get:(t,n,r)=>g(t,n)||e.get(t,n,r),has:(t,n)=>!!g(t,n)||e.has(t,n)}));const y=["continue","continuePrimaryKey","advance"],b={},h=new WeakMap,m=new WeakMap,w={get(e,t){if(!y.includes(t))return e[t];let n=b[t];return n||(n=b[t]=function(...e){h.set(this,m.get(this)[t](...e))}),n}};async function*E(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const n=new Proxy(t,w);for(m.set(n,t),c.set(n,D(t));t;)yield n,t=await(h.get(n)||t.continue()),h.delete(n)}function L(e,n){return n===Symbol.asyncIterator&&t(e,[IDBIndex,IDBObjectStore,IDBCursor])||"iterate"===n&&t(e,[IDBIndex,IDBObjectStore])}return d(e=>({get:(t,n,r)=>L(t,n)?E:e.get(t,n,r),has:(t,n)=>L(t,n)||e.has(t,n)})),e.openDB=function(e,t,{blocked:n,upgrade:r,blocking:o}={}){const s=indexedDB.open(e,t),a=l(s);return r&&s.addEventListener("upgradeneeded",e=>{r(l(s.result),e.oldVersion,e.newVersion,l(s.transaction))}),n&&s.addEventListener("blocked",()=>n()),o&&a.then(e=>e.addEventListener("versionchange",o)).catch(()=>{}),a},e.deleteDB=function(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",()=>t()),l(n).then(()=>void 0)},e.unwrap=D,e.wrap=l,e}({});



// /*
// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// */
// 'use strict';
//
// (function() {
//   function toArray(arr) {
//     return Array.prototype.slice.call(arr);
//   }
//
//   function promisifyRequest(request) {
//     return new Promise(function(resolve, reject) {
//       request.onsuccess = function() {
//         resolve(request.result);
//       };
//
//       request.onerror = function() {
//         reject(request.error);
//       };
//     });
//   }
//
//   function promisifyRequestCall(obj, method, args) {
//     var request;
//     var p = new Promise(function(resolve, reject) {
//       request = obj[method].apply(obj, args);
//       promisifyRequest(request).then(resolve, reject);
//     });
//
//     p.request = request;
//     return p;
//   }
//
//   function promisifyCursorRequestCall(obj, method, args) {
//     var p = promisifyRequestCall(obj, method, args);
//     return p.then(function(value) {
//       if (!value) return;
//       return new Cursor(value, p.request);
//     });
//   }
//
//   function proxyProperties(ProxyClass, targetProp, properties) {
//     properties.forEach(function(prop) {
//       Object.defineProperty(ProxyClass.prototype, prop, {
//         get: function() {
//           return this[targetProp][prop];
//         }
//       });
//     });
//   }
//
//   function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
//     properties.forEach(function(prop) {
//       if (!(prop in Constructor.prototype)) return;
//       ProxyClass.prototype[prop] = function() {
//         return promisifyRequestCall(this[targetProp], prop, arguments);
//       };
//     });
//   }
//
//   function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
//     properties.forEach(function(prop) {
//       if (!(prop in Constructor.prototype)) return;
//       ProxyClass.prototype[prop] = function() {
//         return this[targetProp][prop].apply(this[targetProp], arguments);
//       };
//     });
//   }
//
//   function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
//     properties.forEach(function(prop) {
//       if (!(prop in Constructor.prototype)) return;
//       ProxyClass.prototype[prop] = function() {
//         return promisifyCursorRequestCall(this[targetProp], prop, arguments);
//       };
//     });
//   }
//
//   function Index(index) {
//     this._index = index;
//   }
//
//   proxyProperties(Index, '_index', [
//     'name',
//     'keyPath',
//     'multiEntry',
//     'unique'
//   ]);
//
//   proxyRequestMethods(Index, '_index', IDBIndex, [
//     'get',
//     'getKey',
//     'getAll',
//     'getAllKeys',
//     'count'
//   ]);
//
//   proxyCursorRequestMethods(Index, '_index', IDBIndex, [
//     'openCursor',
//     'openKeyCursor'
//   ]);
//
//   function Cursor(cursor, request) {
//     this._cursor = cursor;
//     this._request = request;
//   }
//
//   proxyProperties(Cursor, '_cursor', [
//     'direction',
//     'key',
//     'primaryKey',
//     'value'
//   ]);
//
//   proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
//     'update',
//     'delete'
//   ]);
//
//   // proxy 'next' methods
//   ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
//     if (!(methodName in IDBCursor.prototype)) return;
//     Cursor.prototype[methodName] = function() {
//       var cursor = this;
//       var args = arguments;
//       return Promise.resolve().then(function() {
//         cursor._cursor[methodName].apply(cursor._cursor, args);
//         return promisifyRequest(cursor._request).then(function(value) {
//           if (!value) return;
//           return new Cursor(value, cursor._request);
//         });
//       });
//     };
//   });
//
//   function ObjectStore(store) {
//     this._store = store;
//   }
//
//   ObjectStore.prototype.createIndex = function() {
//     return new Index(this._store.createIndex.apply(this._store, arguments));
//   };
//
//   ObjectStore.prototype.index = function() {
//     return new Index(this._store.index.apply(this._store, arguments));
//   };
//
//   proxyProperties(ObjectStore, '_store', [
//     'name',
//     'keyPath',
//     'indexNames',
//     'autoIncrement'
//   ]);
//
//   proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
//     'put',
//     'add',
//     'delete',
//     'clear',
//     'get',
//     'getAll',
//     'getAllKeys',
//     'count'
//   ]);
//
//   proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
//     'openCursor',
//     'openKeyCursor'
//   ]);
//
//   proxyMethods(ObjectStore, '_store', IDBObjectStore, [
//     'deleteIndex'
//   ]);
//
//   function Transaction(idbTransaction) {
//     this._tx = idbTransaction;
//     this.complete = new Promise(function(resolve, reject) {
//       idbTransaction.oncomplete = function() {
//         resolve();
//       };
//       idbTransaction.onerror = function() {
//         reject(idbTransaction.error);
//       };
//     });
//   }
//
//   Transaction.prototype.objectStore = function() {
//     return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
//   };
//
//   proxyProperties(Transaction, '_tx', [
//     'objectStoreNames',
//     'mode'
//   ]);
//
//   proxyMethods(Transaction, '_tx', IDBTransaction, [
//     'abort'
//   ]);
//
//   function UpgradeDB(db, oldVersion, transaction) {
//     this._db = db;
//     this.oldVersion = oldVersion;
//     this.transaction = new Transaction(transaction);
//   }
//
//   UpgradeDB.prototype.createObjectStore = function() {
//     return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
//   };
//
//   proxyProperties(UpgradeDB, '_db', [
//     'name',
//     'version',
//     'objectStoreNames'
//   ]);
//
//   proxyMethods(UpgradeDB, '_db', IDBDatabase, [
//     'deleteObjectStore',
//     'close'
//   ]);
//
//   function DB(db) {
//     this._db = db;
//   }
//
//   DB.prototype.transaction = function() {
//     return new Transaction(this._db.transaction.apply(this._db, arguments));
//   };
//
//   proxyProperties(DB, '_db', [
//     'name',
//     'version',
//     'objectStoreNames'
//   ]);
//
//   proxyMethods(DB, '_db', IDBDatabase, [
//     'close'
//   ]);
//
//   // Add cursor iterators
//   // TODO: remove this once browsers do the right thing with promises
//   ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
//     [ObjectStore, Index].forEach(function(Constructor) {
//       Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
//         var args = toArray(arguments);
//         var callback = args[args.length - 1];
//         var request = (this._store || this._index)[funcName].apply(this._store, args.slice(0, -1));
//         request.onsuccess = function() {
//           callback(request.result);
//         };
//       };
//     });
//   });
//
//   // polyfill getAll
//   [Index, ObjectStore].forEach(function(Constructor) {
//     if (Constructor.prototype.getAll) return;
//     Constructor.prototype.getAll = function(query, count) {
//       var instance = this;
//       var items = [];
//
//       return new Promise(function(resolve) {
//         instance.iterateCursor(query, function(cursor) {
//           if (!cursor) {
//             resolve(items);
//             return;
//           }
//           items.push(cursor.value);
//
//           if (count !== undefined && items.length == count) {
//             resolve(items);
//             return;
//           }
//           cursor.continue();
//         });
//       });
//     };
//   });
//
//   var exp = {
//     open: function(name, version, upgradeCallback) {
//       var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
//       var request = p.request;
//
//       request.onupgradeneeded = function(event) {
//         if (upgradeCallback) {
//           upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
//         }
//       };
//
//       return p.then(function(db) {
//         return new DB(db);
//       });
//     },
//     delete: function(name) {
//       return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
//     }
//   };
//
//   if (typeof module !== 'undefined') {
//     module.exports = exp;
//   }
//   else {
//     self.idb = exp;
//   }
// }());
