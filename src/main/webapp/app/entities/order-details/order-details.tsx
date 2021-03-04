import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './order-details.reducer';
import { IOrderDetails } from 'app/shared/model/order-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const OrderDetails = (props: IOrderDetailsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { orderDetailsList, match, loading } = props;
  return (
    <div>
      <h2 id="order-details-heading">
        <Translate contentKey="onlineRestoranApp.orderDetails.home.title">Order Details</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="onlineRestoranApp.orderDetails.home.createLabel">Create new Order Details</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {orderDetailsList && orderDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="onlineRestoranApp.orderDetails.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="onlineRestoranApp.orderDetails.food">Food</Translate>
                </th>
                <th>
                  <Translate contentKey="onlineRestoranApp.orderDetails.order">Order</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orderDetailsList.map((orderDetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${orderDetails.id}`} color="link" size="sm">
                      {orderDetails.id}
                    </Button>
                  </td>
                  <td>{orderDetails.quantity}</td>
                  <td>{orderDetails.food ? <Link to={`food/${orderDetails.food.id}`}>{orderDetails.food.id}</Link> : ''}</td>
                  <td>{orderDetails.order ? <Link to={`order/${orderDetails.order.id}`}>{orderDetails.order.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${orderDetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orderDetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orderDetails.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="onlineRestoranApp.orderDetails.home.notFound">No Order Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderDetails }: IRootState) => ({
  orderDetailsList: orderDetails.entities,
  loading: orderDetails.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
