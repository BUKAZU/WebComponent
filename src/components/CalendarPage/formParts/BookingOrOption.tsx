import React from 'react';
import { RadioButtonGroup, RadioButton } from './radioButtons';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { HouseType } from '../../../types';

interface Props {
  house: HouseType;
}

export default function BookingOrOption({ house }: Props): JSX.Element {
  return (
    <>
      {house.allow_option && (
        <div>
          <RadioButtonGroup id="is_option" className="booking_option">
            <Field
              component={RadioButton}
              name="is_option"
              id="true"
              disabled={!house.allow_option}
              label={<FormattedMessage id="option" />}
            />
            <Field
              component={RadioButton}
              name="is_option"
              id="false"
              label={<FormattedMessage id="booking" />}
            />
          </RadioButtonGroup>
        </div>
      )}
    </>
  );
}
