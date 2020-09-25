import { h } from 'preact';
import style from './home.module.scss';

/* -----------------------------------
 *
 * Newsletter
 *
 * -------------------------------- */

import { Form } from '@/components/form';

/* -----------------------------------
 *
 * Home
 *
 * -------------------------------- */

function Home() {
  return (
    <main class={style.content}>
      <p class={style.text}>11ty Setup</p>
      <Form title="Hydrated Form" className={style.form} />
    </main>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Home };
