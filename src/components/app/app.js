import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator/error-indicator';
import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { PeoplePage, PlanetPage, StarshipPage, LoginPage, SecretPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-contest';
import { StarshipDetails } from '../sw-components';
export default class App extends React.Component {
  state = {
    hasError: false,
    selectedItem: 3,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
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

    const { isLoggedIn } = this.state;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (

      <SwapiServiceProvider value={this.state.swapiService}>
        <Router>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet updateInterval={10000} />
            <Switch>
              <Route path='/'
                render={() => {
                  return (<h2>Hello</h2>)
                }}
                exact={true} />
              <Route path='/people/:id?' component={PeoplePage} />
              <Route path='/planets' component={PlanetPage} />
              <Route path='/starships'
                component={StarshipPage}
                exact
              />
              <Route path='/starships/:id'
                render={({ match, location, history }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={id} />
                }} />
              <Route path='/login'
                render={
                  () => {
                    return <LoginPage
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin} />
                  }
                }
              />
              <Route path='/secret'
                render={
                  () => {
                    return <SecretPage isLoggedIn={isLoggedIn} />
                  }
                } />
              <Route render={() => { <h2>Page not found</h2> }} />
            </Switch>
          </div>
        </Router>
      </SwapiServiceProvider>
    );
  }
};
