import { h, hydrate as preactHydrate, ComponentFactory } from 'preact';

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

function getElementRoots(elementName: string) {
  const elements = document?.querySelectorAll(elementName);

  if (!elements.length) {
    throw new Error(`Missing hydration element "<${elementName}>"`);
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
 * Hydration
 *
 * -------------------------------- */

function applyHydration(component: ComponentFactory<any>) {
  const isPrerender = typeof window === 'undefined';
  const elementName = getElementName(component.name);

  if (!isPrerender) {
    return hydrate(elementName, component);
  }

  return (props: any) =>
    h(elementName, {}, [
      h('script', {
        type: 'application/json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(props) },
      }),
      h(component, props),
    ]);
}

/* -----------------------------------
 *
 * Mount
 *
 * -------------------------------- */

function hydrate(elementName: string, component: ComponentFactory<any>) {
  const roots = getElementRoots(elementName);

  roots.forEach(({ root, props }) => preactHydrate(h(component, props), root));

  return component;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { applyHydration, hydrate };
