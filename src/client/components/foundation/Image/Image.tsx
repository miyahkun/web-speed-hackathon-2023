import classNames from 'classnames';
import { type ComponentProps, type FC, useEffect, useRef, useState } from 'react';

import type { MediaType } from '../../../utils/get_media_type'

import * as styles from './Image.styles';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
  mediaType?: MediaType;
};

const OPTIMIZED_IMAGE_PATH = '/optimized/images'
const VIDEO_THUMBNAIL_PATH = '/optimized/video_thumbnails'

export const Image: FC<Props> = ({ fill, mediaType = 'image', src = '', ...rest }) => {
  const img = useRef<HTMLImageElement>(null!);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (img.current) {
      setLoaded(img.current.complete);
    }
  }, [img.current]);

  function imageLoaded() {
    if (img.current) {
      setLoaded(img.current.complete);
    }
  }

  let imgSrc = src

  const avifSrc = src.replace(/^\/images/, OPTIMIZED_IMAGE_PATH).replace(/\.jpg$/, '.avif');
  const isAvif = avifSrc.endsWith('.avif')

  if (mediaType === 'video') {
    imgSrc = src.replace(/^\/videos/, VIDEO_THUMBNAIL_PATH).replace(/\.(mp4|av1)+/, '.png')
  }

  return (
    <div className={loaded ? classNames({[styles.container__fill()]: fill === true}, styles.container(), styles.loaded()) : styles.placeholder()}>
      <picture>
        {isAvif && <source srcSet={avifSrc} type="image/avif"/>}
        <img
          ref={img}
          className={classNames(styles.container(), {
            [styles.container__fill()]: fill === true,
          })}
          decoding="async"
          loading="lazy"
          onLoad={imageLoaded}
          src={imgSrc}
          {...rest}
        />
      </picture>
    </div>
  );
};
