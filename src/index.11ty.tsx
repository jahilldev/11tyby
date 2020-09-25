import { h } from 'preact';

/* -----------------------------------
 *
 * IData
 *
 * -------------------------------- */

interface IData {
  title: string;
  cssPath: string;
  jsPath: string;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from './components/shared';
import { Home } from './components/home';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

class Page {
  data(): IData {
    return {
      title: 'Home - 11ty',
      cssPath: 'index.11ty.css',
      jsPath: 'index.entry.js',
    };
  }

  render({ title, cssPath, jsPath }: IData) {
    return (
      <Html title={title} cssPath={cssPath} jsPath={jsPath}>
        <Home />
      </Html>
    );
  }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Page };
