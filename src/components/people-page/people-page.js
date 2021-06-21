import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import ErrorBoundry from '../errorBoundry/index';
import Row from '../rows/index';

import './people-page.css';
import SwapiService from '../../services/swapi-service';
export default class PeopleDetails extends Component {

  swapiService = new SwapiService();

  state = {
    selectedItem: 3,
  };

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const itemList = (
      <ItemList onItemSelected={this.onItemSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birth_year }) => `${name} (${gender}, ${birth_year})`} />
    );

    const itemDetails = (
      <ItemDetails itemId={this.state.selectedItem} />
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={itemDetails} />
      </ErrorBoundry>
    );
  }
}
