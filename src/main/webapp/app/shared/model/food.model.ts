import { ICategory } from 'app/shared/model/category.model';

export interface IFood {
  id?: number;
  name?: string;
  price?: number;
  imgContentType?: string;
  img?: any;
  description?: string;
  category?: ICategory;
}

export const defaultValue: Readonly<IFood> = {};
