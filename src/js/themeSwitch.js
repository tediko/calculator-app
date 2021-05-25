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
        this.getUserPreferedTheme(this.isThemeSet()); 
        this.setBodyTheme();

        this.inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.toggleTheme(input);
                this.saveThemeToLocalStorage();
            })
        })
    }

    // 
    /**
    * Change body data-attribute to new theme from focused element.
    * @param    {element} input    Current focused element
    */
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
                input.checked = true;
                
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

    /**
    * Fetch colors object from local storage or use default object
    * @return   {object}    Object with colors
    */
    getColors() {
        return JSON.parse(localStorage.getItem('colors')) || 
            {
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
    isThemeSet() {
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
    getUserPreferedTheme(isThemeSet) {
        if (isThemeSet) return false;

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.saveThemeToLocalStorage(this.selectors.darkTheme);
        } else {
            this.saveThemeToLocalStorage(this.selectors.lightTheme);
        }
    }
}