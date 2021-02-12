import * as siteMeta from '@/data/siteMeta';

/* -----------------------------------
 *
 * IPage
 *
 * -------------------------------- */

interface IPage {
  slug: string;
  url: string;
  getCollectionItem: (page: string) => any;
  getPreviousCollectionItem: (page: string) => any;
  getNextCollectionItem: (page: string) => any;
  getAssetContents: (file: string) => string;
}

/* -----------------------------------
 *
 * IData
 *
 * -------------------------------- */

interface IData {
  siteMeta: typeof siteMeta;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IPage, IData };
