import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './food.reducer';
import { IFood } from 'app/shared/model/food.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoodDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FoodDetail = (props: IFoodDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { foodEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="onlineRestoranApp.food.detail.title">Food</Translate> [<b>{foodEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="onlineRestoranApp.food.name">Name</Translate>
            </span>
            <UncontrolledTooltip target="name">
              <Translate contentKey="onlineRestoranApp.food.help.name" />
            </UncontrolledTooltip>
          </dt>
          <dd>{foodEntity.name}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="onlineRestoranApp.food.price">Price</Translate>
            </span>
          </dt>
          <dd>{foodEntity.price}</dd>
          <dt>
            <span id="img">
              <Translate contentKey="onlineRestoranApp.food.img">Img</Translate>
            </span>
            <UncontrolledTooltip target="img">
              <Translate contentKey="onlineRestoranApp.food.help.img" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {foodEntity.img ? (
              <div>
                {foodEntity.imgContentType ? (
                  <a onClick={openFile(foodEntity.imgContentType, foodEntity.img)}>
                    <img src={`data:${foodEntity.imgContentType};base64,${foodEntity.img}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {foodEntity.imgContentType}, {byteSize(foodEntity.img)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="description">
              <Translate contentKey="onlineRestoranApp.food.description">Description</Translate>
            </span>
          </dt>
          <dd>{foodEntity.description}</dd>
          <dt>
            <Translate contentKey="onlineRestoranApp.food.category">Category</Translate>
          </dt>
          <dd>{foodEntity.category ? foodEntity.category.name : ''}</dd>
          <dt>
            <Translate contentKey="onlineRestoranApp.food.menu">Menu</Translate>
          </dt>
          <dd>{foodEntity.menu ? foodEntity.menu.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/food" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/food/${foodEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ food }: IRootState) => ({
  foodEntity: food.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetail);
