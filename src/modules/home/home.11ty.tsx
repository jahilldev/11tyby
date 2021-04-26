import { h } from 'preact';
import { IPage, IData } from '../shared/model/page.model';
import style from './home.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps extends IData {
  permalink: string;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Form } from '@/modules/home/components/form';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page(this: IPage, { siteMeta }: IProps) {
  return (
    <main class={style.content}>
      <p class={style.text}>{siteMeta.pageTitle}</p>
      <a href="/articles/first-post" class={style.link}>
        Go to the First post
      </a>
      <Form title="Hydrated Form" className={style.form} />
    </main>
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
    layout: 'default.11ty.js',
    cssPath: 'home/home.11ty.css',
    jsPath: 'home/home.entry.js',
    permalink: 'index.html',
  }),
};
