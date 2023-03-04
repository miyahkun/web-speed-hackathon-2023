import { css } from '@emotion/css';

export const container = ({
  ratioHeight,
  ratioWidth,
}: {
  ratioWidth: number | undefined;
  ratioHeight: number | undefined;
}) => css`
  aspect-ratio: ${ratioWidth} / ${ratioHeight};
  position: relative;
  width: 100%;
`;
