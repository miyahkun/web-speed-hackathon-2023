import { Order } from '../../model/order';
import { Profile } from '../../model/profile';
import { Review } from '../../model/review';
import type { User } from '../../model/user';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const userResolver: GraphQLModelResolver<User> = {
  orders: async (parent) => {
    return await dataSource.manager.find(Order, {
      where: {
        user: parent,
      },
    });
  },
  profile: async (parent) => {
    return await dataSource.manager.findOneOrFail(Profile, {
      where: {
        user: parent,
      },
    });
  },
  reviews: async (parent) => {
    return await dataSource.manager.find(Review, {
      where: {
        user: parent,
      },
    });
  },
};
