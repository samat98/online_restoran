import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './delivery.reducer';
import { IDelivery } from 'app/shared/model/delivery.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeliveryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeliveryDetail = (props: IDeliveryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { deliveryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="onlineRestoranApp.delivery.detail.title">Delivery</Translate> [<b>{deliveryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="departurtime">
              <Translate contentKey="onlineRestoranApp.delivery.departurtime">Departurtime</Translate>
            </span>
            <UncontrolledTooltip target="departurtime">
              <Translate contentKey="onlineRestoranApp.delivery.help.departurtime" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {deliveryEntity.departurtime ? (
              <TextFormat value={deliveryEntity.departurtime} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="arrivaltime">
              <Translate contentKey="onlineRestoranApp.delivery.arrivaltime">Arrivaltime</Translate>
            </span>
            <UncontrolledTooltip target="arrivaltime">
              <Translate contentKey="onlineRestoranApp.delivery.help.arrivaltime" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {deliveryEntity.arrivaltime ? (
              <TextFormat value={deliveryEntity.arrivaltime} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="onlineRestoranApp.delivery.status">Status</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/delivery" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/delivery/${deliveryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ delivery }: IRootState) => ({
  deliveryEntity: delivery.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetail);
