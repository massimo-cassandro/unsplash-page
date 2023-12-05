import { unsplashPageJS } from '../../src/unsplash-page';

unsplashPageJS({
  targetElement    : document.getElementById('root'),
  // unsplashDataUrl  : 'http://localhost:8000/demo-data.php',
  unsplashDataUrl  : 'https://primominuto.altervista.org/proxy/getUnsplashPhotos.php',
  utmSource        : 'vanilla-js-test',
  title            : 'Message title',
  text             : 'This is the message <strong>text</strong>',
  backLink         : '<a href="https://github.com/massimo-cassandro/unsplash-page">Back to repository home</a>',
  hidePhotoLink    : true,
  cssModules       : false,
  cssModulesObj    : null
});
