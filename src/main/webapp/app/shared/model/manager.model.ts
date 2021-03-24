import { IUser } from 'app/shared/model/user.model';
import { IRestoran } from 'app/shared/model/restoran.model';

export interface IManager {
  id?: number;
  numberTel?: string;
  user?: IUser;
  restoran?: IRestoran;
}

export const defaultValue: Readonly<IManager> = {};
