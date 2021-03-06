import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './restoran.reducer';
import { IRestoran } from 'app/shared/model/restoran.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRestoranUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RestoranUpdate = (props: IRestoranUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { restoranEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/restoran');
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
        ...restoranEntity,
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
          <h2 id="onlineRestoranApp.restoran.home.createOrEditLabel">
            <Translate contentKey="onlineRestoranApp.restoran.home.createOrEditLabel">Create or edit a Restoran</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : restoranEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="restoran-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="restoran-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLabel" for="restoran-address">
                  <Translate contentKey="onlineRestoranApp.restoran.address">Address</Translate>
                </Label>
                <AvField id="restoran-address" type="text" name="address" />
                <UncontrolledTooltip target="addressLabel">
                  <Translate contentKey="onlineRestoranApp.restoran.help.address" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="restoran-name">
                  <Translate contentKey="onlineRestoranApp.restoran.name">Name</Translate>
                </Label>
                <AvField id="restoran-name" type="text" name="name" />
                <UncontrolledTooltip target="nameLabel">
                  <Translate contentKey="onlineRestoranApp.restoran.help.name" />
                </UncontrolledTooltip>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/restoran" replace color="info">
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
  restoranEntity: storeState.restoran.entity,
  loading: storeState.restoran.loading,
  updating: storeState.restoran.updating,
  updateSuccess: storeState.restoran.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RestoranUpdate);
