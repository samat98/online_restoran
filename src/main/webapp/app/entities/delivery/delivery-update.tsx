import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './delivery.reducer';
import { IDelivery } from 'app/shared/model/delivery.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDeliveryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeliveryUpdate = (props: IDeliveryUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { deliveryEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/delivery' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...deliveryEntity,
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
          <h2 id="onlineRestoranApp.delivery.home.createOrEditLabel">
            <Translate contentKey="onlineRestoranApp.delivery.home.createOrEditLabel">Create or edit a Delivery</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : deliveryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="delivery-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="delivery-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="departurtimeLabel" for="delivery-departurtime">
                  <Translate contentKey="onlineRestoranApp.delivery.departurtime">Departurtime</Translate>
                </Label>
                <AvField id="delivery-departurtime" type="date" className="form-control" name="departurtime" />
                <UncontrolledTooltip target="departurtimeLabel">
                  <Translate contentKey="onlineRestoranApp.delivery.help.departurtime" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="arrivaltimeLabel" for="delivery-arrivaltime">
                  <Translate contentKey="onlineRestoranApp.delivery.arrivaltime">Arrivaltime</Translate>
                </Label>
                <AvField id="delivery-arrivaltime" type="date" className="form-control" name="arrivaltime" />
                <UncontrolledTooltip target="arrivaltimeLabel">
                  <Translate contentKey="onlineRestoranApp.delivery.help.arrivaltime" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="delivery-status">
                  <Translate contentKey="onlineRestoranApp.delivery.status">Status</Translate>
                </Label>
                <AvInput
                  id="delivery-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && deliveryEntity.status) || 'Preparing'}
                >
                  <option value="Preparing">{translate('onlineRestoranApp.Status.Preparing')}</option>
                  <option value="Onroad">{translate('onlineRestoranApp.Status.Onroad')}</option>
                  <option value="Delivered">{translate('onlineRestoranApp.Status.Delivered')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/delivery" replace color="info">
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
  deliveryEntity: storeState.delivery.entity,
  loading: storeState.delivery.loading,
  updating: storeState.delivery.updating,
  updateSuccess: storeState.delivery.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryUpdate);
