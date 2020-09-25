import { h, render, ComponentFactory } from 'preact';

/* -----------------------------------
 *
 * Name
 *
 * -------------------------------- */

function getElementName(value: string) {
  const result = [value.replace(/([a-z])([A-Z])/g, '$1-$2'), 'root'];

  return result.join('-').toLocaleLowerCase();
}

/* -----------------------------------
 *
 * Roots
 *
 * -------------------------------- */

function getElementRoots(name: string) {
  const elementName = getElementName(name);
  const elements = document?.querySelectorAll(elementName);

  if (!elements) {
    throw new Error(`Missing hydration element ${elementName}`);
  }

  const result = [];

  for (let root of Array.from(elements)) {
    const data = root?.querySelector('[type="application/json"]');
    const props = JSON.parse(data?.innerHTML || '');

    root.innerHTML = '';

    result.push({ root, props });
  }

  return result;
}

/* -----------------------------------
 *
 * Hydrate
 *
 * -------------------------------- */

const hydrate = (component: ComponentFactory<any>) => (props: any) => {
  const isPrerender = typeof window === 'undefined';
  const elementName = getElementName(component.name);

  if (!isPrerender) {
    return h(component, props);
  }

  return h(elementName, {}, [
    h('script', {
      type: 'application/json',
      dangerouslySetInnerHTML: { __html: JSON.stringify(props) },
    }),
    h(component, props),
  ]);
};

/* -----------------------------------
 *
 * Mount
 *
 * -------------------------------- */

function mount(components: { [index: string]: ComponentFactory }) {
  const elementNames = Object.keys(components);

  elementNames.forEach((name) => {
    const component = components[name];
    const roots = getElementRoots(name);

    roots.forEach(({ root, props }) => render(h(component, props), root));
  });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { hydrate, mount };
