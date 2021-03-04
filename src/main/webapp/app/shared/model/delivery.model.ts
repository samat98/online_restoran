import { Moment } from 'moment';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IDelivery {
  id?: number;
  departurtime?: string;
  arrivaltime?: string;
  status?: Status;
}

export const defaultValue: Readonly<IDelivery> = {};
