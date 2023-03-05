import classNames from 'classnames';
import type { FC } from 'react';


import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { DeviceType, GetDeviceType } from '../../../foundation/GetDeviceType';
import { Image } from '../../../foundation/Image';

import * as styles from './MediaItemPreiewer.styles';

type Props = {
  file?: MediaFileFragmentResponse;
};

export const MediaItemPreviewer: FC<Props> = ({ file }: Props) => {
  const type = getMediaType(file?.filename || '')
  const av1Src = file?.filename.replace(/\.mp4$/, '.av1.mp4')

  return (
    <div className={styles.container()}>
      {type === 'image' && <Image fill src={file?.filename} />}
      {type === 'video' && (
        <GetDeviceType>
          {({ deviceType }) => (
            <video
              autoPlay
              controls
              muted
              playsInline
              className={classNames(styles.video(), {
                [styles.video__desktop()]: deviceType === DeviceType.DESKTOP,
                [styles.video__mobile()]: deviceType === DeviceType.MOBILE,
              })}
              src={av1Src}
            >
              <source src={av1Src} type="video/mp4; codecs=av01.0.05M.08,opus" />
              <source src={file?.filename} type="video/mp4" />
            </video>
          )}
        </GetDeviceType>
      )}
    </div>
  );
};
