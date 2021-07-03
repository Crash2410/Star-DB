import React from 'react';
import Row from '../rows';
import { withRouter } from 'react-router';

import {
    PersonDetails,
    PersonList
} from '../sw-components'

const PeoplePage = ({ history, match }) => {
    const { id } = match.params;
    return (
        <Row
            left={<PersonList onItemSelected={(id) => {
                history.push(id);
            }} />}
            right={<PersonDetails itemId={id} />}
        />
    );
};

export default withRouter(PeoplePage);