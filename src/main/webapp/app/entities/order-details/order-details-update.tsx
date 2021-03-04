import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFood } from 'app/shared/model/food.model';
import { getEntities as getFoods } from 'app/entities/food/food.reducer';
import { IOrder } from 'app/shared/model/order.model';
import { getEntities as getOrders } from 'app/entities/order/order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './order-details.reducer';
import { IOrderDetails } from 'app/shared/model/order-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrderDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderDetailsUpdate = (props: IOrderDetailsUpdateProps) => {
  const [foodId, setFoodId] = useState('0');
  const [orderId, setOrderId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { orderDetailsEntity, foods, orders, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/order-details');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getFoods();
    props.getOrders();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...orderDetailsEntity,
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
          <h2 id="onlineRestoranApp.orderDetails.home.createOrEditLabel">
            <Translate contentKey="onlineRestoranApp.orderDetails.home.createOrEditLabel">Create or edit a OrderDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : orderDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="order-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="order-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantityLabel" for="order-details-quantity">
                  <Translate contentKey="onlineRestoranApp.orderDetails.quantity">Quantity</Translate>
                </Label>
                <AvField id="order-details-quantity" type="string" className="form-control" name="quantity" />
                <UncontrolledTooltip target="quantityLabel">
                  <Translate contentKey="onlineRestoranApp.orderDetails.help.quantity" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="order-details-food">
                  <Translate contentKey="onlineRestoranApp.orderDetails.food">Food</Translate>
                </Label>
                <AvInput id="order-details-food" type="select" className="form-control" name="food.id">
                  <option value="" key="0" />
                  {foods
                    ? foods.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="order-details-order">
                  <Translate contentKey="onlineRestoranApp.orderDetails.order">Order</Translate>
                </Label>
                <AvInput id="order-details-order" type="select" className="form-control" name="order.id">
                  <option value="" key="0" />
                  {orders
                    ? orders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/order-details" replace color="info">
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
  foods: storeState.food.entities,
  orders: storeState.order.entities,
  orderDetailsEntity: storeState.orderDetails.entity,
  loading: storeState.orderDetails.loading,
  updating: storeState.orderDetails.updating,
  updateSuccess: storeState.orderDetails.updateSuccess,
});

const mapDispatchToProps = {
  getFoods,
  getOrders,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsUpdate);
