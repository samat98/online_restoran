import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './menu.reducer';
import { IMenu } from 'app/shared/model/menu.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMenuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MenuDetail = (props: IMenuDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { menuEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="onlineRestoranApp.menu.detail.title">Menu</Translate> [<b>{menuEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="onlineRestoranApp.menu.restoran">Restoran</Translate>
          </dt>
          <dd>{menuEntity.restoran ? menuEntity.restoran.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/menu" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/menu/${menuEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ menu }: IRootState) => ({
  menuEntity: menu.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetail);
