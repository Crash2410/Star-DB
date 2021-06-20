import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/index';
import './person-details.css';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    person: null,
  }

  componentDidMount() {
    this.updatePersone();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePersone();
    }
  }

  updatePersone() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }
    this.swapiService
      .getPerson(personId || 1)
      .then((person) => {
        this.setState({
          person
        })
      })
  }

  renderItems = ({ id, name, gender, birthYear, yeyColor }) => {
    return (
      <React.Fragment>
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{yeyColor}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { person } = this.state;

    if (!person) {
      return <Spinner />
    }

    const personRender = this.renderItems(person);

    return (
      <div className="person-details card">
        {personRender}
      </div>
    )
  }
}
