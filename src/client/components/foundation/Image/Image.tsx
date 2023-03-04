import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import * as styles from './Image.styles';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
};

export const Image: FC<Props> = ({ fill, ...rest }) => {
  const { src = '' } = rest;
  const avifSrc = src.replace(/\.jpg$/, '.avif');

  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <img
        className={classNames(styles.container(), {
          [styles.container__fill()]: fill === true,
        })}
        loading="lazy"
        {...rest}
      />
    </picture>
  );
};
