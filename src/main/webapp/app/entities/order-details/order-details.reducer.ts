import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOrderDetails, defaultValue } from 'app/shared/model/order-details.model';

export const ACTION_TYPES = {
  FETCH_ORDERDETAILS_LIST: 'orderDetails/FETCH_ORDERDETAILS_LIST',
  FETCH_ORDERDETAILS: 'orderDetails/FETCH_ORDERDETAILS',
  CREATE_ORDERDETAILS: 'orderDetails/CREATE_ORDERDETAILS',
  UPDATE_ORDERDETAILS: 'orderDetails/UPDATE_ORDERDETAILS',
  DELETE_ORDERDETAILS: 'orderDetails/DELETE_ORDERDETAILS',
  RESET: 'orderDetails/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOrderDetails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type OrderDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: OrderDetailsState = initialState, action): OrderDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ORDERDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ORDERDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ORDERDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_ORDERDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_ORDERDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ORDERDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ORDERDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_ORDERDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_ORDERDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_ORDERDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDERDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDERDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ORDERDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_ORDERDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ORDERDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/order-details';

// Actions

export const getEntities: ICrudGetAllAction<IOrderDetails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ORDERDETAILS_LIST,
  payload: axios.get<IOrderDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IOrderDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ORDERDETAILS,
    payload: axios.get<IOrderDetails>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IOrderDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ORDERDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOrderDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ORDERDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOrderDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ORDERDETAILS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
