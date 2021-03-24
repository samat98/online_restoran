import { IRestoran } from 'app/shared/model/restoran.model';
import { IFood } from 'app/shared/model/food.model';

export interface IMenu {
  id?: number;
  restoran?: IRestoran;
  foods?: IFood[];
}

export const defaultValue: Readonly<IMenu> = {};
