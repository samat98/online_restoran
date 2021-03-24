import { ICategory } from 'app/shared/model/category.model';
import { IMenu } from 'app/shared/model/menu.model';

export interface IFood {
  id?: number;
  name?: string;
  price?: number;
  imgContentType?: string;
  img?: any;
  description?: string;
  category?: ICategory;
  menu?: IMenu;
}

export const defaultValue: Readonly<IFood> = {};
