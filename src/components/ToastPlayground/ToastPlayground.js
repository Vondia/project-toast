import React from 'react';

import Button from '../Button';
import Toast from '../Toast';

import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
    const [toasts, setToasts] = React.useState([
        {
            id: crypto.randomUUID(),
            message: 'Oh no!',
            variant: 'error',
        },
        {
            id: crypto.randomUUID(),
            message: 'This is a notice.',
            variant: 'notice',
        },
        {
            id: crypto.randomUUID(),
            message: 'This is a warning.',
            variant: 'warning',
        },
        {
            id: crypto.randomUUID(),
            message: 'This is a success.',
            variant: 'success',
        }
    ]);
    const [message, setMessage] = React.useState('');
    const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

function handleCreateToast(event) {
    event.preventDefault();
    const nextToasts = [
        ...toasts,
        {
            id: crypto.randomUUID(),
            message,
            variant,
        },
    ];

    setToasts(nextToasts);

    setMessage('');

    setVariant(VARIANT_OPTIONS[0]);
    };

function handleDismiss(id) {
    const nextToasts = toasts.filter(toast => {
        return toast.id !== id;
    })

    setToasts(nextToasts)
}
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

  <ToastShelf
    toasts={toasts}
    handleDismiss={handleDismiss}
  />

      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Messagez
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" value={message} onChange={event => { setMessage(event.target.value)}} className={styles.messageInput} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
{ VARIANT_OPTIONS.map((option) => (
            <label htmlFor={`variant-${option}`} key={option}>
              <input
                id={`variant-${option}`}
                type="radio"
                name="variant"
                value={option}
                checked={variant === option}
                onChange={(event) => {
                    setVariant(event.target.value);
                }}
              />
              {option}
            </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
