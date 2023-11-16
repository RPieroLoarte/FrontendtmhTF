import { Category } from './category';
import { Order } from './order';

export class Product {
  idProduct: number = 0;
  nameProduct: string = '';
  descriptionProduct: string = '';
  priceProduct: number = 0;
  dimensionsProduct: string = '';
  order: Order = new Order();
  category: Category = new Category();
}
