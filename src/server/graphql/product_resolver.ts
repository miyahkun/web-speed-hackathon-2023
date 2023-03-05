import { LimitedTimeOffer } from '../../model/limited_time_offer';
import type { Product } from '../../model/product';
import { ProductMedia } from '../../model/product_media';
import { Review } from '../../model/review';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const productResolver: GraphQLModelResolver<Product> = {
  media: async (parent) => {
    return await dataSource.manager.find(ProductMedia, {
      where: {
        product: parent,
      },
    });
  },
  offers: async (parent) => {
    return await dataSource.manager.find(LimitedTimeOffer, {
      where: {
        product: parent,
      },
    });
  },
  reviews: async (parent) => {
    return await dataSource.manager.find(Review, {
      where: {
        product: parent,
      },
    });
  },
};
