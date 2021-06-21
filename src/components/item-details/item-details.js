/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/index';
import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{field}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component {
  swapiService = new SwapiService();
  state = {
    item: null,
    image: null
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        })
      })
  }

  renderItems = ({ item: { name, gender, birth_year, eye_color }, image }) => {
    return (
      <React.Fragment>
        <img className="person-image" src={`${image}`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child, idx) => {
                return <li>{idx}</li>;
              })
            }
          </ul>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { item, image } = this.state;

    if (!item) {
      return <Spinner />
    }

    const itemRender = this.renderItems({ item, image });

    return (
      <div className="person-details card">
        {itemRender}
      </div>
    )
  }
}
