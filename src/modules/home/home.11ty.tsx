import { h } from 'preact';
import { IPage, IData } from '../shared/model/page.model';
import style from './home.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '@/modules/shared/components';
import { Form } from '@/modules/home/components/form';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page(this: IPage, { siteMeta }: IData) {
  const inlineCss = this.getAssetContents('home/home.11ty.css');

  return (
    <Html
      title={siteMeta.pageTitle}
      summary="11ty demo"
      inlineCss={inlineCss}
      jsPath="home/home.entry.js"
    >
      <main class={style.content}>
        <p class={style.text}>11tyby</p>
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

module.exports = {
  render: Page,
  data: () => ({
    permalink: 'index.html',
  }),
};
