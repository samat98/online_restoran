import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './order-details.reducer';
import { IOrderDetails } from 'app/shared/model/order-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderDetailsDetail = (props: IOrderDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { orderDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="onlineRestoranApp.orderDetails.detail.title">OrderDetails</Translate> [<b>{orderDetailsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantity">
              <Translate contentKey="onlineRestoranApp.orderDetails.quantity">Quantity</Translate>
            </span>
            <UncontrolledTooltip target="quantity">
              <Translate contentKey="onlineRestoranApp.orderDetails.help.quantity" />
            </UncontrolledTooltip>
          </dt>
          <dd>{orderDetailsEntity.quantity}</dd>
          <dt>
            <Translate contentKey="onlineRestoranApp.orderDetails.food">Food</Translate>
          </dt>
          <dd>{orderDetailsEntity.food ? orderDetailsEntity.food.id : ''}</dd>
          <dt>
            <Translate contentKey="onlineRestoranApp.orderDetails.order">Order</Translate>
          </dt>
          <dd>{orderDetailsEntity.order ? orderDetailsEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order-details" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order-details/${orderDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ orderDetails }: IRootState) => ({
  orderDetailsEntity: orderDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsDetail);
