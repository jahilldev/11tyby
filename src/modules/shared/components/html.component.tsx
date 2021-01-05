/* eslint-disable react/no-danger */
import { h, Fragment } from 'preact';
import style from './html.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  title?: string;
  summary?: string;
  inlineCss?: string;
  cssPath?: string;
  jsPath?: string;
  children: any;
}

/* -----------------------------------
 *
 * Html
 *
 * -------------------------------- */

function Html({ title = '11ty', summary, inlineCss, cssPath, jsPath, children }: IProps) {
  const scripts = ['vendor.js', jsPath];

  return (
    <html lang="en" class={style.html}>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={summary} />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        {jsPath && (
          <Fragment>
            {scripts.map((script) => (
              <link rel="preload" as="script" href={`/assets/${script}`} />
            ))}
          </Fragment>
        )}
        {inlineCss && <style dangerouslySetInnerHTML={{ __html: inlineCss }} />}
        {cssPath && <link rel="stylesheet" href={`/assets/${cssPath}`} />}
      </head>
      <body class={style.body}>
        {children}
        {jsPath && (
          <Fragment>
            {scripts.map((script) => (
              <script src={`/assets/${script}`} defer={true} />
            ))}
          </Fragment>
        )}
      </body>
    </html>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Html };
