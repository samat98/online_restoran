import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IDelivery } from 'app/shared/model/delivery.model';

export interface IOrder {
  id?: number;
  datetime?: string;
  user?: IUser;
  delivery?: IDelivery;
}

export const defaultValue: Readonly<IOrder> = {};
