import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator/error-indicator';
import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { PeoplePage, PlanetPage, StarshipPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-contest';
export default class App extends React.Component {
  state = {
    hasError: false,
    selectedItem: 3,
    swapiService: new SwapiService()
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

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <div>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet updateInterval={10000} />
            <Route path='/people' component={PeoplePage}/>
            <Route path='/planets' component={PlanetPage}/>
            <Route path='/starships' component={StarshipPage}/>
          </Router>
        </SwapiServiceProvider>
      </div>
    );
  }
};
