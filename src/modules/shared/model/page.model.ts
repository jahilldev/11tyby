/* -----------------------------------
 *
 * IPage
 *
 * -------------------------------- */

interface IPage {
  slug: string;
  url: string;
  getCollectionItem: any;
  getPreviousCollectionItem: any;
  getNextCollectionItem: any;
  getAssetContents: (file: string) => string;
}

/* -----------------------------------
 *
 * IData
 *
 * -------------------------------- */

interface IData {
  siteMeta: {
    pageTitle: string;
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IPage, IData };
