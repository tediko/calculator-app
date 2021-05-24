import Picker from 'vanilla-picker';
import ThemeSwitch from './themeSwitch';

export default class ThemeModal {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }
    
    vars() {
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
        }

        this.body = document.querySelector(`[${this.selectors.body}]`);
        this.modal = document.querySelector(`[${this.selectors.modal}]`);
        this.saveButton = document.querySelector(`[${this.selectors.saveButton}]`);
        this.toggleButton = document.querySelector(`[${this.selectors.toggleButton}]`);
        this.closeButton = document.querySelector(`[${this.selectors.closeButton}]`);
        this.colorButtons = document.querySelectorAll(`[${this.selectors.colorButtons}]`);
        this.colorGeneratorWrapper = document.querySelector(`[${this.selectors.colorGeneratorWrapper}]`);
        this.overlayWrapper = document.querySelector(`[${this.selectors.overlayWrapper}]`);
        if (!this.body || !this.modal || !this.saveButton || !this.toggleButton || !this.closeButton || !this.colorButtons || !this.colorGeneratorWrapper || !this.overlayWrapper) return false;

        // Get colors from local storage or use empty object
        this.colors = JSON.parse(localStorage.getItem('colors')) || {
            main: '',
            screen: '',
            keypad: '',
            numbers: '',
            numShad: '',
            functions: '',
            funcShad: '',
            equal: '',
            eqShad: '',
            primary: '',
            secondary: ''
        }
        this.themeSwitch = new ThemeSwitch();
        this.created = false;
        this.previousTheme;
        this.currentTheme;

        return true;
    }

    setupEvents() {
        this.toggleButton.addEventListener('click', () => this.toggle());
        this.closeButton.addEventListener('click', () => this.close());
        this.saveButton.addEventListener('click', () => this.save());
        this.colorButtons.forEach(button => {
            button.addEventListener('click', () => this.selectColor(button));
        })
    }

    // Display modal
    toggle() {
        this.modal.classList.add(`${this.selectors.activeClass}`);
        this.overlayWrapper.classList.add(`${this.selectors.activeClass}`);
        this.previousTheme = this.body.dataset.theme;
        this.setBodyTheme(this.selectors.customTheme);
        this.themeSwitch.displayCustomTheme();
        this.checkActiveInput(this.selectors.customTheme);
    }
    
    // Hide modal
    close() {
        this.modal.classList.remove(`${this.selectors.activeClass}`);
        this.overlayWrapper.classList.remove(`${this.selectors.activeClass}`);
        this.setBodyTheme(this.previousTheme);
        this.previousTheme == this.selectors.customTheme ? null : this.themeSwitch.removeCustomTheme();
        this.checkActiveInput(this.previousTheme);
    }


    // Save modal
    save() {
        this.overlayWrapper.classList.remove(`${this.selectors.activeClass}`);
        this.saveToLocalStorage();
        this.themeSwitch.displayCustomTheme();
        this.themeSwitch.saveThemeToLocalStorage(`${this.selectors.customTheme}`);
        this.modal.classList.remove(`${this.selectors.activeClass}`);
    }

    // Create new Picker class and display palette with colors
    selectColor(button) {
        if (this.created) return;
        this.created = true;
        let colorType = button.dataset.themePicker;

        let pick = new Picker({
            parent: this.colorGeneratorWrapper,
            popup: false,
            onDone: (color) => {
                this.created = false;
                button.style.backgroundColor = color.hslString;
                this.setColors(colorType, color.hslString);
                pick.destroy();
                pick = null;
            }
        })
    }

    // Assign new colors to colors object
    setColors(colorType, color) {
        this.colors[colorType] = color;
    }

    // Save colors to localStorage
    saveToLocalStorage() {
        localStorage.setItem('colors', JSON.stringify(this.colors));
    }

    // Sets data-theme attribute for body element
    setBodyTheme(theme) {
        this.body.dataset.theme = theme;
    }

    // Returns input element and set attribute checked on it
    checkActiveInput(inputDataset) {
        this.currentInput = document.querySelector(`[${this.selectors.inputDataset}="${inputDataset}"]`);
        this.currentInput.checked = true;
    }
}