import caretLeftIcon from '@assets/svg/caret-left.svg';
import logoIcon from '@assets/svg/logo.svg';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = (): ReactElement => {
  const navigate = useNavigate();

  const onClickBack = (): void => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <button
        aria-label='Voltar'
        onClick={onClickBack}
        data-testid='back-button'
        className={styles.header__button}
      >
        <img
          src={caretLeftIcon}
          alt='Ícone de seta a esquerda'
          className={styles.icon}
        />
      </button>
      <img
        src={logoIcon}
        data-testid='logo'
        className={styles.header__logo}
        alt={`Logo com um vetor com o formato parecido com a letra N espelhada,
        de bordas arredondadas, na cor azul escuro e um círculo pequeno na cor laranja`}
      />
      <div data-testid='empty-div' className={styles.header__empty}></div>
    </header>
  );
};
