import { h } from 'preact';
import style from './index.module.scss';

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

function Page() {
  return (
    <Html title="Home - 11ty" cssPath="index.11ty.css" jsPath="index.entry.js">
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

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

module.exports = Page;
