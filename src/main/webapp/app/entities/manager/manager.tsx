import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './manager.reducer';
import { IManager } from 'app/shared/model/manager.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IManagerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Manager = (props: IManagerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { managerList, match, loading } = props;
  return (
    <div>
      <h2 id="manager-heading">
        <Translate contentKey="onlineRestoranApp.manager.home.title">Managers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="onlineRestoranApp.manager.home.createLabel">Create new Manager</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {managerList && managerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="onlineRestoranApp.manager.numberTel">Number Tel</Translate>
                </th>
                <th>
                  <Translate contentKey="onlineRestoranApp.manager.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="onlineRestoranApp.manager.restoran">Restoran</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {managerList.map((manager, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${manager.id}`} color="link" size="sm">
                      {manager.id}
                    </Button>
                  </td>
                  <td>{manager.numberTel}</td>
                  <td>{manager.user ? manager.user.login : ''}</td>
                  <td>{manager.restoran ? <Link to={`restoran/${manager.restoran.id}`}>{manager.restoran.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${manager.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${manager.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${manager.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="onlineRestoranApp.manager.home.notFound">No Managers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ manager }: IRootState) => ({
  managerList: manager.entities,
  loading: manager.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
