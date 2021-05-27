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
        
        this.themeSwitch = new ThemeSwitch();
        this.colors = this.themeSwitch.getColors(); // Get colors from local storage or use empty object with default colors
        this.created = false;
        this.previousTheme;
        this.currentTheme;
        this.previousElementFocused;

        return true;
    }

    setupEvents() {
        this.toggleButton.addEventListener('click', (event) => {
            this.toggle();
            this.previousElementFocused = event.target;
        });
        this.closeButton.addEventListener('click', () => this.close());
        this.saveButton.addEventListener('click', () => this.save());
        this.colorButtons.forEach(button => {
            button.addEventListener('click', () => this.selectColor(button));
        });
        this.modal.addEventListener('keydown', (event) => {
            let escapeKeyCode = 27;
            if (event.keyCode == escapeKeyCode) {
                this.close();
            }
        })
    }

    /**
    * Function that displays modal
    */
    toggle() {
        this.modal.classList.add(`${this.selectors.activeClass}`);
        this.overlayWrapper.classList.add(`${this.selectors.activeClass}`);
        this.previousTheme = this.body.dataset.theme;
        this.setBodyTheme(this.selectors.customTheme);
        this.themeSwitch.displayCustomTheme();
        this.checkActiveInput(this.selectors.customTheme);
        this.focusTrap();
        window.setTimeout(() => {
            this.firstFocusableElement.focus();
        }, 50);
        this.assignColorsToButtonsDataAttribute();
    }
    
    /**
    * Function that hide/close modal
    */
    close() {
        this.modal.classList.remove(`${this.selectors.activeClass}`);
        this.overlayWrapper.classList.remove(`${this.selectors.activeClass}`);
        this.setBodyTheme(this.previousTheme);
        this.previousTheme == this.selectors.customTheme ? null : this.themeSwitch.removeCustomTheme();
        this.checkActiveInput(this.previousTheme);
        this.previousElementFocused.focus();
        if (this.pick) {
            this.created = false;
            this.pick.destroy();
            this.pick = null;
        }
        this.setButtonColorsFromDataAttribute();
    }

    /**
    * Function that save modal
    */
    save() {
        this.overlayWrapper.classList.remove(`${this.selectors.activeClass}`);
        this.saveToLocalStorage();
        this.themeSwitch.displayCustomTheme();
        this.themeSwitch.saveThemeToLocalStorage(`${this.selectors.customTheme}`);
        this.modal.classList.remove(`${this.selectors.activeClass}`);
    }

    /**
    * Create new Picker class and display palette with colors.
    * Save picked colors with setColors function. 
    * @param    {Element} button    Element for picker parent
    */
    selectColor(button) {
        if (this.created) return;
        this.created = true;
        let colorType = button.dataset.themePicker;
        let buttonCurrentColor = window.getComputedStyle(button).backgroundColor;

        setTimeout(() => {
            const editor = document.querySelector('.picker_editor input');
            editor.focus();
        }, 100)

        this.pick = new Picker({
            parent: this.colorGeneratorWrapper,
            popup: false,
            color: buttonCurrentColor,
            onDone: (color) => {
                setTimeout(() => {
                    this.created = false;
                }, 100)
                button.style.backgroundColor = color.hslString;
                this.pick.destroy();
                this.setColors(colorType, color.hslString);
                this.pick = null;
                button.focus();
            }
        })
    }

    /**
    * Assign new colors to colors object
    * @param    {String} colorType    Name of color type
    * @param    {String} color    color
    */
    setColors(colorType, color) {
        this.colors[colorType] = color;
    }

    /**
    * Function that save colors to localStorage
    */
    saveToLocalStorage() {
        localStorage.setItem('colors', JSON.stringify(this.colors));
    }

    /**
    * Sets data-theme attribute for body element
    * @param    {String}    theme    Name of theme
    */
    setBodyTheme(theme) {
        this.body.dataset.theme = theme;
    }

    /**
    * Assign input with passed name to variable.
    * Set attribute checked on that element.
    * @param    {String}    inputDataset    Name of input data-attribute value
    */
    checkActiveInput(inputDataset) {
        this.currentInput = document.querySelector(`[${this.selectors.inputDataset}="${inputDataset}"]`);
        this.currentInput.checked = true;
    }

    /**
    * Function to keep focus inside modal when pressing tab
    */
    focusTrap() {
        const focusableElements = 'button';
        this.firstFocusableElement = this.modal.querySelectorAll(focusableElements)[0];
        const focusableContent = this.modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', (event) => {
            let isTabPressed = event.key === 'Tab' || event.keyCode === 9;
            if (!isTabPressed) return;

            if (event.shiftKey) {
                if (document.activeElement === this.firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                this.firstFocusableElement.focus();
                event.preventDefault();
                }
            }
        });
    }

    /**
    * Function that save current background-colors from buttons to data-attribute
    */
    assignColorsToButtonsDataAttribute() {
        this.colorButtons.forEach(button => {
            button.dataset.color = window.getComputedStyle(button).backgroundColor;
        })
    }

    /**
    * Function that set background-colors on buttons from data-attribute
    */
    setButtonColorsFromDataAttribute() {
        this.colorButtons.forEach(button => {
            button.style.backgroundColor = `${button.dataset.color}`;
        })
    }
}