/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _themeSwitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./themeSwitch */ "./src/js/themeSwitch.js");
/* harmony import */ var _themeModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./themeModal */ "./src/js/themeModal.js");
/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calculator */ "./src/js/calculator.js");



var themeSwitch = new _themeSwitch__WEBPACK_IMPORTED_MODULE_0__.default();
var themeModal = new _themeModal__WEBPACK_IMPORTED_MODULE_1__.default();
var calculator = new _calculator__WEBPACK_IMPORTED_MODULE_2__.default();

/***/ }),

/***/ "./src/js/calculator.js":
/*!******************************!*\
  !*** ./src/js/calculator.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calculator)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var calculator = /*#__PURE__*/function () {
  function calculator() {
    _classCallCheck(this, calculator);

    if (!this.vars()) return;
    this.setupEvents();
  }

  _createClass(calculator, [{
    key: "vars",
    value: function vars() {
      this.selectors = {
        previousValueElement: 'data-previous-value',
        currentValueElement: 'data-current-value',
        keys: 'data-keys',
        numberKey: 'num',
        operationKey: 'func',
        deleteKey: 'del',
        resetKey: 'reset',
        equalKey: 'equals',
        smallClass: 'small',
        divisionError: 'division by zero'
      };
      this.previousValueElement = document.querySelector("[".concat(this.selectors.previousValueElement, "]"));
      this.currentValueElement = document.querySelector("[".concat(this.selectors.currentValueElement, "]"));
      this.keys = document.querySelectorAll("[".concat(this.selectors.keys, "]"));
      if (!this.previousValueElement || !this.currentValueElement || !this.keys) return false;
      this.isDivisionByZero = false;
      this.currentOperand;
      this.previousOperand;
      this.isEqualPressedAgain = false;
      this.previousResult;
      this.previousOperation;
      return true;
    }
  }, {
    key: "setupEvents",
    value: function setupEvents() {
      var _this = this;

      this.reset();
      this.keys.forEach(function (key) {
        var keyFunction = key.dataset.keys;
        var keyInnerText = key.innerHTML;
        var keyOperation = key.dataset.operation;
        key.addEventListener('click', function () {
          _this.whichCalculatorFuncToCall(keyFunction, keyInnerText, keyOperation);
        });
      });
      document.addEventListener('keydown', function (event) {
        var keys = {
          '0': 'num',
          '1': 'num',
          '2': 'num',
          '3': 'num',
          '4': 'num',
          '5': 'num',
          '6': 'num',
          '7': 'num',
          '8': 'num',
          '9': 'num',
          '.': 'num',
          '+': 'func',
          '-': 'func',
          '*': 'func',
          '/': 'func',
          'Delete': 'reset',
          'Backspace': 'del',
          '=': 'equals',
          'Enter': 'equals'
        };
        var pressedKey = event.key;
        var pressedFunction = keys[pressedKey];

        _this.whichCalculatorFuncToCall(pressedFunction, pressedKey, pressedKey);
      });
    }
    /* Function that restores variables to initial state */

  }, {
    key: "reset",
    value: function reset() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
    }
    /* Function that extracts last character from string */

  }, {
    key: "delete",
    value: function _delete() {
      if (this.currentOperand === 0) {
        return;
      } else if (this.currentOperand.toString().length === 1) {
        this.currentOperand = 0;
      } else {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
      }
    }
    /**
    * Function that append last clicked number from passed parameter to currentOperand variable
    * @param    {String}  number    key inner value
    */

  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (number === '.' && this.currentOperand.toString().includes('.')) return;
      if (this.currentOperand.length >= 10) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    /**
    * Function that call compute() if condition is met or 
    * assign new values to operation, previous and currentOperand.
    * @param    {String}  number    key inner value
    */

  }, {
    key: "selectOperation",
    value: function selectOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand != '') this.compute();
      this.operation = operation;
      this.previousOperation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '0';
    }
    /**
    * Function that calculate prev and current value using a mathematical operator 
    * taken from operation variable.
    */

  }, {
    key: "compute",
    value: function compute() {
      var prev = parseFloat(this.previousOperand);
      var current = parseFloat(this.currentOperand);
      var operations = {
        '+': prev + current,
        '-': prev - current,
        '*': prev * current,
        '/': prev / current
      };

      if (this.isEqualPressedAgain) {
        this.previousResult = this.currentOperand;
        this.currentOperand = this.performSameCalculation();
      }

      if (isNaN(prev) || isNaN(current)) return;
      this.currentOperand = this.checkForErrors(current, prev, operations);
      this.previousOperation = this.operation;
      this.operation = undefined;
      this.previousOperand = '';
    }
    /**
    * Function that update all informations/results on user screen
    */

  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      this.currentValueElement.innerHTML = this.convertNumber(this.currentOperand);

      if (this.currentOperand.toString().length > 10) {
        this.currentValueElement.classList.add("".concat(this.selectors.smallClass));
      } else {
        this.currentValueElement.classList.remove("".concat(this.selectors.smallClass));
      }

      if (this.operation != null) {
        this.previousValueElement.innerHTML = "".concat(this.convertNumber(this.previousOperand), " ").concat(this.operation);
      } else {
        this.previousValueElement.innerHTML = '';
      }
    }
    /**
    * Function that converts a string with number to string with a 
    * language-sensitive representation of this number.
    * @param    {String}  number    string with number
    */

  }, {
    key: "convertNumber",
    value: function convertNumber(number) {
      if (this.isDivisionByZero) {
        this.isDivisionByZero = false;
        this.reset();
        return "".concat(this.selectors.divisionError);
      }

      var stringNumber = number.toString();
      var integerDigits = parseFloat(stringNumber.split('.')[0]);
      var decimalDigits = stringNumber.split('.')[1];
      var integerDisplay;

      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0
        });
      }

      if (decimalDigits != null) {
        return "".concat(integerDisplay, ".").concat(decimalDigits);
      } else {
        return integerDisplay;
      }
    }
    /**
    * Function that check for any error based on two values - currentValue and previousValue
    * @param    {Number} currentValue    Value of current user typed value
    * @param    {Number} previousValue    Value of previous user typed value
    * @param    {Object} operations    Object with mathematical operations
    * @return   {String}           Returns either empty string or result of math operation
    */

  }, {
    key: "checkForErrors",
    value: function checkForErrors(currentValue, previousValue, operations) {
      var result; // Checks if our operation is dividing by zero. 

      if ((previousValue === 0 || currentValue === 0) && this.operation === '/') {
        this.isDivisionByZero = true;
        result = '';
      } else {
        result = operations[this.operation];
      }

      return result;
    }
    /** 
    * Function that calculates value of previous result and latestInput.
    * It is used when equal button is pressed again.  
    * @return   {Number}      Returns result of calculation.
    */

  }, {
    key: "performSameCalculation",
    value: function performSameCalculation() {
      var latestInput = parseFloat(this.latestInputValue);
      var prevResult = parseFloat(this.previousResult);
      var operations = {
        '+': prevResult + latestInput,
        '-': prevResult - latestInput,
        '*': prevResult * latestInput,
        '/': prevResult / latestInput
      };
      return operations[this.previousOperation];
    }
    /**
    * Function that checks which calculator-function user input and based on that call
    * suitable functions, assign variables. 
    * @param    {String} func    Name of calculator-function that user select/input
    * @param    {String} inputValue    Name of pressed/inputed key
    * @param    {String} operationValue    Name of pressed/inputed operation
    */

  }, {
    key: "whichCalculatorFuncToCall",
    value: function whichCalculatorFuncToCall(func, inputValue, operationValue) {
      if (func == this.selectors.numberKey) {
        this.isEqualPressedAgain = false;
        this.appendNumber(inputValue);
        this.updateDisplay();
        this.latestInputValue = this.currentOperand;
      } else if (func == this.selectors.operationKey) {
        this.isEqualPressedAgain = false;
        this.selectOperation(operationValue);
        this.updateDisplay();
      } else if (func == this.selectors.deleteKey) {
        this.isEqualPressedAgain = false;
        this["delete"]();
        this.updateDisplay();
      } else if (func == this.selectors.resetKey) {
        this.isEqualPressedAgain = false;
        this.reset();
        this.updateDisplay();
      } else if (func == this.selectors.equalKey) {
        this.compute();
        this.updateDisplay();
        this.isEqualPressedAgain = true;
      }
    }
  }]);

  return calculator;
}();



/***/ }),

/***/ "./src/js/themeModal.js":
/*!******************************!*\
  !*** ./src/js/themeModal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeModal)
/* harmony export */ });
/* harmony import */ var vanilla_picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vanilla-picker */ "./node_modules/vanilla-picker/dist/vanilla-picker.mjs");
/* harmony import */ var _themeSwitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./themeSwitch */ "./src/js/themeSwitch.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ThemeModal = /*#__PURE__*/function () {
  function ThemeModal() {
    _classCallCheck(this, ThemeModal);

    if (!this.vars()) return false;
    this.setupEvents();
  }

  _createClass(ThemeModal, [{
    key: "vars",
    value: function vars() {
      this.selectors = {
        body: 'data-theme',
        modal: 'data-modal',
        toggleButton: 'data-settings',
        saveButton: 'data-modal-save',
        closeButton: 'data-modal-close',
        colorButtons: 'data-theme-picker',
        colorGeneratorWrapper: 'data-color-generator',
        overlayWrapper: 'data-overlay',
        inputDataset: 'data-theme-input',
        customTheme: 'custom',
        activeClass: 'active'
      };
      this.body = document.querySelector("[".concat(this.selectors.body, "]"));
      this.modal = document.querySelector("[".concat(this.selectors.modal, "]"));
      this.saveButton = document.querySelector("[".concat(this.selectors.saveButton, "]"));
      this.toggleButton = document.querySelector("[".concat(this.selectors.toggleButton, "]"));
      this.closeButton = document.querySelector("[".concat(this.selectors.closeButton, "]"));
      this.colorButtons = document.querySelectorAll("[".concat(this.selectors.colorButtons, "]"));
      this.colorGeneratorWrapper = document.querySelector("[".concat(this.selectors.colorGeneratorWrapper, "]"));
      this.overlayWrapper = document.querySelector("[".concat(this.selectors.overlayWrapper, "]"));
      if (!this.body || !this.modal || !this.saveButton || !this.toggleButton || !this.closeButton || !this.colorButtons || !this.colorGeneratorWrapper || !this.overlayWrapper) return false;
      this.themeSwitch = new _themeSwitch__WEBPACK_IMPORTED_MODULE_1__.default();
      this.colors = this.themeSwitch.getColors(); // Get colors from local storage or use empty object with default colors

      this.created = false;
      this.previousTheme;
      this.currentTheme;
      this.previousElementFocused;
      return true;
    }
  }, {
    key: "setupEvents",
    value: function setupEvents() {
      var _this = this;

      this.toggleButton.addEventListener('click', function (event) {
        _this.toggle();

        _this.previousElementFocused = event.target;
      });
      this.closeButton.addEventListener('click', function () {
        return _this.close();
      });
      this.saveButton.addEventListener('click', function () {
        return _this.save();
      });
      this.colorButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          return _this.selectColor(button);
        });
      });
      this.modal.addEventListener('keydown', function (event) {
        var escapeKeyCode = 27;

        if (event.keyCode == escapeKeyCode) {
          _this.close();
        }
      });
    } // Display modal

  }, {
    key: "toggle",
    value: function toggle() {
      var _this2 = this;

      this.modal.classList.add("".concat(this.selectors.activeClass));
      this.overlayWrapper.classList.add("".concat(this.selectors.activeClass));
      this.previousTheme = this.body.dataset.theme;
      this.setBodyTheme(this.selectors.customTheme);
      this.themeSwitch.displayCustomTheme();
      this.checkActiveInput(this.selectors.customTheme);
      this.focusTrap();
      window.setTimeout(function () {
        _this2.firstFocusableElement.focus();
      }, 50);
    } // Hide modal

  }, {
    key: "close",
    value: function close() {
      this.modal.classList.remove("".concat(this.selectors.activeClass));
      this.overlayWrapper.classList.remove("".concat(this.selectors.activeClass));
      this.setBodyTheme(this.previousTheme);
      this.previousTheme == this.selectors.customTheme ? null : this.themeSwitch.removeCustomTheme();
      this.checkActiveInput(this.previousTheme);
      this.previousElementFocused.focus();

      if (this.pick) {
        this.created = false;
        this.pick.destroy();
        this.pick = null;
      }
    } // Save modal

  }, {
    key: "save",
    value: function save() {
      this.overlayWrapper.classList.remove("".concat(this.selectors.activeClass));
      this.saveToLocalStorage();
      this.themeSwitch.displayCustomTheme();
      this.themeSwitch.saveThemeToLocalStorage("".concat(this.selectors.customTheme));
      this.modal.classList.remove("".concat(this.selectors.activeClass));
    }
    /**
    * Create new Picker class and display palette with colors.
    * Save picked colors with setColors function. 
    * @param    {Element} button    Element for picker parent
    */

  }, {
    key: "selectColor",
    value: function selectColor(button) {
      var _this3 = this;

      if (this.created) return;
      this.created = true;
      var colorType = button.dataset.themePicker;
      var buttonCurrentColor = window.getComputedStyle(button).backgroundColor;
      setTimeout(function () {
        var editor = document.querySelector('.picker_editor input');
        editor.focus();
      }, 100);
      this.pick = new vanilla_picker__WEBPACK_IMPORTED_MODULE_0__.default({
        parent: this.colorGeneratorWrapper,
        popup: false,
        color: buttonCurrentColor,
        onDone: function onDone(color) {
          setTimeout(function () {
            _this3.created = false;
          }, 100);
          button.style.backgroundColor = color.hslString;

          _this3.pick.destroy();

          _this3.setColors(colorType, color.hslString);

          _this3.pick = null;
          button.focus();
        }
      });
    }
    /**
    * Assign new colors to colors object
    * @param    {String} colorType    Name of color type
    * @param    {String} color    color
    */

  }, {
    key: "setColors",
    value: function setColors(colorType, color) {
      this.colors[colorType] = color;
    } // Save colors to localStorage

  }, {
    key: "saveToLocalStorage",
    value: function saveToLocalStorage() {
      localStorage.setItem('colors', JSON.stringify(this.colors));
    }
    /**
    * Sets data-theme attribute for body element
    * @param    {String}    theme    Name of theme
    */

  }, {
    key: "setBodyTheme",
    value: function setBodyTheme(theme) {
      this.body.dataset.theme = theme;
    }
    /**
    * Assign input with passed name to variable.
    * Set attribute checked on that element.
    * @param    {String}    inputDataset    Name of input data-attribute value
    */

  }, {
    key: "checkActiveInput",
    value: function checkActiveInput(inputDataset) {
      this.currentInput = document.querySelector("[".concat(this.selectors.inputDataset, "=\"").concat(inputDataset, "\"]"));
      this.currentInput.checked = true;
    } // Function to keep focus inside modal when pressing tab

  }, {
    key: "focusTrap",
    value: function focusTrap() {
      var _this4 = this;

      var focusableElements = 'button';
      this.firstFocusableElement = this.modal.querySelectorAll(focusableElements)[0];
      var focusableContent = this.modal.querySelectorAll(focusableElements);
      var lastFocusableElement = focusableContent[focusableContent.length - 1];
      document.addEventListener('keydown', function (event) {
        var isTabPressed = event.key === 'Tab' || event.keyCode === 9;
        if (!isTabPressed) return;

        if (event.shiftKey) {
          if (document.activeElement === _this4.firstFocusableElement) {
            lastFocusableElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            _this4.firstFocusableElement.focus();

            event.preventDefault();
          }
        }
      });
    }
  }]);

  return ThemeModal;
}();



/***/ }),

/***/ "./src/js/themeSwitch.js":
/*!*******************************!*\
  !*** ./src/js/themeSwitch.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeSwitch)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ThemeSwitch = /*#__PURE__*/function () {
  function ThemeSwitch() {
    _classCallCheck(this, ThemeSwitch);

    if (!this.vars()) return false;
    this.setupEvents();
  }

  _createClass(ThemeSwitch, [{
    key: "vars",
    value: function vars() {
      this.selectors = {
        body: 'data-theme',
        inputs: 'data-theme-input',
        componentWrapper: 'data-component',
        calc: 'data-calc',
        lightTheme: 'light',
        darkTheme: 'dark',
        neonTheme: 'neon',
        enableTransitions: 'enable-transition'
      };
      this.body = document.querySelector("[".concat(this.selectors.body, "]"));
      this.inputs = document.querySelectorAll("[".concat(this.selectors.inputs, "]"));
      this.componentWrapper = document.querySelector("[".concat(this.selectors.componentWrapper, "]"));
      this.calc = document.querySelector("[".concat(this.selectors.calc, "]"));
      if (!this.body || !this.inputs || !this.componentWrapper || !this.calc) return false;
      this.activeTheme = JSON.parse(localStorage.getItem('theme')) || this.selectors.darkTheme;
      return true;
    }
  }, {
    key: "setupEvents",
    value: function setupEvents() {
      var _this = this;

      this.getUserPreferedTheme(this.isThemeSet());
      this.setBodyTheme();
      this.inputs.forEach(function (input) {
        input.addEventListener('change', function () {
          _this.toggleTheme(input);

          _this.saveThemeToLocalStorage();
        });
      });
    } // 

    /**
    * Change body data-attribute to new theme from focused element.
    * @param    {element} input    Current focused element
    */

  }, {
    key: "toggleTheme",
    value: function toggleTheme(input) {
      this.newTheme = input.dataset.themeInput;
      this.body.dataset.theme = this.newTheme;

      if (this.newTheme == 'custom') {
        this.displayCustomTheme();
      } else {
        this.removeCustomTheme();
      }
    } // Save chosen theme to local storage

  }, {
    key: "saveThemeToLocalStorage",
    value: function saveThemeToLocalStorage(theme) {
      localStorage.setItem('theme', JSON.stringify("".concat(theme || this.newTheme)));
    } // This function is used on init.
    // Set active theme and add classList to enable transitions on page.

  }, {
    key: "setBodyTheme",
    value: function setBodyTheme() {
      var _this2 = this;

      this.body.dataset.theme = this.activeTheme;

      if (this.activeTheme == 'custom') {
        this.displayCustomTheme();
      }

      this.inputs.forEach(function (input) {
        var inputTheme = input.dataset.themeInput;
        var delay = 50;

        if (inputTheme == _this2.activeTheme) {
          input.checked = true;
          window.setTimeout(function () {
            _this2.calc.classList.add("".concat(_this2.selectors.enableTransitions));

            _this2.componentWrapper.classList.add("".concat(_this2.selectors.enableTransitions));
          }, delay);
        } else {
          return false;
        }
      });
    } // Add custom theme variables to body.

  }, {
    key: "displayCustomTheme",
    value: function displayCustomTheme() {
      this.body.style.setProperty('--c-bg-main', this.getColors().main);
      this.body.style.setProperty('--c-bg-keypad', this.getColors().keypad);
      this.body.style.setProperty('--c-bg-toggle', this.getColors().keypad);
      this.body.style.setProperty('--c-bg-screen', this.getColors().screen);
      this.body.style.setProperty('--c-keys-func', this.getColors().functions);
      this.body.style.setProperty('--c-keys-func-shadow', this.getColors().funcShad);
      this.body.style.setProperty('--c-keys-equal', this.getColors().equal);
      this.body.style.setProperty('--c-keys-equal-shadow', this.getColors().eqShad);
      this.body.style.setProperty('--c-toggle', this.getColors().equal);
      this.body.style.setProperty('--c-keys', this.getColors().numbers);
      this.body.style.setProperty('--c-keys-shadow', this.getColors().numShad);
      this.body.style.setProperty('--c-text-primary', this.getColors().primary);
      this.body.style.setProperty('--c-text-secondary', this.getColors().secondary);
      this.body.style.setProperty('--c-text-header', this.getColors().header);
      this.body.style.setProperty('--c-text-display', this.getColors().display);
    } // Remove custom theme variables from body.

  }, {
    key: "removeCustomTheme",
    value: function removeCustomTheme() {
      this.body.style.removeProperty('--c-bg-main');
      this.body.style.removeProperty('--c-bg-keypad');
      this.body.style.removeProperty('--c-bg-toggle');
      this.body.style.removeProperty('--c-bg-screen');
      this.body.style.removeProperty('--c-keys-func');
      this.body.style.removeProperty('--c-keys-func-shadow');
      this.body.style.removeProperty('--c-keys-equal');
      this.body.style.removeProperty('--c-keys-equal-shadow');
      this.body.style.removeProperty('--c-toggle');
      this.body.style.removeProperty('--c-keys');
      this.body.style.removeProperty('--c-keys-shadow');
      this.body.style.removeProperty('--c-text-primary');
      this.body.style.removeProperty('--c-text-secondary');
      this.body.style.removeProperty('--c-text-header');
      this.body.style.removeProperty('--c-text-display');
    }
    /**
    * Fetch colors object from local storage or use default object
    * @return   {object}    Object with colors
    */

  }, {
    key: "getColors",
    value: function getColors() {
      return JSON.parse(localStorage.getItem('colors')) || {
        main: 'hsl(192,92.5%,41.1%)',
        screen: 'hsl(28.2,100%,42.1%)',
        keypad: 'hsl(204.9,100%,24.1%)',
        numbers: 'hsl(206.6,100%,52.6%)',
        numShad: 'hsl(201.9,100%,33.1%)',
        functions: 'hsl(70,100%,40%)',
        funcShad: 'hsl(81.2,77%,41%)',
        equal: 'hsl(43.2,100%,51.6%)',
        eqShad: 'hsl(23.4,96.6%,46.3%)',
        primary: 'hsl(0, 0%, 100%)',
        secondary: 'hsl(0, 0%, 100%)',
        display: 'hsl(0, 0%, 100%)',
        header: 'hsl(0, 0%, 100%)'
      };
    }
    /**
    * Checks if any theme is saved in local storage
    * @return   {Boolean}         Boolean value
    */

  }, {
    key: "isThemeSet",
    value: function isThemeSet() {
      if (JSON.parse(localStorage.getItem('theme')) == null) {
        return false;
      } else {
        return true;
      }
    }
    /**
    * Function that check prefered user color scheme. 
    * Prefered color is saved in local storage.
    * @param    {Boolean} isThemeSet    Boolean value
    */

  }, {
    key: "getUserPreferedTheme",
    value: function getUserPreferedTheme(isThemeSet) {
      if (isThemeSet) return false;

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.saveThemeToLocalStorage(this.selectors.darkTheme);
      } else {
        this.saveThemeToLocalStorage(this.selectors.lightTheme);
      }
    }
  }]);

  return ThemeSwitch;
}();



/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vanilla-picker/dist/vanilla-picker.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/vanilla-picker/dist/vanilla-picker.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

String.prototype.startsWith = String.prototype.startsWith || function (needle) {
    return this.indexOf(needle) === 0;
};
String.prototype.padStart = String.prototype.padStart || function (len, pad) {
    var str = this;while (str.length < len) {
        str = pad + str;
    }return str;
};

var colorNames = { cb: '0f8ff', tqw: 'aebd7', q: '-ffff', qmrn: '7fffd4', zr: '0ffff', bg: '5f5dc', bsq: 'e4c4', bck: '---', nch: 'ebcd', b: '--ff', bvt: '8a2be2', brwn: 'a52a2a', brw: 'deb887', ctb: '5f9ea0', hrt: '7fff-', chcT: 'd2691e', cr: '7f50', rnw: '6495ed', crns: '8dc', crms: 'dc143c', cn: '-ffff', Db: '--8b', Dcn: '-8b8b', Dgnr: 'b8860b', Dgr: 'a9a9a9', Dgrn: '-64-', Dkhk: 'bdb76b', Dmgn: '8b-8b', Dvgr: '556b2f', Drng: '8c-', Drch: '9932cc', Dr: '8b--', Dsmn: 'e9967a', Dsgr: '8fbc8f', DsTb: '483d8b', DsTg: '2f4f4f', Dtrq: '-ced1', Dvt: '94-d3', ppnk: '1493', pskb: '-bfff', mgr: '696969', grb: '1e90ff', rbrc: 'b22222', rwht: 'af0', stg: '228b22', chs: '-ff', gnsb: 'dcdcdc', st: '8f8ff', g: 'd7-', gnr: 'daa520', gr: '808080', grn: '-8-0', grnw: 'adff2f', hnw: '0fff0', htpn: '69b4', nnr: 'cd5c5c', ng: '4b-82', vr: '0', khk: '0e68c', vnr: 'e6e6fa', nrb: '0f5', wngr: '7cfc-', mnch: 'acd', Lb: 'add8e6', Lcr: '08080', Lcn: 'e0ffff', Lgnr: 'afad2', Lgr: 'd3d3d3', Lgrn: '90ee90', Lpnk: 'b6c1', Lsmn: 'a07a', Lsgr: '20b2aa', Lskb: '87cefa', LsTg: '778899', Lstb: 'b0c4de', Lw: 'e0', m: '-ff-', mgrn: '32cd32', nn: 'af0e6', mgnt: '-ff', mrn: '8--0', mqm: '66cdaa', mmb: '--cd', mmrc: 'ba55d3', mmpr: '9370db', msg: '3cb371', mmsT: '7b68ee', '': '-fa9a', mtr: '48d1cc', mmvt: 'c71585', mnLb: '191970', ntc: '5fffa', mstr: 'e4e1', mccs: 'e4b5', vjw: 'dead', nv: '--80', c: 'df5e6', v: '808-0', vrb: '6b8e23', rng: 'a5-', rngr: '45-', rch: 'da70d6', pgnr: 'eee8aa', pgrn: '98fb98', ptrq: 'afeeee', pvtr: 'db7093', ppwh: 'efd5', pchp: 'dab9', pr: 'cd853f', pnk: 'c0cb', pm: 'dda0dd', pwrb: 'b0e0e6', prp: '8-080', cc: '663399', r: '--', sbr: 'bc8f8f', rb: '4169e1', sbrw: '8b4513', smn: 'a8072', nbr: '4a460', sgrn: '2e8b57', ssh: '5ee', snn: 'a0522d', svr: 'c0c0c0', skb: '87ceeb', sTb: '6a5acd', sTgr: '708090', snw: 'afa', n: '-ff7f', stb: '4682b4', tn: 'd2b48c', t: '-8080', thst: 'd8bfd8', tmT: '6347', trqs: '40e0d0', vt: 'ee82ee', whT: '5deb3', wht: '', hts: '5f5f5', w: '-', wgrn: '9acd32' };

function printNum(num) {
    var decs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var str = decs > 0 ? num.toFixed(decs).replace(/0+$/, '').replace(/\.$/, '') : num.toString();
    return str || '0';
}

var Color = function () {
    function Color(r, g, b, a) {
        classCallCheck(this, Color);


        var that = this;
        function parseString(input) {

            if (input.startsWith('hsl')) {
                var _input$match$map = input.match(/([\-\d\.e]+)/g).map(Number),
                    _input$match$map2 = slicedToArray(_input$match$map, 4),
                    h = _input$match$map2[0],
                    s = _input$match$map2[1],
                    l = _input$match$map2[2],
                    _a = _input$match$map2[3];

                if (_a === undefined) {
                    _a = 1;
                }

                h /= 360;
                s /= 100;
                l /= 100;
                that.hsla = [h, s, l, _a];
            } else if (input.startsWith('rgb')) {
                var _input$match$map3 = input.match(/([\-\d\.e]+)/g).map(Number),
                    _input$match$map4 = slicedToArray(_input$match$map3, 4),
                    _r = _input$match$map4[0],
                    _g = _input$match$map4[1],
                    _b = _input$match$map4[2],
                    _a2 = _input$match$map4[3];

                if (_a2 === undefined) {
                    _a2 = 1;
                }

                that.rgba = [_r, _g, _b, _a2];
            } else {
                if (input.startsWith('#')) {
                    that.rgba = Color.hexToRgb(input);
                } else {
                    that.rgba = Color.nameToRgb(input) || Color.hexToRgb(input);
                }
            }
        }

        if (r === undefined) ; else if (Array.isArray(r)) {
            this.rgba = r;
        } else if (b === undefined) {
            var color = r && '' + r;
            if (color) {
                parseString(color.toLowerCase());
            }
        } else {
            this.rgba = [r, g, b, a === undefined ? 1 : a];
        }
    }

    createClass(Color, [{
        key: 'printRGB',
        value: function printRGB(alpha) {
            var rgb = alpha ? this.rgba : this.rgba.slice(0, 3),
                vals = rgb.map(function (x, i) {
                return printNum(x, i === 3 ? 3 : 0);
            });

            return alpha ? 'rgba(' + vals + ')' : 'rgb(' + vals + ')';
        }
    }, {
        key: 'printHSL',
        value: function printHSL(alpha) {
            var mults = [360, 100, 100, 1],
                suff = ['', '%', '%', ''];

            var hsl = alpha ? this.hsla : this.hsla.slice(0, 3),
                vals = hsl.map(function (x, i) {
                return printNum(x * mults[i], i === 3 ? 3 : 1) + suff[i];
            });

            return alpha ? 'hsla(' + vals + ')' : 'hsl(' + vals + ')';
        }
    }, {
        key: 'printHex',
        value: function printHex(alpha) {
            var hex = this.hex;
            return alpha ? hex : hex.substring(0, 7);
        }
    }, {
        key: 'rgba',
        get: function get$$1() {
            if (this._rgba) {
                return this._rgba;
            }
            if (!this._hsla) {
                throw new Error('No color is set');
            }

            return this._rgba = Color.hslToRgb(this._hsla);
        },
        set: function set$$1(rgb) {
            if (rgb.length === 3) {
                rgb[3] = 1;
            }

            this._rgba = rgb;
            this._hsla = null;
        }
    }, {
        key: 'rgbString',
        get: function get$$1() {
            return this.printRGB();
        }
    }, {
        key: 'rgbaString',
        get: function get$$1() {
            return this.printRGB(true);
        }
    }, {
        key: 'hsla',
        get: function get$$1() {
            if (this._hsla) {
                return this._hsla;
            }
            if (!this._rgba) {
                throw new Error('No color is set');
            }

            return this._hsla = Color.rgbToHsl(this._rgba);
        },
        set: function set$$1(hsl) {
            if (hsl.length === 3) {
                hsl[3] = 1;
            }

            this._hsla = hsl;
            this._rgba = null;
        }
    }, {
        key: 'hslString',
        get: function get$$1() {
            return this.printHSL();
        }
    }, {
        key: 'hslaString',
        get: function get$$1() {
            return this.printHSL(true);
        }
    }, {
        key: 'hex',
        get: function get$$1() {
            var rgb = this.rgba,
                hex = rgb.map(function (x, i) {
                return i < 3 ? x.toString(16) : Math.round(x * 255).toString(16);
            });

            return '#' + hex.map(function (x) {
                return x.padStart(2, '0');
            }).join('');
        },
        set: function set$$1(hex) {
            this.rgba = Color.hexToRgb(hex);
        }
    }], [{
        key: 'hexToRgb',
        value: function hexToRgb(input) {

            var hex = (input.startsWith('#') ? input.slice(1) : input).replace(/^(\w{3})$/, '$1F').replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4').replace(/^(\w{6})$/, '$1FF');

            if (!hex.match(/^([0-9a-fA-F]{8})$/)) {
                throw new Error('Unknown hex color; ' + input);
            }

            var rgba = hex.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1).map(function (x) {
                return parseInt(x, 16);
            });

            rgba[3] = rgba[3] / 255;
            return rgba;
        }
    }, {
        key: 'nameToRgb',
        value: function nameToRgb(input) {

            var hash = input.toLowerCase().replace('at', 'T').replace(/[aeiouyldf]/g, '').replace('ght', 'L').replace('rk', 'D').slice(-5, 4),
                hex = colorNames[hash];
            return hex === undefined ? hex : Color.hexToRgb(hex.replace(/\-/g, '00').padStart(6, 'f'));
        }
    }, {
        key: 'rgbToHsl',
        value: function rgbToHsl(_ref) {
            var _ref2 = slicedToArray(_ref, 4),
                r = _ref2[0],
                g = _ref2[1],
                b = _ref2[2],
                a = _ref2[3];

            r /= 255;
            g /= 255;
            b /= 255;

            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h = void 0,
                s = void 0,
                l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);break;
                    case g:
                        h = (b - r) / d + 2;break;
                    case b:
                        h = (r - g) / d + 4;break;
                }

                h /= 6;
            }

            return [h, s, l, a];
        }
    }, {
        key: 'hslToRgb',
        value: function hslToRgb(_ref3) {
            var _ref4 = slicedToArray(_ref3, 4),
                h = _ref4[0],
                s = _ref4[1],
                l = _ref4[2],
                a = _ref4[3];

            var r = void 0,
                g = void 0,
                b = void 0;

            if (s === 0) {
                r = g = b = l;
            } else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                    p = 2 * l - q;

                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            var rgba = [r * 255, g * 255, b * 255].map(Math.round);
            rgba[3] = a;

            return rgba;
        }
    }]);
    return Color;
}();

var EventBucket = function () {
    function EventBucket() {
        classCallCheck(this, EventBucket);

        this._events = [];
    }

    createClass(EventBucket, [{
        key: 'add',
        value: function add(target, type, handler) {
            target.addEventListener(type, handler, false);
            this._events.push({
                target: target,
                type: type,
                handler: handler
            });
        }
    }, {
        key: 'remove',
        value: function remove(target, type, handler) {
            this._events = this._events.filter(function (e) {
                var isMatch = true;
                if (target && target !== e.target) {
                    isMatch = false;
                }
                if (type && type !== e.type) {
                    isMatch = false;
                }
                if (handler && handler !== e.handler) {
                    isMatch = false;
                }

                if (isMatch) {
                    EventBucket._doRemove(e.target, e.type, e.handler);
                }
                return !isMatch;
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._events.forEach(function (e) {
                return EventBucket._doRemove(e.target, e.type, e.handler);
            });
            this._events = [];
        }
    }], [{
        key: '_doRemove',
        value: function _doRemove(target, type, handler) {
            target.removeEventListener(type, handler, false);
        }
    }]);
    return EventBucket;
}();

function parseHTML(htmlString) {

    var div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.firstElementChild;
}

function dragTrack(eventBucket, area, callback) {
    var dragging = false;

    function clamp(val, min, max) {
        return Math.max(min, Math.min(val, max));
    }

    function onMove(e, info, starting) {
        if (starting) {
            dragging = true;
        }
        if (!dragging) {
            return;
        }

        e.preventDefault();

        var bounds = area.getBoundingClientRect(),
            w = bounds.width,
            h = bounds.height,
            x = info.clientX,
            y = info.clientY;

        var relX = clamp(x - bounds.left, 0, w),
            relY = clamp(y - bounds.top, 0, h);

        callback(relX / w, relY / h);
    }

    function onMouse(e, starting) {
        var button = e.buttons === undefined ? e.which : e.buttons;
        if (button === 1) {
            onMove(e, e, starting);
        } else {
            dragging = false;
        }
    }

    function onTouch(e, starting) {
        if (e.touches.length === 1) {
            onMove(e, e.touches[0], starting);
        } else {
            dragging = false;
        }
    }

    eventBucket.add(area, 'mousedown', function (e) {
        onMouse(e, true);
    });
    eventBucket.add(area, 'touchstart', function (e) {
        onTouch(e, true);
    });
    eventBucket.add(window, 'mousemove', onMouse);
    eventBucket.add(area, 'touchmove', onTouch);
    eventBucket.add(window, 'mouseup', function (e) {
        dragging = false;
    });
    eventBucket.add(area, 'touchend', function (e) {
        dragging = false;
    });
    eventBucket.add(area, 'touchcancel', function (e) {
        dragging = false;
    });
}

var BG_TRANSP = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'2\' height=\'2\'%3E%3Cpath d=\'M1,0H0V1H2V2H1\' fill=\'lightgrey\'/%3E%3C/svg%3E")';
var HUES = 360;

var EVENT_KEY = 'keydown',
    EVENT_CLICK_OUTSIDE = 'mousedown',
    EVENT_TAB_MOVE = 'focusin';

function $(selector, context) {
    return (context || document).querySelector(selector);
}

function stopEvent(e) {

    e.preventDefault();
    e.stopPropagation();
}
function onKey(bucket, target, keys, handler, stop) {
    bucket.add(target, EVENT_KEY, function (e) {
        if (keys.indexOf(e.key) >= 0) {
            if (stop) {
                stopEvent(e);
            }
            handler(e);
        }
    });
}

var _style = document.createElement('style');
_style.textContent = '.picker_wrapper.no_alpha .picker_alpha{display:none}.picker_wrapper.no_editor .picker_editor{position:absolute;z-index:-1;opacity:0}.picker_wrapper.no_cancel .picker_cancel{display:none}.layout_default.picker_wrapper{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-flow:row wrap;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:stretch;align-items:stretch;font-size:10px;width:25em;padding:.5em}.layout_default.picker_wrapper input,.layout_default.picker_wrapper button{font-size:1rem}.layout_default.picker_wrapper>*{margin:.5em}.layout_default.picker_wrapper::before{content:\'\';display:block;width:100%;height:0;-webkit-box-ordinal-group:2;order:1}.layout_default .picker_slider,.layout_default .picker_selector{padding:1em}.layout_default .picker_hue{width:100%}.layout_default .picker_sl{-webkit-box-flex:1;flex:1 1 auto}.layout_default .picker_sl::before{content:\'\';display:block;padding-bottom:100%}.layout_default .picker_editor{-webkit-box-ordinal-group:2;order:1;width:6.5rem}.layout_default .picker_editor input{width:100%;height:100%}.layout_default .picker_sample{-webkit-box-ordinal-group:2;order:1;-webkit-box-flex:1;flex:1 1 auto}.layout_default .picker_done,.layout_default .picker_cancel{-webkit-box-ordinal-group:2;order:1}.picker_wrapper{box-sizing:border-box;background:#f2f2f2;box-shadow:0 0 0 1px silver;cursor:default;font-family:sans-serif;color:#444;pointer-events:auto}.picker_wrapper:focus{outline:none}.picker_wrapper button,.picker_wrapper input{box-sizing:border-box;border:none;box-shadow:0 0 0 1px silver;outline:none}.picker_wrapper button:focus,.picker_wrapper button:active,.picker_wrapper input:focus,.picker_wrapper input:active{box-shadow:0 0 2px 1px dodgerblue}.picker_wrapper button{padding:.4em .6em;cursor:pointer;background-color:whitesmoke;background-image:-webkit-gradient(linear, left bottom, left top, from(gainsboro), to(transparent));background-image:linear-gradient(0deg, gainsboro, transparent)}.picker_wrapper button:active{background-image:-webkit-gradient(linear, left bottom, left top, from(transparent), to(gainsboro));background-image:linear-gradient(0deg, transparent, gainsboro)}.picker_wrapper button:hover{background-color:white}.picker_selector{position:absolute;z-index:1;display:block;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border:2px solid white;border-radius:100%;box-shadow:0 0 3px 1px #67b9ff;background:currentColor;cursor:pointer}.picker_slider .picker_selector{border-radius:2px}.picker_hue{position:relative;background-image:-webkit-gradient(linear, left top, right top, from(red), color-stop(yellow), color-stop(lime), color-stop(cyan), color-stop(blue), color-stop(magenta), to(red));background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);box-shadow:0 0 0 1px silver}.picker_sl{position:relative;box-shadow:0 0 0 1px silver;background-image:-webkit-gradient(linear, left top, left bottom, from(white), color-stop(50%, rgba(255,255,255,0))),-webkit-gradient(linear, left bottom, left top, from(black), color-stop(50%, rgba(0,0,0,0))),-webkit-gradient(linear, left top, right top, from(gray), to(rgba(128,128,128,0)));background-image:linear-gradient(180deg, white, rgba(255,255,255,0) 50%),linear-gradient(0deg, black, rgba(0,0,0,0) 50%),linear-gradient(90deg, gray, rgba(128,128,128,0))}.picker_alpha,.picker_sample{position:relative;background:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'2\' height=\'2\'%3E%3Cpath d=\'M1,0H0V1H2V2H1\' fill=\'lightgrey\'/%3E%3C/svg%3E") left top/contain white;box-shadow:0 0 0 1px silver}.picker_alpha .picker_selector,.picker_sample .picker_selector{background:none}.picker_editor input{font-family:monospace;padding:.2em .4em}.picker_sample::before{content:\'\';position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_arrow{position:absolute;z-index:-1}.picker_wrapper.popup{position:absolute;z-index:2;margin:1.5em}.picker_wrapper.popup,.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,0.4)}.picker_wrapper.popup .picker_arrow{width:3em;height:3em;margin:0}.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{content:"";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper.popup .picker_arrow::before{width:100%;height:100%;-webkit-transform:skew(45deg);transform:skew(45deg);-webkit-transform-origin:0 100%;transform-origin:0 100%}.picker_wrapper.popup .picker_arrow::after{width:150%;height:150%;box-shadow:none}.popup.popup_top{bottom:100%;left:0}.popup.popup_top .picker_arrow{bottom:0;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.popup.popup_bottom{top:100%;left:0}.popup.popup_bottom .picker_arrow{top:0;left:0;-webkit-transform:rotate(90deg) scale(1, -1);transform:rotate(90deg) scale(1, -1)}.popup.popup_left{top:0;right:100%}.popup.popup_left .picker_arrow{top:0;right:0;-webkit-transform:scale(-1, 1);transform:scale(-1, 1)}.popup.popup_right{top:0;left:100%}.popup.popup_right .picker_arrow{top:0;left:0}';
document.documentElement.firstElementChild.appendChild(_style);

var Picker = function () {
    function Picker(options) {
        classCallCheck(this, Picker);


        this.settings = {

            popup: 'right',
            layout: 'default',
            alpha: true,
            editor: true,
            editorFormat: 'hex',
            cancelButton: false,
            defaultColor: '#0cf'
        };

        this._events = new EventBucket();

        this.onChange = null;

        this.onDone = null;

        this.onOpen = null;

        this.onClose = null;

        this.setOptions(options);
    }

    createClass(Picker, [{
        key: 'setOptions',
        value: function setOptions(options) {
            var _this = this;

            if (!options) {
                return;
            }
            var settings = this.settings;

            function transfer(source, target, skipKeys) {
                for (var key in source) {
                    if (skipKeys && skipKeys.indexOf(key) >= 0) {
                        continue;
                    }

                    target[key] = source[key];
                }
            }

            if (options instanceof HTMLElement) {
                settings.parent = options;
            } else {

                if (settings.parent && options.parent && settings.parent !== options.parent) {
                    this._events.remove(settings.parent);
                    this._popupInited = false;
                }

                transfer(options, settings);

                if (options.onChange) {
                    this.onChange = options.onChange;
                }
                if (options.onDone) {
                    this.onDone = options.onDone;
                }
                if (options.onOpen) {
                    this.onOpen = options.onOpen;
                }
                if (options.onClose) {
                    this.onClose = options.onClose;
                }

                var col = options.color || options.colour;
                if (col) {
                    this._setColor(col);
                }
            }

            var parent = settings.parent;
            if (parent && settings.popup && !this._popupInited) {

                var openProxy = function openProxy(e) {
                    return _this.openHandler(e);
                };

                this._events.add(parent, 'click', openProxy);

                onKey(this._events, parent, [' ', 'Spacebar', 'Enter'], openProxy);

                this._popupInited = true;
            } else if (options.parent && !settings.popup) {
                this.show();
            }
        }
    }, {
        key: 'openHandler',
        value: function openHandler(e) {
            if (this.show()) {

                e && e.preventDefault();

                this.settings.parent.style.pointerEvents = 'none';

                var toFocus = e && e.type === EVENT_KEY ? this._domEdit : this.domElement;
                setTimeout(function () {
                    return toFocus.focus();
                }, 100);

                if (this.onOpen) {
                    this.onOpen(this.colour);
                }
            }
        }
    }, {
        key: 'closeHandler',
        value: function closeHandler(e) {
            var event = e && e.type;
            var doHide = false;

            if (!e) {
                doHide = true;
            } else if (event === EVENT_CLICK_OUTSIDE || event === EVENT_TAB_MOVE) {

                var knownTime = (this.__containedEvent || 0) + 100;
                if (e.timeStamp > knownTime) {
                    doHide = true;
                }
            } else {

                stopEvent(e);

                doHide = true;
            }

            if (doHide && this.hide()) {
                this.settings.parent.style.pointerEvents = '';

                if (event !== EVENT_CLICK_OUTSIDE) {
                    this.settings.parent.focus();
                }

                if (this.onClose) {
                    this.onClose(this.colour);
                }
            }
        }
    }, {
        key: 'movePopup',
        value: function movePopup(options, open) {

            this.closeHandler();

            this.setOptions(options);
            if (open) {
                this.openHandler();
            }
        }
    }, {
        key: 'setColor',
        value: function setColor(color, silent) {
            this._setColor(color, { silent: silent });
        }
    }, {
        key: '_setColor',
        value: function _setColor(color, flags) {
            if (typeof color === 'string') {
                color = color.trim();
            }
            if (!color) {
                return;
            }

            flags = flags || {};
            var c = void 0;
            try {

                c = new Color(color);
            } catch (ex) {
                if (flags.failSilently) {
                    return;
                }
                throw ex;
            }

            if (!this.settings.alpha) {
                var hsla = c.hsla;
                hsla[3] = 1;
                c.hsla = hsla;
            }
            this.colour = this.color = c;
            this._setHSLA(null, null, null, null, flags);
        }
    }, {
        key: 'setColour',
        value: function setColour(colour, silent) {
            this.setColor(colour, silent);
        }
    }, {
        key: 'show',
        value: function show() {
            var parent = this.settings.parent;
            if (!parent) {
                return false;
            }

            if (this.domElement) {
                var toggled = this._toggleDOM(true);

                this._setPosition();

                return toggled;
            }

            var html = this.settings.template || '<div class="picker_wrapper" tabindex="-1"><div class="picker_arrow"></div><div class="picker_hue picker_slider"><div class="picker_selector"></div></div><div class="picker_sl"><div class="picker_selector"></div></div><div class="picker_alpha picker_slider"><div class="picker_selector"></div></div><div class="picker_editor"><input aria-label="Type a color name or hex value"/></div><div class="picker_sample"></div><div class="picker_done"><button>Ok</button></div><div class="picker_cancel"><button>Cancel</button></div></div>';
            var wrapper = parseHTML(html);

            this.domElement = wrapper;
            this._domH = $('.picker_hue', wrapper);
            this._domSL = $('.picker_sl', wrapper);
            this._domA = $('.picker_alpha', wrapper);
            this._domEdit = $('.picker_editor input', wrapper);
            this._domSample = $('.picker_sample', wrapper);
            this._domOkay = $('.picker_done button', wrapper);
            this._domCancel = $('.picker_cancel button', wrapper);

            wrapper.classList.add('layout_' + this.settings.layout);
            if (!this.settings.alpha) {
                wrapper.classList.add('no_alpha');
            }
            if (!this.settings.editor) {
                wrapper.classList.add('no_editor');
            }
            if (!this.settings.cancelButton) {
                wrapper.classList.add('no_cancel');
            }
            this._ifPopup(function () {
                return wrapper.classList.add('popup');
            });

            this._setPosition();

            if (this.colour) {
                this._updateUI();
            } else {
                this._setColor(this.settings.defaultColor);
            }
            this._bindEvents();

            return true;
        }
    }, {
        key: 'hide',
        value: function hide() {
            return this._toggleDOM(false);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._events.destroy();
            if (this.domElement) {
                this.settings.parent.removeChild(this.domElement);
            }
        }
    }, {
        key: '_bindEvents',
        value: function _bindEvents() {
            var _this2 = this;

            var that = this,
                dom = this.domElement,
                events = this._events;

            function addEvent(target, type, handler) {
                events.add(target, type, handler);
            }

            addEvent(dom, 'click', function (e) {
                return e.preventDefault();
            });

            dragTrack(events, this._domH, function (x, y) {
                return that._setHSLA(x);
            });

            dragTrack(events, this._domSL, function (x, y) {
                return that._setHSLA(null, x, 1 - y);
            });

            if (this.settings.alpha) {
                dragTrack(events, this._domA, function (x, y) {
                    return that._setHSLA(null, null, null, 1 - y);
                });
            }

            var editInput = this._domEdit;
            {
                addEvent(editInput, 'input', function (e) {
                    that._setColor(this.value, { fromEditor: true, failSilently: true });
                });

                addEvent(editInput, 'focus', function (e) {
                    var input = this;

                    if (input.selectionStart === input.selectionEnd) {
                        input.select();
                    }
                });
            }

            this._ifPopup(function () {

                var popupCloseProxy = function popupCloseProxy(e) {
                    return _this2.closeHandler(e);
                };

                addEvent(window, EVENT_CLICK_OUTSIDE, popupCloseProxy);
                addEvent(window, EVENT_TAB_MOVE, popupCloseProxy);
                onKey(events, dom, ['Esc', 'Escape'], popupCloseProxy);

                var timeKeeper = function timeKeeper(e) {
                    _this2.__containedEvent = e.timeStamp;
                };
                addEvent(dom, EVENT_CLICK_OUTSIDE, timeKeeper);

                addEvent(dom, EVENT_TAB_MOVE, timeKeeper);

                addEvent(_this2._domCancel, 'click', popupCloseProxy);
            });

            var onDoneProxy = function onDoneProxy(e) {
                _this2._ifPopup(function () {
                    return _this2.closeHandler(e);
                });
                if (_this2.onDone) {
                    _this2.onDone(_this2.colour);
                }
            };
            addEvent(this._domOkay, 'click', onDoneProxy);
            onKey(events, dom, ['Enter'], onDoneProxy);
        }
    }, {
        key: '_setPosition',
        value: function _setPosition() {
            var parent = this.settings.parent,
                elm = this.domElement;

            if (parent !== elm.parentNode) {
                parent.appendChild(elm);
            }

            this._ifPopup(function (popup) {

                if (getComputedStyle(parent).position === 'static') {
                    parent.style.position = 'relative';
                }

                var cssClass = popup === true ? 'popup_right' : 'popup_' + popup;

                ['popup_top', 'popup_bottom', 'popup_left', 'popup_right'].forEach(function (c) {

                    if (c === cssClass) {
                        elm.classList.add(c);
                    } else {
                        elm.classList.remove(c);
                    }
                });

                elm.classList.add(cssClass);
            });
        }
    }, {
        key: '_setHSLA',
        value: function _setHSLA(h, s, l, a, flags) {
            flags = flags || {};

            var col = this.colour,
                hsla = col.hsla;

            [h, s, l, a].forEach(function (x, i) {
                if (x || x === 0) {
                    hsla[i] = x;
                }
            });
            col.hsla = hsla;

            this._updateUI(flags);

            if (this.onChange && !flags.silent) {
                this.onChange(col);
            }
        }
    }, {
        key: '_updateUI',
        value: function _updateUI(flags) {
            if (!this.domElement) {
                return;
            }
            flags = flags || {};

            var col = this.colour,
                hsl = col.hsla,
                cssHue = 'hsl(' + hsl[0] * HUES + ', 100%, 50%)',
                cssHSL = col.hslString,
                cssHSLA = col.hslaString;

            var uiH = this._domH,
                uiSL = this._domSL,
                uiA = this._domA,
                thumbH = $('.picker_selector', uiH),
                thumbSL = $('.picker_selector', uiSL),
                thumbA = $('.picker_selector', uiA);

            function posX(parent, child, relX) {
                child.style.left = relX * 100 + '%';
            }
            function posY(parent, child, relY) {
                child.style.top = relY * 100 + '%';
            }

            posX(uiH, thumbH, hsl[0]);

            this._domSL.style.backgroundColor = this._domH.style.color = cssHue;

            posX(uiSL, thumbSL, hsl[1]);
            posY(uiSL, thumbSL, 1 - hsl[2]);

            uiSL.style.color = cssHSL;

            posY(uiA, thumbA, 1 - hsl[3]);

            var opaque = cssHSL,
                transp = opaque.replace('hsl', 'hsla').replace(')', ', 0)'),
                bg = 'linear-gradient(' + [opaque, transp] + ')';

            this._domA.style.backgroundImage = bg + ', ' + BG_TRANSP;

            if (!flags.fromEditor) {
                var format = this.settings.editorFormat,
                    alpha = this.settings.alpha;

                var value = void 0;
                switch (format) {
                    case 'rgb':
                        value = col.printRGB(alpha);break;
                    case 'hsl':
                        value = col.printHSL(alpha);break;
                    default:
                        value = col.printHex(alpha);
                }
                this._domEdit.value = value;
            }

            this._domSample.style.color = cssHSLA;
        }
    }, {
        key: '_ifPopup',
        value: function _ifPopup(actionIf, actionElse) {
            if (this.settings.parent && this.settings.popup) {
                actionIf && actionIf(this.settings.popup);
            } else {
                actionElse && actionElse();
            }
        }
    }, {
        key: '_toggleDOM',
        value: function _toggleDOM(toVisible) {
            var dom = this.domElement;
            if (!dom) {
                return false;
            }

            var displayStyle = toVisible ? '' : 'none',
                toggle = dom.style.display !== displayStyle;

            if (toggle) {
                dom.style.display = displayStyle;
            }
            return toggle;
        }
    }], [{
        key: 'StyleElement',
        get: function get$$1() {
            return _style;
        }
    }]);
    return Picker;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Picker);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcalculator_app"] = self["webpackChunkcalculator_app"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/main"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/main"], () => (__webpack_require__("./src/sass/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;