import { Form as Component } from './form.component';
import { hydrate } from '@/utility/hydrate.utility';

/* -----------------------------------
 *
 * Hydrate
 *
 * -------------------------------- */

const Form = hydrate(Component);

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Form };
