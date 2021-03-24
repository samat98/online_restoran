import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem to="/order">
      <Translate contentKey="global.menu.entities.order" />
    </MenuItem>
    <MenuItem to="/order-details">
      <Translate contentKey="global.menu.entities.orderDetails" />
    </MenuItem>
    <MenuItem to="/food">
      <Translate contentKey="global.menu.entities.food" />
    </MenuItem>
    <MenuItem to="/category">
      <Translate contentKey="global.menu.entities.category" />
    </MenuItem>
    <MenuItem to="/delivery">
      <Translate contentKey="global.menu.entities.delivery" />
    </MenuItem>
    <MenuItem to="/restoran">
      <Translate contentKey="global.menu.entities.restoran" />
    </MenuItem>
    <MenuItem to="/menu">
      <Translate contentKey="global.menu.entities.menu" />
    </MenuItem>
    <MenuItem to="/manager">
      <Translate contentKey="global.menu.entities.manager" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
