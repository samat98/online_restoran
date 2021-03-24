import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './restoran.reducer';
import { IRestoran } from 'app/shared/model/restoran.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRestoranDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RestoranDetail = (props: IRestoranDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { restoranEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="onlineRestoranApp.restoran.detail.title">Restoran</Translate> [<b>{restoranEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="address">
              <Translate contentKey="onlineRestoranApp.restoran.address">Address</Translate>
            </span>
            <UncontrolledTooltip target="address">
              <Translate contentKey="onlineRestoranApp.restoran.help.address" />
            </UncontrolledTooltip>
          </dt>
          <dd>{restoranEntity.address}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="onlineRestoranApp.restoran.name">Name</Translate>
            </span>
            <UncontrolledTooltip target="name">
              <Translate contentKey="onlineRestoranApp.restoran.help.name" />
            </UncontrolledTooltip>
          </dt>
          <dd>{restoranEntity.name}</dd>
        </dl>
        <Button tag={Link} to="/restoran" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/restoran/${restoranEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ restoran }: IRootState) => ({
  restoranEntity: restoran.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RestoranDetail);
