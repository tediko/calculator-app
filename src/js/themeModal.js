import Picker from 'vanilla-picker';

export default class ThemeModal {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }
    
    vars() {
        this.selectors = {
            modal: 'data-modal',
            toggleButton: 'data-settings',
            closeButton: 'data-modal-close',
            colorButtons: 'data-theme-picker',
            colorGeneratorWrapper: 'data-color-generator',
        }

        this.modal = document.querySelector(`[${this.selectors.modal}]`);
        this.toggleButton = document.querySelector(`[${this.selectors.toggleButton}]`);
        this.closeButton = document.querySelector(`[${this.selectors.closeButton}]`);
        this.colorButtons = document.querySelectorAll(`[${this.selectors.colorButtons}]`);
        this.colorGeneratorWrapper = document.querySelector(`[${this.selectors.colorGeneratorWrapper}]`);
        if (!this.modal || !this.toggleButton || !this.closeButton || !this.colorButtons || !this.colorGeneratorWrapper) return false;

        this.colors = {
            main: '',
            screen: '',
            keypad: '',
            numbers: '',
            numShad: '',
            functions: '',
            funShad: '',
            equal: '',
            eqShad: '',
            primary: '',
            secondary: ''
        }
        this.created = false;

        return true;
    }

    setupEvents() {
        this.toggleButton.addEventListener('click', () => this.toggle());
        this.closeButton.addEventListener('click', () => this.close());
        this.colorButtons.forEach(button => {
            button.addEventListener('click', () => this.selectColor(button));
        })
    }

    // Display modal
    toggle() {
        this.modal.classList.add('active');
    }

    // Hide modal
    close() {
        this.modal.classList.remove('active');
        this.updateLocalStorage();
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

    // Assign new colors to object
    setColors(colorType, color) {
        this.colors[colorType] = color;
    }

    /* Update localStorage */
    updateLocalStorage() {
        localStorage.setItem('colors', JSON.stringify(this.colors));
    }
}