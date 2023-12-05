/*
  NB: test & demo only usage

  * in production mode (demo) CORS is allowed only on GitHub pages
  * in dev mode you may need to start a local php server as a proxy to bypass CORS restriction
    (`npm run 'run php demo server'`).

  See readme foir more details
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import UnsplashPage from './UnsplashPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UnsplashPage
      // className='demo-container' // optional
      unsplashDataUrl={process.env.NODE_ENV === 'production'? 'https://primominuto.altervista.org/proxy/getUnsplashPhotos.php' : 'http://localhost:8000/demo-data.php'}
      utmSource='react+test'
      title='Message title'
      text={<p>This is the message <strong>text</strong></p>}
      backLink={<a href="https://github.com/massimo-cassandro/unsplash-page">Back to repository home</a>}
      hidePhotoLink={true}
    />
  </React.StrictMode>
);
