import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './form.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  title: string;
  className?: string;
}

/* -----------------------------------
 *
 * Form
 *
 * -------------------------------- */

function Form({ title, className = '' }: IProps) {
  const [value, setValue] = useState('');

  const onKeyUp = (event: Event) => {
    const { value } = event.target as HTMLInputElement;

    setValue(value);
  };

  return (
    <form class={className}>
      <h2 class={style.title}>{title}</h2>
      <input
        type="email"
        onKeyUp={onKeyUp}
        className={style.input}
        placeholder="Type something.."
      />
      <p class={style.text}>{value}</p>
    </form>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Form };
