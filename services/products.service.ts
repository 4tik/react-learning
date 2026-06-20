import { api } from './config/api';

export const ProductService = {
  getProducts: () =>
    api.get(`/products`),
};