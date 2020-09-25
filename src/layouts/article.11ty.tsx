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
  cssPath: string;
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
  render({ title, content, cssPath }: IData) {
    return (
      <Html title={title} cssPath={cssPath}>
        <main class={style.content}>
          <article class={style.article} dangerouslySetInnerHTML={{ __html: content }} />
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
