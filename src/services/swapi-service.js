export default class SwapiService {

    _apiBase = 'https://swapi.py4e.com/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return await res.json();
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    getAllPeople = async () => {
        const persons = await this.getResource(`/people/`);
        return persons.results.map(this._transformPerson);
    }

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    getPersonImage = ({id}) => {
        return `${this._imageBase}/characters/${id}.jpg`;
    }

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birth_year: person.birth_year,
            eye_color: person.eye_color
        }
    }

    getAllPlanets = async () => {
        const planet = await this.getResource(`/planets/`);
        return planet.results.map(this._transformPlanet);
    }

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    }

    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`;
    }

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    getAllStarships = async () => {
        const starship = await this.getResource(`/starships/`);
        return starship.results.map(this._transformStarship);
    }

    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    }

    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`;
    }


    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            cost_in_credits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    
}