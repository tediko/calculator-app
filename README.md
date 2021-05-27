# Frontend Mentor - Calculator app

![Design preview for the Calculator app coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [Intro](#intro)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [Useful resources](#useful-resources)

## Overview

### Intro
Hello! This is my solution to [Calculator app - Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). It was one of the most enjoyable challenges I have done so far. When I saw that challenge requires a change theme I decided to add another functionality which is extra "*custom*" theme where the user can edit freely colors in theme modal. Many times, when I finished a certain function, I had an idea with another one, and I had a lot of fun doing it. Honestly, It took me more time to made this custom modal than the calculator itself - which itself was a good javascript challenge as well. You can use both the keyboard and the mouse to enter data into the calculator.

### The challenge

>Your challenge is to build out this calculator app and get it looking as close to the design as possible.
>
>You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.
>
>Your users should be able to:
>
>- See the size of the elements adjust based on their device's screen size
>- Perform mathematical operations like addition, subtraction, multiplication, and division
>- Adjust the color theme based on their preference
>- Bonus: Have their initial theme preference checked using prefers-color-scheme and have any additional changes saved in the browser

### Links

- [LIVE PREVIEW](https://calculator-tediko.netlify.app/) to check my solution.
- [Frontend Mentor](https://www.frontendmentor.io) challenges allow you to improve your skills in a real-life workflow.

## My process

### Built with

 - Webpack
 - SCSS
 - BEM methodology
 - Mobile first
 - Semantic HTML5 markup
 - JavaScript
 - Flexbox
 - Grid
 - vanilla-picker library

### Features

- Added **customizable settings** for 4th theme. User selected colors are saved in ***Local Storage*** so the settings are saved and loaded when the user will come back to the site. The user can set 13 options, but he doesn't have to change all of them, he can only change those that interest him. To get the color from user I used [**vanilla-picker library**](https://vanilla-picker.js.org/?fbclid=IwAR03FvlXZmEnrPI6_NJAHwD056kdFzlze2lE5TGUCkB0P-_sOHerHNpnFtY) which creates a color palette from which to choose. Palette always show current set color of element you want to change so it is easy to adjust colors back and forth without searching for that color again. 
- Added **prefers-color-scheme** CSS media feature which is used to detect if the user has requested a *light* or *dark* color theme and save it to ***Local Storage***. I made it with window interface `matchMedia()` method. It returns a new `MediaQueryList object` that can then be used to determine if the document matches the media query string. In this case *prefers-color-scheme*.
- Implemented **focus trap** inside modal to make it *ADA compliant*. Focus trap in short prevent our focus go outside the modal once the modal is opened.
- While displaying the result, I used `toLocaleString()` method to return a string with a language-sensitive representation of this number. In short it convert *3500* to *3,500* if in U.S.
- I tried to make my comments more readable and transparent. For this purpose, I used JavaScript **description** comments which are equivalent to Python docstring. If you precede your function definitions with a description comment, VSCode will pick it up and include it as a tooltip. It’s like having MDN right there in your editor.
- I used `object literals` instead of `if statement` in several cases. Shortly, we have an object where the keys are the conditions and the values are the responses. Then we can use the square bracket notation to select the correct value of the object from the argument passed in. This looks clean and I will definitely continue to use this.

### Useful resources
 - [LINK - webpack](https://laravel-mix.com/docs/6.0/what-is-mix)
 - [LINK - vanilla-picker library](https://vanilla-picker.js.org/?fbclid=IwAR03FvlXZmEnrPI6_NJAHwD056kdFzlze2lE5TGUCkB0P-_sOHerHNpnFtY)
 - [LINK - prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
 - [LINK - How to detect user prefered theme in JS](https://ourcodeworld.com/articles/read/1114/how-to-detect-if-the-user-prefers-a-light-or-dark-color-schema-in-the-browser-with-javascript-and-css).
 - [LINK - Focus trap](https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700)
 - [DOCS - toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
 - [LINK - Write your own javascript contracts and docstrings](https://dev.to/stephencweiss/write-your-own-javascript-contracts-and-docstrings-42ho)
 - [LINK - Object literals](https://betterprogramming.pub/dont-use-if-else-and-switch-in-javascript-use-object-literals-c54578566ba0).