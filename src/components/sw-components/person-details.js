import React from "react";
import ItemDetails, {
    Record
} from "../item-details/item-details";
import { withSwapiService } from "../hoc-helpers";

const PersonDetails = ({ itemId, swapiService }) => {
    const {getPersonImage, getPerson} = swapiService;
    return (
        <ItemDetails
            itemId={itemId}
            getData={getPerson}
            getImageUrl={getPersonImage}>

            <Record field="gender" label="Gender" />
            <Record field="eye_color" label="Eye Color" />
        </ItemDetails>
    )
};

export default withSwapiService(PersonDetails);