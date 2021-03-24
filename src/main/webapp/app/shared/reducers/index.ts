import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import order, {
  OrderState
} from 'app/entities/order/order.reducer';
// prettier-ignore
import orderDetails, {
  OrderDetailsState
} from 'app/entities/order-details/order-details.reducer';
// prettier-ignore
import food, {
  FoodState
} from 'app/entities/food/food.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/category/category.reducer';
// prettier-ignore
import delivery, {
  DeliveryState
} from 'app/entities/delivery/delivery.reducer';
// prettier-ignore
import restoran, {
  RestoranState
} from 'app/entities/restoran/restoran.reducer';
// prettier-ignore
import menu, {
  MenuState
} from 'app/entities/menu/menu.reducer';
// prettier-ignore
import manager, {
  ManagerState
} from 'app/entities/manager/manager.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly order: OrderState;
  readonly orderDetails: OrderDetailsState;
  readonly food: FoodState;
  readonly category: CategoryState;
  readonly delivery: DeliveryState;
  readonly restoran: RestoranState;
  readonly menu: MenuState;
  readonly manager: ManagerState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  order,
  orderDetails,
  food,
  category,
  delivery,
  restoran,
  menu,
  manager,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
