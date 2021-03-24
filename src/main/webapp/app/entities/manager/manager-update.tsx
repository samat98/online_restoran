import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IRestoran } from 'app/shared/model/restoran.model';
import { getEntities as getRestorans } from 'app/entities/restoran/restoran.reducer';
import { getEntity, updateEntity, createEntity, reset } from './manager.reducer';
import { IManager } from 'app/shared/model/manager.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IManagerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ManagerUpdate = (props: IManagerUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [restoranId, setRestoranId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { managerEntity, users, restorans, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/manager');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
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
        ...managerEntity,
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
          <h2 id="onlineRestoranApp.manager.home.createOrEditLabel">
            <Translate contentKey="onlineRestoranApp.manager.home.createOrEditLabel">Create or edit a Manager</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : managerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="manager-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="manager-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberTelLabel" for="manager-numberTel">
                  <Translate contentKey="onlineRestoranApp.manager.numberTel">Number Tel</Translate>
                </Label>
                <AvField
                  id="manager-numberTel"
                  type="text"
                  name="numberTel"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="numberTelLabel">
                  <Translate contentKey="onlineRestoranApp.manager.help.numberTel" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="manager-user">
                  <Translate contentKey="onlineRestoranApp.manager.user">User</Translate>
                </Label>
                <AvInput id="manager-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="manager-restoran">
                  <Translate contentKey="onlineRestoranApp.manager.restoran">Restoran</Translate>
                </Label>
                <AvInput id="manager-restoran" type="select" className="form-control" name="restoran.id">
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
              <Button tag={Link} id="cancel-save" to="/manager" replace color="info">
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
  users: storeState.userManagement.users,
  restorans: storeState.restoran.entities,
  managerEntity: storeState.manager.entity,
  loading: storeState.manager.loading,
  updating: storeState.manager.updating,
  updateSuccess: storeState.manager.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getRestorans,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManagerUpdate);
