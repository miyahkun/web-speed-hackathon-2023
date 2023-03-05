import type { Context } from '@apollo/client';
import type { GraphQLFieldResolver } from 'graphql';

import type { Address } from '../../model/address';
import { FeatureSection } from '../../model/feature_section';
import { Product } from '../../model/product';
import { Recommendation } from '../../model/recommendation';
import { User } from '../../model/user';
import { dataSource } from '../data_source';

import { getCity, getPrefecture } from './../zipcode';

type QueryResolver = {
  features: GraphQLFieldResolver<unknown, Context, never, Promise<FeatureSection[]>>;
  me: GraphQLFieldResolver<unknown, Context, never, Promise<User | null>>;
  product: GraphQLFieldResolver<unknown, Context, { id: number }, Promise<Product>>;
  recommendations: GraphQLFieldResolver<unknown, Context, never, Promise<Recommendation[]>>;
  user: GraphQLFieldResolver<unknown, Context, { id: number }, Promise<User>>;
  address: GraphQLFieldResolver<unknown, Context, { zipCode: string }, Address>;
};

export type GetAddressQueryVariable = {
  zipCode: string;
};

export const queryResolver: QueryResolver = {
  address: (_parent, args: GetAddressQueryVariable) => {
    const { zipCode = '' } = args;
    return {
      city: getCity(zipCode),
      prefecture: getPrefecture(zipCode),
      zipCode: args.zipCode,
    };
  },
  features: async () => {
    return await dataSource.manager.find(FeatureSection);
  },
  me: async (_parent, _args, { session }) => {
    if (session['userId'] == null) {
      return null;
    }
    return await dataSource.manager.findOneOrFail(User, {
      where: { id: session['userId'] },
    });
  },
  product: async (_parent, args) => {
    return await dataSource.manager.findOneOrFail(Product, {
      where: { id: args.id },
    });
  },
  recommendations: async () => {
    return await dataSource.manager.find(Recommendation);
  },
  user: async (_parent, args) => {
    return await dataSource.manager.findOneOrFail(User, {
      where: { id: args.id },
    });
  },
};
