import React from "react";
import { FormattedMessage } from "react-intl";

interface Props {
  house: {
    house_type: string
  };
}

function Legend({ house } : Props): JSX.Element {
    return (
    
     <div className="legend">
            <div>
              <span className="legend-field arrival" />
              <FormattedMessage id={`${house.house_type}.arrival_date`} />
            </div>
            <div>
              <span className="legend-field booked" />
              <FormattedMessage id="booked" />
            </div>
            <div>
              <span className="legend-field departure" />
              <FormattedMessage id={`${house.house_type}.departure_date`} />
            </div>
            <div>
              <span className="legend-field last_minute_discount" />
              <FormattedMessage id="discount" />
            </div>
          </div>
    
)}

export default Legend