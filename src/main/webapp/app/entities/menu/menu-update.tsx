import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRestoran } from 'app/shared/model/restoran.model';
import { getEntities as getRestorans } from 'app/entities/restoran/restoran.reducer';
import { getEntity, updateEntity, createEntity, reset } from './menu.reducer';
import { IMenu } from 'app/shared/model/menu.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMenuUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MenuUpdate = (props: IMenuUpdateProps) => {
  const [restoranId, setRestoranId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { menuEntity, restorans, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/menu');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRestorans();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...menuEntity,
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
          <h2 id="onlineRestoranApp.menu.home.createOrEditLabel">
            <Translate contentKey="onlineRestoranApp.menu.home.createOrEditLabel">Create or edit a Menu</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : menuEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="menu-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="menu-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="menu-restoran">
                  <Translate contentKey="onlineRestoranApp.menu.restoran">Restoran</Translate>
                </Label>
                <AvInput id="menu-restoran" type="select" className="form-control" name="restoran.id">
                  <option value="" key="0" />
                  {restorans
                    ? restorans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/menu" replace color="info">
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
  restorans: storeState.restoran.entities,
  menuEntity: storeState.menu.entity,
  loading: storeState.menu.loading,
  updating: storeState.menu.updating,
  updateSuccess: storeState.menu.updateSuccess,
});

const mapDispatchToProps = {
  getRestorans,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MenuUpdate);
