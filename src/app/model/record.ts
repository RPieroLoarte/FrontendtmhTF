import { Category } from './category';
import { Product } from './product';

export class Record {
  idRecord: number = 0;
  payment: string = '';
  paymentDate: Date = new Date(Date.now());
  arriveDate: Date = new Date(Date.now());
  points: number = 0;
  product: Product = new Product();
  category: Category = new Category();
}
