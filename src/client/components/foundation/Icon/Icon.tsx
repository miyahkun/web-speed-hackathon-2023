import classNames from 'classnames';
import type { FC } from 'react';
import type Icons from 'react-icons/fa';
import { FaArrowLeft,FaArrowRight, FaCheckCircle, FaPlay, FaShoppingCart, FaUser } from 'react-icons/fa';

import * as styles from './Icon.styles';

type IconName = keyof typeof Icons

type Props = {
  type: IconName;
  width: number;
  height: number;
  color: string;
};

const icons = {
  FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlay, FaShoppingCart, FaUser
}

export const Icon: FC<Props> = ({ color, height, type, width }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Icon = icons[type];
  return (
    <span className={classNames(type, styles.container({ color, height, width }))}>
      <Icon />
    </span>
  );
};
