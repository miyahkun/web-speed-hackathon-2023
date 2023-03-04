import { useLazyQuery } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

import type { GetAddressQueryVariable } from '../../server/graphql/query_resolver';
import { GetAddressQuery, type GetAddressQueryResponse } from '../graphql/queries';

export const useAddress = () => {
  const handleError = useErrorHandler();
  const [loadAddress, addressResult] = useLazyQuery<GetAddressQueryResponse, GetAddressQueryVariable>(GetAddressQuery, {
    onError: handleError,
  });

  const address = addressResult.data?.address;

  return {
    address,
    loadAddress,
  };
};
