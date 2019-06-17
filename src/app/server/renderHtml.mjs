
import {renderToString} from 'react-dom/server';
import {compose, always} from 'ramda';
import {
    ramdaCdnUrl,
    reactCdnUrl,
    reactDomCdnUrl,
    recomposeCdnUrl,
    reduxCdnUrl,
    reactReduxCdnUrl,
    reduxThunkCdnUrl,
    isProductionMode,
    reselectCdnUrl,
    YMAPS_JSONP_CALLBACK,
} from '../../config';
import {YMAPS_API_KEY} from '../../config/private';
import {renderApp, getStore} from '../common';

const bodyStyle = 'background-color: #f0f0f0;';

// const bundleRoot = isProductionMode ? '/static/' : 'http://localhost:8080/';
const bundleRoot = isProductionMode ? '/static/' : '/static/';
const ymapsMode = isProductionMode ? 'release' : 'debug';

const serverRenderingOn = always(isProductionMode);

const renderAppContent = compose(renderToString, renderApp, getStore);

const render = initialState => (
    serverRenderingOn()
        ? renderAppContent(initialState)
        : ''
);

// <meta name="apple-mobile-web-app-capable" content="yes">
// <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

export default initialState => `<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="address=no">
    <meta name="theme-color" content="#1f2c3b">
    <link rel="stylesheet" href="${bundleRoot}app.css">
    <link rel="icon" type="image/png" href="/static/favicon.png" sizes="32x32">
</head>
<body style="${bodyStyle}">

<div id="app">${render(initialState)}</div>

<script src="${ramdaCdnUrl}"></script>
<script src="${reactCdnUrl}"></script>
<script src="${reactDomCdnUrl}"></script>
<script src="${recomposeCdnUrl}"></script>
<script src="${reduxCdnUrl}"></script>
<script src="${reactReduxCdnUrl}"></script>
<script src="${reduxThunkCdnUrl}"></script>
<script src="${reselectCdnUrl}"></script>
<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
<script src="${bundleRoot}app.js"></script>
<script src="https://api-maps.yandex.ru/2.1/?apikey=${YMAPS_API_KEY}&mode=${ymapsMode}&onload=${YMAPS_JSONP_CALLBACK}&lang=ru_RU"></script>
</body>
</html>`;
