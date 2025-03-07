import { css } from '@emotion/css';

export const offerLabel = () => css`
  margin-bottom: 16px;
`;

export const container = () => css`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

export const productName = () => css`
  font-size: 1.5rem;
  font-weight: 700;
  min-height: 36px;
`;

export const productDescription = () => css`
  font-size: 0.875rem;
  margin-top: 8px;
  min-height: 210px;
`;

export const priceWrapper = () => css`
  align-items: flex-start;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  min-height: 36px;
`;

export const priceWithoutOffer = () => css`
  align-self: flex-end;
  margin-bottom: 4px;
  text-decoration: line-through;
`;

export const price = () => css`
  align-self: flex-end;
  font-size: 1.5rem;
  font-weight: 700;
`;
