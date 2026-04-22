import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { getAllRoutes, getPageMetadata, siteUrl } from './seo';

export function render(url: string) {
  return {
    appHtml: renderToString(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </React.StrictMode>,
    ),
    metadata: getPageMetadata(url),
  };
}

export function getPrerenderRoutes() {
  return getAllRoutes();
}

export function getWebsiteUrl() {
  return siteUrl;
}
