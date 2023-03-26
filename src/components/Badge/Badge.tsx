import classNames from 'classnames';
import { ReactElement } from 'react';
import styles from './Badge.module.scss';

type ChipColor = 'primary' | 'secondary' | 'default';

interface ChipProps {
  label: string;
  color: ChipColor;
}

export const Badge = ({ label, color }: ChipProps): ReactElement => {
  return (
    <div className={classNames(styles.badge, styles[`badge--${color}`])}>
      {label}
    </div>
  );
};
