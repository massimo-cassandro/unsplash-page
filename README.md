# Unsplash pages

> NEED-FIX: react version throw an error with css modules on symfony encore

Single page with random photo from [Unsplash](https://unsplash.com/) to display some messages (useful for error pages).

Available in both React and Vanilla JS.

This component comes from some experiments I did with the Unsplash API. The initial purpose was to display more appealing error pages, but you can use it for any use.

For best results, it is advisable to display images from a photo collection prepared on Unsplash. The demos in this repository use my collection ["World"](https://unsplash.com/collections/3660951/world).

You need to create a server script to retrieve the JSON data of a random image from Unsplash (see [Get a Random Photo](https://unsplash.com/documentation#get-a-random-photo) on Unsplash API docs).

The script also implements [BlurHash](https://blurha.sh/), to show a placeholder of the image until it loads.

For more details and examples take a look at:

* <https://unsplash.com/developers>
* [A Random Image Slideshow With Unsplash and React](https://betterprogramming.pub/a-random-image-slideshow-with-unsplash-and-react-1b6aee698652)
* [Unsplash Random Photo 1](https://github.com/massimo-cassandro/area-test/tree/main/2023-03-unsplash-random-photo-1)
* [Random Unsplash Photos Slideshow](https://github.com/massimo-cassandro/area-test/tree/main/2023-05-unsplash-random-photo-2)
* [A Split Image Effect in React](https://medium.com/better-programming/a-split-image-effect-in-react-beb2baa3fe5f) and [split image](https://github.com/massimo-cassandro/area-test/tree/main/2023-07-split-image)


The SVG icons used in the script are from [Phosphor Icon](https://phosphoricons.com/). At the moment it is not possible to use different ones without modifying the source code.

## Installation

Install from NPM:

```bash
npm i -S --omit=dev @massimo-cassandro/unsplash-page
```

For the React version you will also need (in addition to React, of course): [nanoid](https://www.npmjs.com/package/nanoid) and [react-blurhash](https://www.npmjs.com/package/react-blurhash).

And for the Vanilla JS version: [blurhash](https://www.npmjs.com/package/blurhash).

Probably, you'll also need [Sass](https://sass-lang.com/).

Some of these packages are not included by default because they depend on your development environment, so you may have to install them yourself.

The two demo versions are built with [Create React App](https://create-react-app.dev/) and [Rollup](https://rollupjs.org/) + Sass;


## Using the React version

Demo: <https://massimo-cassandro.github.io/unsplash-page/demo/react/index.html>

First import the component:

```javascript
import { UnsplashPage } from '@massimo-cassandro/unsplash-page/react';
```

and then, in your app:

```javascript
<UnsplashPage
  className='class'
  unsplashDataUrl='url'
  utmSource='source'
  title='Message title'
  text={<p>This is the message <strong>text</strong></p>}
  backLink={<a href="link/to/home">Back to home</a>}
  hidePhotoLink={true}
/>
```

where:

* `className`: Optional className to be added to the container. It can be used to scope custom CSS properties to customize colors, fonts, etc. (see later)
* `unsplashDataUrl`: **Required**. Url to get the Unsplash data (for more info: <https://betterprogramming.pub/a-random-image-slideshow-with-unsplash-and-react-1b6aee698652>)
* `utmSource`: **Required**. Utm source string, required by Unsplash for links to authors profiles (<https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines>)
* `title`: **Required**. Message title
* `text`: Message text. If it's a string, it's wrapped in a `p` tag, otherwise in a `div`
* `backLink`: Optional React element for displaying a link. It's wrapped in a `p.backLink` tag
* `hidePhotoLink`: if `true`` (default) the icon (in the top right corner) with the link to the original image on Unsplash is only shown on mouse hover. On touch devices the icon is always visible

For CSS customization see below.


## Using the Vanilla JS version

Demo: <https://massimo-cassandro.github.io/unsplash-page/demo/vanilla-js/index.html>


Add to your script:

```javascript
import { unsplashPageJS } from '@massimo-cassandro/unsplash-page';


unsplashPageJS({
  targetElement    : document.getElementById('root'),
  className        : 'class',
  unsplashDataUrl  : 'url',
  utmSource        : 'source',
  title            : 'Message title',
  text             : 'This is the message <strong>text</strong>',
  backLink         : '<a href="link/to/home">Back to home</a>',
  hidePhotoLink    : true,
  cssModules       : false,
  cssModulesObj    : null
});
```

where:

* `className`, `unsplashDataUrl`, `utmSource` and `hidePhotoLink` correspond exactly to what is described in the React version
* `title`, `text` and `backLink` are like the previous ones, but in this case they are always strings
* `targetElement`: The DOM element in which to insert the necessary markup
* `cssModules`: Set to true if your bundler uses CSS Modules (default `false`)
* `cssModulesObj`: If you are using CSS Modules, assign to these parameter the imported styles object (see below).

### CSS
Vanilla JS does not include any CSS, to maintain maximum flexibility of use.

Then you can plug your CSS into the html (like I did in the Vanilla JS demo) or manage it with Rollup, Webpack etc.

If you are using CSS modules, you need to share the parsed CSS object with the script so that the processed class names can be used:


```javascript
import styles from '@massimo-cassandro/unsplash-page/src/unsplash-page.module.scss';

unsplashPageJS({
  /* ... */
  cssModules       : true,
  cssModulesObj    : styles
});
```

### SVG icons

SVG icons are imported into the script, both in the React and Vanilla JS versions.

In the latter, they need to be managed by your bundler to ensure they load correctly. In the demo, I used [@rollup/plugin-image](https://www.npmjs.com/package/@rollup/plugin-image) to import them as base64. Since they are very small, this seems to be the simplest solution.


## CSS customization

You can customize the CSS (fonts, colors, etc.) using some CSS custom properties.

You need to provide them as a separate CSS file to change the default settings.

Below you can see the list of properties set with their default values: simply reset the ones you want to change and ignore the others.

You can do this by setting variables in the `:root` element, or you can narrow their scope to the component container by assigning it a class (thru the `className` parameter) and then using it in you CSS.

```css
/* needed if your script doesn't embed the scss file */
@import '@massimo-cassandro/unsplash-page/src/unsplash-page.module.scss';

/* All properties shown below are set with their default values. You can then set only the ones you need */

.your-custom-class { /* or :root */

  /* background and color for text boxes */
  --up-bg-color: hsl(0deg 0% 0% / .7);
  --up-text-color: #fff;

  /* Basic props */
  --up-font-family: sans-serif;
  --up-font-size: 1rem;
  --up-font-weight: 400;
  --up-line-height: 1.4;
  --up-font-variation-settings: unset;

  /* optional extra values for h1 */
  --up-h1-color: #fff;
  --up-h1-font-size: 2rem;
  --up-h1-font-weight: 700;
  --up-h1-line-height: 1.25;
  --up-h1-font-variation-settings: unset;

  /* links */
  --up-link-color: #fc0;
  --up-link-decoration: none;
  --up-link-hover-color: var(--up-link-color);
  --up-link-hover-decoration: underline;

  /* optional extra values for credits box */
  --up-credits-font-size: .8em;
  --up-credits-font-weight: 400;
  --up-credits-line-height: 1.3;

  /* icons */
  --up-icon-fill-color: #333;
  --up-icon-box-bg: var(--up-link-color);
  --up-icon-hover-box-bg: #fff;

  /* loader */
  --up-loader-color: hsl(0deg 0% 100% / .6);
}
```

## Using http error codes

Using HTTP Error Codes from your server can be a clever way to use this component.

First, get the error code from your server (404, 500, etc.), for example by setting it as a `data` attribute somewhere, then pass it to the script that implements UnsplashPage.
Matching the errorCode with an object of predefinited titles and text, can do the trick:


```javascript
const myErrorCode = +document.body.dataset.errorCode || 500;

const errorTypes = {
  403: {
    title: 'Oops… You can’t access this page', 
    // title: 'Ops… Non puoi accedere a questa pagina',
    text: null
  },
  404: {
    title: 'Oops… This page does not exist', 
    // title: 'Ops… Questa pagina non esiste',
    text: null
  },
  500: {
    title: 'Oops… An error has occurred', 
    // title: 'Ops… Si è verificato un errore',
    text: null
  },
  503: {
    title: 'Sorry, this site is temporarily under maintenance', 
    // title: 'Siamo spiacenti, il sito è temporaneamente in manutenzione',
    text: null
  }
};

<UnsplashPage
  // ...
  title={errorTypes[myErrorCode].title}
  text={errorTypes[myErrorCode].text}
  backLink={myErrorCode !== 503? <a href="link/to/home">Back to home</a> : null}
/>
```



## Images breakpoints & sizes

Images are uploaded at different sizes using the [Unsplash API](https://unsplash.com/documentation#dynamically-resizable-images). Other than a few differences, CSS media query breakpoints are the same as those in [Bootstrap 5](https://getbootstrap.com/docs/5.3/layout/breakpoints/).

The following table reports the image size for each breakpoint:


| BS5 breakpoint               |   xs  |    sm    |     md    |     lg     |      xl     |   xxl  |
|------------------------------|:-----:|:--------:|:---------:|:----------:|:-----------:|:------:|
| Page width                   | < 576 | 576 -767 | 768 - 991 | 992 - 1199 | 1200 - 1399 | >=1400 |
| img width                    |  576  |    768   |    992    |    1200    |     1400    |  1920  |
| img height (16/9)            |  324  |    432   |    558    |     675    |     788     |  1080  |
| img height (4/3)             |  432  |    576   |    744    |     900    |     1050    |  1440  |
| img height (9/21, portrait)  |  1344 |          |           |            |             |        |
| img height (21/9, landscape) |  247  |          |           |            |             |        |

Sizes and breakpoints are defined in the `img-breakpoints.js` file.


## TODO

* More efficient css & custom properties management (defaults, cfg settings, etc)
* more shared elements between react and vanilla version (?)
* image refresh option
* icons customizations
* Fix the `main` field in `package.json` to allow imports without writing the full path (get some issues from rollup when exporting React and Vanilla JS scripts togheter) 
