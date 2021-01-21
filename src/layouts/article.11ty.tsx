/* eslint-disable react/no-danger */
import { h } from 'preact';
import { IData, IPage } from '@/modules/shared/model/page.model';
import style from './article.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps extends IData {
  title: string;
  content: string;
  cssPath: string;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '@/modules/shared/components';

/* -----------------------------------
 *
 * Article
 *
 * -------------------------------- */

function Page(this: IPage, { siteMeta, title, content, cssPath }: IProps) {
  return (
    <Html title={`${siteMeta.pageTitle} - ${title}`} cssPath={cssPath}>
      <main class={style.content}>
        <article class={style.article} dangerouslySetInnerHTML={{ __html: content }} />
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
