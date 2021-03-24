import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRestoran, defaultValue } from 'app/shared/model/restoran.model';

export const ACTION_TYPES = {
  FETCH_RESTORAN_LIST: 'restoran/FETCH_RESTORAN_LIST',
  FETCH_RESTORAN: 'restoran/FETCH_RESTORAN',
  CREATE_RESTORAN: 'restoran/CREATE_RESTORAN',
  UPDATE_RESTORAN: 'restoran/UPDATE_RESTORAN',
  DELETE_RESTORAN: 'restoran/DELETE_RESTORAN',
  RESET: 'restoran/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRestoran>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type RestoranState = Readonly<typeof initialState>;

// Reducer

export default (state: RestoranState = initialState, action): RestoranState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESTORAN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESTORAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RESTORAN):
    case REQUEST(ACTION_TYPES.UPDATE_RESTORAN):
    case REQUEST(ACTION_TYPES.DELETE_RESTORAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESTORAN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESTORAN):
    case FAILURE(ACTION_TYPES.CREATE_RESTORAN):
    case FAILURE(ACTION_TYPES.UPDATE_RESTORAN):
    case FAILURE(ACTION_TYPES.DELETE_RESTORAN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESTORAN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESTORAN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESTORAN):
    case SUCCESS(ACTION_TYPES.UPDATE_RESTORAN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESTORAN):
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

const apiUrl = 'api/restorans';

// Actions

export const getEntities: ICrudGetAllAction<IRestoran> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESTORAN_LIST,
  payload: axios.get<IRestoran>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IRestoran> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESTORAN,
    payload: axios.get<IRestoran>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IRestoran> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESTORAN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRestoran> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESTORAN,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRestoran> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESTORAN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
