import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IMenu } from 'app/shared/model/menu.model';
import { getEntities as getMenus } from 'app/entities/menu/menu.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './food.reducer';
import { IFood } from 'app/shared/model/food.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFoodUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FoodUpdate = (props: IFoodUpdateProps) => {
  const [categoryId, setCategoryId] = useState('0');
  const [menuId, setMenuId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { foodEntity, categories, menus, loading, updating } = props;

  const { img, imgContentType } = foodEntity;

  const handleClose = () => {
    props.history.push('/food' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCategories();
    props.getMenus();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...foodEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="onlineRestoranApp.food.home.createOrEditLabel">
            <Translate contentKey="onlineRestoranApp.food.home.createOrEditLabel">Create or edit a Food</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : foodEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="food-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="food-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="food-name">
                  <Translate contentKey="onlineRestoranApp.food.name">Name</Translate>
                </Label>
                <AvField
                  id="food-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="nameLabel">
                  <Translate contentKey="onlineRestoranApp.food.help.name" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="food-price">
                  <Translate contentKey="onlineRestoranApp.food.price">Price</Translate>
                </Label>
                <AvField
                  id="food-price"
                  type="string"
                  className="form-control"
                  name="price"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="imgLabel" for="img">
                    <Translate contentKey="onlineRestoranApp.food.img">Img</Translate>
                  </Label>
                  <br />
                  {img ? (
                    <div>
                      {imgContentType ? (
                        <a onClick={openFile(imgContentType, img)}>
                          <img src={`data:${imgContentType};base64,${img}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {imgContentType}, {byteSize(img)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('img')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_img" type="file" onChange={onBlobChange(true, 'img')} accept="image/*" />
                  <AvInput type="hidden" name="img" value={img} />
                </AvGroup>

                <UncontrolledTooltip target="imgLabel">
                  <Translate contentKey="onlineRestoranApp.food.help.img" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="food-description">
                  <Translate contentKey="onlineRestoranApp.food.description">Description</Translate>
                </Label>
                <AvField
                  id="food-description"
                  type="text"
                  name="description"
                  validate={{
                    maxLength: { value: 250, errorMessage: translate('entity.validation.maxlength', { max: 250 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="food-category">
                  <Translate contentKey="onlineRestoranApp.food.category">Category</Translate>
                </Label>
                <AvInput id="food-category" type="select" className="form-control" name="category.id">
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="food-menu">
                  <Translate contentKey="onlineRestoranApp.food.menu">Menu</Translate>
                </Label>
                <AvInput id="food-menu" type="select" className="form-control" name="menu.id">
                  <option value="" key="0" />
                  {menus
                    ? menus.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/food" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.category.entities,
  menus: storeState.menu.entities,
  foodEntity: storeState.food.entity,
  loading: storeState.food.loading,
  updating: storeState.food.updating,
  updateSuccess: storeState.food.updateSuccess,
});

const mapDispatchToProps = {
  getCategories,
  getMenus,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FoodUpdate);
