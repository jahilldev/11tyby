# 11tyby

> An organised 11ty boilerplate to get you up and running fast. Features TypeScript, native JSX support via Preact, CSS Modules with SASS, a well defined webpack config for great DX, and all pre-optimised for performance.

Demo: https://11tyby.netlify.app/

## Why

Getting setup with the necessary tooling to handle TypeScript, JSX, dynamic imports, SASS etc is time consuming. This project also has partial hydration to reduce the amount of code shipped to your users.

## Structure

The project is structured via the module pattern, files are grouped via feature, e.g `./src/modules/home`. This allows you to better future proof your application as it grows, and localise code where it's needed. Your page `*.11ty.tsx` files reside within their relevant feature folder, and export a `permalink` property for [you to define their url structure](https://www.11ty.dev/docs/permalinks/), e.g:

```javascript
module.exports = {
  render: Page,
  data: () => ({
    permalink: '/my-feature/index.html',
  }),
};
```

## Styling

11tyby comes pre-setup with support for CSS Modules and SASS. You have two options to import styles, globally or localised. To convert a SASS or CSS file into a CSS Module, you'll need to apply a `.module` suffix to your file, e.g `login.module.css`. You can then import this directly into a component:

```jsx
import style from './login.module.scss';

/*[...]*/

function Login() {
  return <form class={style.form}>/*[...]*/</form>;
}
```

To import styles globally, just add a non return import statement to the file you wish to load them from, e.g:

```jsx
import './global.css';

/*[...]*/
```

To apply the generated style sheet to a page, you'll need to add a `cssPath` property within the data object exported from your `*.11ty.tsx` files, e.g:

```jsx
function Page() {
  return <main class={style.wrapper}>{/*[...]*/}</main>;
}

/*[...]*/

module.exports = {
  render: Page,
  data: () => ({
    permalink: 'index.html',
    cssPath: 'login/login.11ty.css', // <----
  }),
};
```

The path will match the respective module folder, and the name will mirror that of your `*.11ty.tsx` file name but with a CSS extension.

## Hydration

11tyby [includes a package](https://github.com/jahilldev/preactement) dedicated to applying [partial hydration](https://www.jameshill.dev/articles/partial-hydration/). This works as an HOC, wrapping the component you wish to hydrate on the client. You can apply this as follows:

```jsx
import { define } from 'preactement';

/*[...]*/

function MainForm() {
  return <form>/*[...]*/</form>;
}

/*[...]*/

const Form = define('main-form', () => MainForm);

/*[...]*/

export { Form };
```

It's recommended that you create components within their own folder, and apply this function in an `index.ts` file within. That way you can seperate any "transforms" the component might need at runtime with the component itself, you can [see an example here](https://github.com/jahilldev/11tyby/blob/master/src/modules/home/components/form/index.ts).

Once you have a hydrated component, you'll need to import it into an "Entry" file. These are suffixed with `.entry`, and must be placed within their respective module folder, e.g `./src/home/home.entry.ts`.

The entry file needs to import your hydrated components, e.g:

```javascript
import '@/modules/home/components/form';
```

This file is then referenced within your `*.11ty.tsx` file by passing it into the `data` object exported from your component, e.g:

```jsx
/*[...]*/
function Page() {
  return <main>{/*[...]*/}</main>;
}

/*[...]*/

module.exports = {
  render: Page,
  data: () => ({
    permalink: 'index.html',
    jsPath: 'home/home.entry.js', // <----
  }),
};
```

For a working example, [take a look at the `home` module here](https://github.com/jahilldev/11tyby/blob/master/src/modules/home/home.11ty.tsx#L28).

## Data

All official 11ty methods to gather data from an API or otherwise, will work here. There are many great examples of how to do this in the official 11ty documentation, including the use of GraphQL: https://www.11ty.dev/docs/data-js/.

To define _global_ data, add either JSON, JS or TypeScript files to the `./src/data` folder. These will then be parsed by 11ty and added via the [data cascade](https://www.11ty.dev/docs/data-cascade/). You can access these directly in your `.11ty.ts*` files.

For example, if you were to add a `global.ts` file to `./src/data`, you would access this via a `global` property in your pages argument object:

```tsx
interface IProps {
  global: {
    title: string;
  };
}

/*[...]*/

function Page({ global }: IProps) {
  return (
    <main>
      <h1>{global.title}</h1>
    </main>
  );
}
```

To add local data, e.g data specific to a module, add a file suffixed with `.data` within the relevant module folder. This will then be accessible in exactly the same way as shown above, but only for that page. For example, if you added `home.data.ts` to `./src/modules/home`, your home page `11ty.tsx` file would have access to the values held within that data file.

## Installation

### 1. Clone or download the repository

```shell
git clone git@github.com:jahilldev/11tyby.git
```

### 2. Install the project dependencies

```shell
yarn
```

## Development

```shell
yarn start
```

## Build production

```shell
yarn build
```
