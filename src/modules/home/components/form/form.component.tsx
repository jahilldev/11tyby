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
    <form class={className} onSubmit={(event) => event.preventDefault()}>
      <h2 class={style.title}>{title}</h2>
      <label htmlFor="demo" class={style.label}>
        Type something:
      </label>
      <input
        id="demo"
        type="text"
        onKeyUp={onKeyUp}
        className={style.input}
        placeholder="..."
      />
      {value && (
        <p class={style.text}>
          <em>Value:</em> {value}
        </p>
      )}
    </form>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Form };
