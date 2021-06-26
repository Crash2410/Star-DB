import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator/error-indicator';
import ItemDetails, { Record } from '../item-details/item-details';
import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import Row from '../rows/index';

import { SwapiServiceProvider } from '../swapi-service-contest';

import {
  PersonDetails,
  PersonList,
  StarshipList
} from '../sw-components'

export default class App extends React.Component {
  state = {
    hasError: false,
    selectedItem: 3,
    swapiService: new DummySwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      }
    })
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.state.swapiService;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const personDetails = (
      <ItemDetails
        itemId={12}
        getData={getPerson}
        getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eye_color" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>

        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="cost_in_credits" label="Cost In Credits" />
      </ItemDetails>

    );

    return (
      <div>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Header onServiceChange={this.onServiceChange} />

          <RandomPlanet />

          <Row left={personDetails} right={starshipDetails} />

          <PersonDetails itemId={11} />

          <StarshipList />
          <br />
          <PersonList />
        </SwapiServiceProvider>
      </div>
    );
  }
};
