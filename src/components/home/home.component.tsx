import { h } from 'preact';
import style from './home.module.scss';

/* -----------------------------------
 *
 * Home
 *
 * -------------------------------- */

function Home() {
  return (
    <main class={style.content}>
      <p class={style.text}>11ty Starter</p>
    </main>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Home };
