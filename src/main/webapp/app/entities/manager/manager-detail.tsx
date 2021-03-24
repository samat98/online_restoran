import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './manager.reducer';
import { IManager } from 'app/shared/model/manager.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IManagerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ManagerDetail = (props: IManagerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { managerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="onlineRestoranApp.manager.detail.title">Manager</Translate> [<b>{managerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="numberTel">
              <Translate contentKey="onlineRestoranApp.manager.numberTel">Number Tel</Translate>
            </span>
            <UncontrolledTooltip target="numberTel">
              <Translate contentKey="onlineRestoranApp.manager.help.numberTel" />
            </UncontrolledTooltip>
          </dt>
          <dd>{managerEntity.numberTel}</dd>
          <dt>
            <Translate contentKey="onlineRestoranApp.manager.user">User</Translate>
          </dt>
          <dd>{managerEntity.user ? managerEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="onlineRestoranApp.manager.restoran">Restoran</Translate>
          </dt>
          <dd>{managerEntity.restoran ? managerEntity.restoran.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/manager" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/manager/${managerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ manager }: IRootState) => ({
  managerEntity: manager.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDetail);
