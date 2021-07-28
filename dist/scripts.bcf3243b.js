// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/storageAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalStorage = exports.setLocalStorage = void 0;

var setLocalStorage = function setLocalStorage(data) {
  localStorage.setItem('DB', JSON.stringify(data));
};

exports.setLocalStorage = setLocalStorage;

var getLocalStorage = function getLocalStorage() {
  var _tasks;

  var tasks = JSON.parse(localStorage.getItem('DB'));
  return (_tasks = tasks) !== null && _tasks !== void 0 ? _tasks : tasks = {
    todo: [],
    progress: [],
    done: []
  };
};

exports.getLocalStorage = getLocalStorage;
},{}],"scripts/usersAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersList = void 0;

var getUsersList = function getUsersList() {
  return fetch("https://jsonplaceholder.typicode.com/users").then(function (response) {
    return response.json();
  });
};

exports.getUsersList = getUsersList;
},{}],"scripts/Card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = Card;
exports.displayUser = exports.printCards = exports.getCardHtml = void 0;

var _usersAPI = require("./usersAPI");

function Card(title, description, username) {
  this.title = title;
  this.description = description;
  this.username = username;
  this.themeIsRed = true;
  this.date = new Date().toLocaleDateString();
  this.time = new Date().toLocaleTimeString();
  this.id = Math.random().toString(36).substr(2, 9);
  this.isEditable = true;
}

var getCardHtml = function getCardHtml(_ref) {
  var title = _ref.title,
      description = _ref.description,
      username = _ref.username,
      themeIsRed = _ref.themeIsRed,
      date = _ref.date,
      time = _ref.time,
      id = _ref.id,
      isEditable = _ref.isEditable;
  var theme = themeIsRed ? 'red' : 'white';
  return "<div class=\"card card--".concat(theme, "\" id=\"").concat(id, "\">\n                <div class=\"card__heading\">\n                    <div class=\"card__date-wrap--").concat(theme, "\">\n                        <p class=\"card__date\">").concat(date, "</p>\n                        <p class=\"card__time\">").concat(time, "</p>\n                    </div>\n                    <div class=\"card__buttons\">\n                        ").concat(isEditable ? '<button class="card__edit-btn card__edit-btn--red"></button>' : '', "                        \n                        <button class=\"card__close-btn card__close-btn--").concat(theme, "\"></button>\n                    </div>\n                </div>\n                <div class=\"card__body\">\n                    <div class=\"card__info\">\n                        <div class=\"card__title\">").concat(title, "</div>\n                        <div class=\"card__description\">").concat(description, "</div>\n                        <div class=\"card__username\">").concat(username, "</div>\n                    </div>\n                    <button class=\"card__swipe-btn card__swipe-btn--").concat(theme, "\"></button>\n                </div>\n            </div>");
};

exports.getCardHtml = getCardHtml;

var printCards = function printCards(data, cardList) {
  return data[cardList.id].map(function (card) {
    return getCardHtml(card);
  }).join('');
};

exports.printCards = printCards;

var displayUser = function displayUser(list) {
  (0, _usersAPI.getUsersList)().then(function (userlist) {
    return userlist.forEach(function (user) {
      var option = new Option(user.name, "".concat(user.name));
      list.append(option);
    });
  });
};

exports.displayUser = displayUser;
},{"./usersAPI":"scripts/usersAPI.js"}],"scripts/modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initModalDeleteListeners = exports.toggleModal = exports.changeModalTitle = exports.initModalListeners = void 0;

var _Card = require("./Card");

var _storageAPI = require("./storageAPI");

var _index = require("./index");

var initModalListeners = function initModalListeners(modal, data) {
  for (var _len = arguments.length, inputs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    inputs[_key - 2] = arguments[_key];
  }

  modal.addEventListener("click", function (event) {
    var target = event.target;

    if (target.classList.contains("modal__close")) {
      toggleModal(modal);
      clearInputs.apply(void 0, inputs);
    } else if (target.classList.contains("modal__btn--save")) {
      data.todo.push(new _Card.Card(inputs[0].value, inputs[1].value, inputs[2].value));
      clearInputs.apply(void 0, inputs);
      toggleModal(modal);
      (0, _storageAPI.setLocalStorage)(data);
      (0, _index.render)();
    }
  });
};

exports.initModalListeners = initModalListeners;

var changeModalTitle = function changeModalTitle(text, modalTitle) {
  modalTitle.innerText = text;
};

exports.changeModalTitle = changeModalTitle;

var clearInputs = function clearInputs() {
  for (var _len2 = arguments.length, inputs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    inputs[_key2] = arguments[_key2];
  }

  inputs.forEach(function (input) {
    return input.value = "";
  });
};

var toggleModal = function toggleModal(modal) {
  modal.classList.toggle("d-none");
};

exports.toggleModal = toggleModal;

var initModalDeleteListeners = function initModalDeleteListeners(modal) {
  modal.addEventListener("click", function (event) {
    var target = event.target;

    if (target.classList.contains("modal__btn-close--footer")) {
      toggleModal(modal);
    } else if (target.classList.contains("modal__btn--save")) {
      _index.DB.progress.length = 0;
      (0, _storageAPI.setLocalStorage)(_index.DB);
      (0, _index.render)();
      toggleModal(modal);
    }
  });
};

exports.initModalDeleteListeners = initModalDeleteListeners;
},{"./Card":"scripts/Card.js","./storageAPI":"scripts/storageAPI.js","./index":"scripts/index.js"}],"scripts/clock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _getDate = /*#__PURE__*/new WeakSet();

var _update = /*#__PURE__*/new WeakSet();

var Clock = /*#__PURE__*/function () {
  function Clock() {
    _classCallCheck(this, Clock);

    _update.add(this);

    _getDate.add(this);
  }

  _createClass(Clock, [{
    key: "start",
    value: function start() {
      var _this = this;

      _classPrivateMethodGet(this, _update, _update2).call(this);

      var separator = document.querySelector('.clock__separator');
      setInterval(function () {
        _classPrivateMethodGet(_this, _update, _update2).call(_this);

        separator.classList.toggle('opacity');
      }, 1000);
    }
  }]);

  return Clock;
}();

exports.Clock = Clock;

function _getDate2() {
  var time = new Date();
  var date = {
    hours: time.getHours(),
    minutes: time.getMinutes()
  };
  return date;
}

function _update2() {
  var hours = document.querySelector('.clock__hours');
  var minutes = document.querySelector('.clock__minutes');

  var date = _classPrivateMethodGet(this, _getDate, _getDate2).call(this);

  hours.innerText = date.hours.toString().padStart(2, '0');
  minutes.innerText = date.minutes.toString().padStart(2, '0');
}
},{}],"scripts/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.DB = void 0;

var _storageAPI = require("./storageAPI");

var _Card = require("./Card");

var _modal = require("./modal");

var _clock = require("./clock");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Data base
var DB; // Columns

exports.DB = DB;
var columns = document.querySelector('.main').children;
var columnBadges = document.querySelectorAll(".column__badge"); // Card lists

var cardLists = document.querySelectorAll(".column__card-wrapper"); // Modal

var modalAdd = document.querySelector(".modal-add");
var modalTitle = document.querySelector(".modal__title");
var modalTitleInput = document.querySelector(".modal__input-heading");
var modalDescriptionInput = document.querySelector(".modal__input-comment");
var modalUsernameDrop = document.querySelector(".modal__dropdown");
var modalDeleteAll = document.querySelector(".modal-del"); // Toast

var toast = document.querySelector(".toast"); // Audio

var audioGeegun = document.querySelector(".geegun");

var app = function app() {
  exports.DB = DB = (0, _storageAPI.getLocalStorage)();
  render();
  new _clock.Clock().start();
  bindColumnHandlers();
  (0, _modal.initModalListeners)(modalAdd, DB, modalTitleInput, modalDescriptionInput, modalUsernameDrop);
  (0, _modal.initModalDeleteListeners)(modalDeleteAll);
  (0, _Card.displayUser)(modalUsernameDrop);
};

document.addEventListener("DOMContentLoaded", app);

var initColumnHandler = function initColumnHandler(event, column) {
  var target = event.target;

  if (target.classList.contains("column__button--addTodo")) {
    (0, _modal.changeModalTitle)("Дадаць новую справу", modalTitle);
    (0, _modal.toggleModal)(modalAdd);
  } else if (target.classList.contains("column__button--deleteAll")) {
    if (column.classList.contains('column-todo')) {
      DB.todo.length = 0;
    } else if (column.classList.contains('column-progress')) {
      (0, _modal.toggleModal)(modalDeleteAll);
    } else if (column.classList.contains('column-done')) {
      DB.done.length = 0;
    }

    (0, _storageAPI.setLocalStorage)(DB);
    render();
  }
};

var bindColumnHandlers = function bindColumnHandlers() {
  var _iterator = _createForOfIteratorHelper(columns),
      _step;

  try {
    var _loop = function _loop() {
      var column = _step.value;
      column.addEventListener('click', function (event) {
        initColumnHandler(event, column);
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var initCardListListeners = function initCardListListeners(cardList) {
  var _DB = DB,
      todo = _DB.todo,
      progress = _DB.progress,
      done = _DB.done;
  cardList.childNodes.forEach(function (card, index) {
    card.addEventListener("click", function (event) {
      var target = event.target;

      if (target.classList.contains("card__close-btn")) {
        DB[cardList.id] = DB[cardList.id].filter(function (item) {
          return item.id !== card.id;
        });
        (0, _storageAPI.setLocalStorage)(DB);
        render();
      } else if (target.classList.contains("card__edit-btn")) {
        (0, _modal.toggleModal)(modalAdd);
        (0, _modal.changeModalTitle)("Змянiць справу", modalTitle);
        modalTitleInput.value = todo[index].title;
        modalDescriptionInput.value = todo[index].description;
        modalUsernameDrop.value = todo[index].username;
        todo.splice(index, 1);
        (0, _storageAPI.setLocalStorage)(DB);
        render();
      } else if (target.classList.contains("card__swipe-btn")) {
        if (cardList.id === 'todo') {
          if (progress.length > 5) {
            audioGeegun.play();
            (0, _modal.toggleModal)(toast);
            setTimeout(function () {
              (0, _modal.toggleModal)(toast);
            }, 5000);
          } else {
            todo[index].themeIsRed = !todo[index].themeIsRed;
            todo[index].isEditable = !todo[index].isEditable;
            progress.push(todo[index]);
            todo.splice(index, 1);
            (0, _storageAPI.setLocalStorage)(DB);
            render();
          }
        } else if (cardList.id === 'progress') {
          progress[index].themeIsRed = !progress[index].themeIsRed;
          done.push(progress[index]);
          progress.splice(index, 1);
        } else if (cardList.id === 'done') {
          done[index].isEditable = !done[index].isEditable;
          done[index].description = '';
          todo.push(done[index]);
          done.splice(index, 1);
        }

        (0, _storageAPI.setLocalStorage)(DB);
        render();
      }
    });
  });
};

var render = function render() {
  cardLists.forEach(function (cardList, index) {
    cardList.innerHTML = "";
    cardList.innerHTML = (0, _Card.printCards)(DB, cardList);
    columnBadges[index].innerText = DB[cardList.id].length;
    initCardListListeners(cardList);
  });
};

exports.render = render;
},{"./storageAPI":"scripts/storageAPI.js","./Card":"scripts/Card.js","./modal":"scripts/modal.js","./clock":"scripts/clock.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63778" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map