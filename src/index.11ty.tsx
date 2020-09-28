import { h } from 'preact';
import style from './index.module.scss';

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
import { Form } from '@/components/form';

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
        <main class={style.content}>
          <p class={style.text}>11ty Setup</p>
          <a href="/articles/first-post" class={style.link}>
            Go to the First post
          </a>
          <Form title="Hydrated Form" className={style.form} />
        </main>
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
