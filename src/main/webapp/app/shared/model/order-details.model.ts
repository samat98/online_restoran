import { IFood } from 'app/shared/model/food.model';
import { IOrder } from 'app/shared/model/order.model';

export interface IOrderDetails {
  id?: number;
  quantity?: number;
  food?: IFood;
  order?: IOrder;
}

export const defaultValue: Readonly<IOrderDetails> = {};
