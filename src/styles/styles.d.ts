/* -----------------------------------
 *
 * Style
 *
 * -------------------------------- */

declare module '*.scss' {
  interface IStyle {
    [className: string]: string;
  }

  const style: IStyle;

  export { IStyle };
  export default style;
}

/* -----------------------------------
 *
 * Woff
 *
 * -------------------------------- */

declare module '*.woff' {
  const value: string;

  export default value;
}

/* -----------------------------------
 *
 * SVG
 *
 * -------------------------------- */

declare module '*.svg' {
  const value: string;

  export default value;
}

/* -----------------------------------
 *
 * JPG
 *
 * -------------------------------- */

declare module '*.jpg' {
  const value: string;

  export default value;
}

/* -----------------------------------
 *
 * PNG
 *
 * -------------------------------- */

declare module '*.png' {
  const value: string;

  export default value;
}
