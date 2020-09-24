import { h } from 'preact';
import style from './article.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IData {
  title: string;
  content: string;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '../components/shared';

/* -----------------------------------
 *
 * Article
 *
 * -------------------------------- */

class Page {
  render({ title, content }: IData) {
    return (
      <Html title={title}>
        <article class={style.article} dangerouslySetInnerHTML={{ __html: content }} />
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
