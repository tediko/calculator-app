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
                this.saveThemeToLocalStorage();
            })
        })
    }

    // Change body data-attribute to chosen theme
    toggleTheme(input) {
        this.newTheme = input.dataset.themeInput;
        this.body.dataset.theme = this.newTheme;
        
        if (this.newTheme == 'custom') {
            this.displayCustomTheme();
        } else {
            this.removeCustomTheme();
        }
    }

    // Save chosen theme to local storage
    saveThemeToLocalStorage(theme) {
        localStorage.setItem('theme', JSON.stringify(`${theme || this.newTheme}`));
    }

    // This function is used on init.
    // Set active theme and add classList to enable transitions on page.
    setBodyTheme() {
        this.body.dataset.theme = this.activeTheme;

        if (this.activeTheme == 'custom') {
            this.displayCustomTheme();
        }

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

    // Add custom theme variables to body.
    displayCustomTheme() {
        this.getColors();
        this.body.style.setProperty('--c-bg-main', this.colors.main);
        this.body.style.setProperty('--c-bg-keypad', this.colors.keypad);
        this.body.style.setProperty('--c-bg-toggle', this.colors.keypad);
        this.body.style.setProperty('--c-bg-screen', this.colors.screen);
        this.body.style.setProperty('--c-keys-func', this.colors.functions);
        this.body.style.setProperty('--c-keys-func-shadow', this.colors.funcShad);
        this.body.style.setProperty('--c-keys-equal', this.colors.equal);
        this.body.style.setProperty('--c-keys-equal-shadow', this.colors.eqShad);
        this.body.style.setProperty('--c-toggle', this.colors.equal);
        this.body.style.setProperty('--c-keys', this.colors.numbers);
        this.body.style.setProperty('--c-keys-shadow', this.colors.numShad);
        this.body.style.setProperty('--c-text-primary', this.colors.primary);
        this.body.style.setProperty('--c-text-secondary', this.colors.secondary);
        this.body.style.setProperty('--c-text-header', this.colors.header);
        this.body.style.setProperty('--c-text-display', this.colors.display);
    }

    // Remove custom theme variables from body.
    removeCustomTheme() {
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

    // Fetch colors object from local storage and assign it to variable
    getColors() {
        this.colors = JSON.parse(localStorage.getItem('colors'));
    }
}