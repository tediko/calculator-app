export default class ThemeSwitch {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            body: 'data-theme',
            inputs: 'data-theme-input',
            componentWrapper: 'data-component',
            calc: 'data-calc',
            lightTheme: 'light',
            darkTheme: 'dark',
            neonTheme: 'neon',
            enableTransitions: 'enable-transition'
        }

        this.body = document.querySelector(`[${this.selectors.body}]`);
        this.inputs = document.querySelectorAll(`[${this.selectors.inputs}]`);
        this.componentWrapper = document.querySelector(`[${this.selectors.componentWrapper}]`);
        this.calc = document.querySelector(`[${this.selectors.calc}]`);
        if (!this.body || !this.inputs || !this.componentWrapper || !this.calc) return false;

        this.activeTheme = JSON.parse(localStorage.getItem('theme')) || this.selectors.darkTheme;

        return true;
    }

    setupEvents() {
        this.setBodyTheme();

        this.inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.toggleTheme(input);
                this.saveToLocalStorage();
            })
        })
    }

    // Change body data-attribute to chosen theme
    toggleTheme(input) {
        this.newTheme = input.dataset.themeInput;
        this.body.dataset.theme = this.newTheme;
    }

    // Save chosen theme to local storage
    saveToLocalStorage() {
        localStorage.setItem('theme', JSON.stringify(`${this.newTheme}`));
    }

    // This function is used on init.
    // Set active theme and add classList to enable transitions on page.
    setBodyTheme() {
        this.body.dataset.theme = this.activeTheme;

        this.inputs.forEach(input => {
            let inputTheme = input.dataset.themeInput;
            let delay = 50;
            
            if (inputTheme == this.activeTheme) {
                input.setAttribute('checked', '');

                window.setTimeout(() => {
                    this.calc.classList.add(`${this.selectors.enableTransitions}`);
                    this.componentWrapper.classList.add(`${this.selectors.enableTransitions}`);
                }, delay)
            } else {
                return false;
            }
        })
    }
}