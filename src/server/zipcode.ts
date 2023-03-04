import zipcodeJa from 'zipcode-ja';

type Arg = {
  zipCode: string;
};

const getAddress = (zipCode: Arg['zipCode']) => {
  return zipcodeJa[zipCode]?.address ?? [];
};

export const getPrefecture = (zipCode: Arg['zipCode']): string => {
  return getAddress(zipCode).slice(0, 1).join('');
};

export const getCity = (zipCode: Arg['zipCode']): string => {
  return getAddress(zipCode).slice(1).join(' ');
};
