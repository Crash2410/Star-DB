import React from "react";

import ItemDetails, {
    Record
} from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";

const swapiService = new SwapiService();

const {
    getPerson,
    getPlanet,
    getStarship,
    getPlanetImage,
    getPersonImage,
    getStarshipImage,
} = swapiService;

const PersonDetails = ({ itemId }) => {
    return (
        <ItemDetails
            itemId={itemId}
            getData={getPerson}
            getImageUrl={getPersonImage}>

            <Record field="gender" label="Gender" />
            <Record field="eye_color" label="Eye Color" />
        </ItemDetails>
    );
};


const PlanetDetails = ({ itemId }) => {
    return (
        <ItemDetails
            itemId={itemId}
            getData={getPlanet}
            getImageUrl={getPlanetImage}>

            <Record field="name" label="Name" />
            <Record field="population" label="Population" />
        </ItemDetails>
    );
};


const StarshipDetails = ({ itemId }) => {
    return (
        <ItemDetails
            itemId={itemId}
            getData={getStarship}
            getImageUrl={getStarshipImage}>

            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="cost_in_credits" label="Cost In Credits" />
        </ItemDetails>
    );
};

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
};