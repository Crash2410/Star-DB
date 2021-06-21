import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator/error-indicator';
import ItemDetails, { Record } from '../item-details/item-details';
import './app.css';
import SwapiService from '../../services/swapi-service';
import Row from '../rows/index';

export default class App extends React.Component {

  swapiService = new SwapiService();

  state = {
    hasError: false,
    selectedItem: 3
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {

    const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

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
        itemId={11}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
      </ItemDetails>

    );

    return (
      <div>
        <Header />
        <RandomPlanet />

        <Row left={personDetails} right={starshipDetails} />

      </div>
    );
  }
};
