import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import type { MediaType } from '../../../utils/get_media_type'

import * as styles from './Image.styles';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
  mediaType?: MediaType;
};

const OPTIMIZED_IMAGE_PATH = '/optimized/images'
const VIDEO_THUMBNAIL_PATH = '/optimized/video_thumbnails'

export const Image: FC<Props> = ({ fill, mediaType = 'image', src = '', ...rest }) => {
  let imgSrc = src

  const avifSrc = src.replace(/^\/images/, OPTIMIZED_IMAGE_PATH).replace(/\.jpg$/, '.avif');
  const isAvif = avifSrc.endsWith('.avif')

  if (mediaType === 'video') {
    imgSrc = src.replace(/^\/videos/, VIDEO_THUMBNAIL_PATH).replace(/\.(mp4|av1)+/, '.png')
  }

  return (
    <picture>
      {isAvif && <source srcSet={avifSrc} type="image/avif"/>}
      <img
        className={classNames(styles.container(), {
          [styles.container__fill()]: fill === true,
        })}
        decoding="async"
        loading="lazy"
        src={imgSrc}
        {...rest}
      />
    </picture>
  );
};
