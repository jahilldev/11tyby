/* eslint-disable react/no-danger */
import { h } from 'preact';
import { IData, IPage } from '@/modules/shared/model/page.model';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps extends IData {
  title: string;
  content: string;
  cssPath: string;
  jsPath: string;
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

function Page(this: IPage, { siteMeta, title = '', content, cssPath, jsPath }: IProps) {
  const pageCss = this.getAssetContents(['layouts/default.11ty.css', cssPath]);
  const pageTitle = [siteMeta.pageTitle, title].filter((item) => !!item).join(' - ');

  return (
    <Html title={pageTitle} inlineCss={pageCss} jsPath={jsPath}>
      {content}
    </Html>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

module.exports = Page;
