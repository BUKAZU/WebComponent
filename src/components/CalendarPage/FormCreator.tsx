import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Mutation } from '@apollo/client/react/components';
import { CREATE_BOOKING_MUTATION } from '../../_lib/queries';
import { Insurances } from './formParts/insurances';
import Discount from './formParts/discount';
import Summary from './Summary';
import Modal from '../Modal';
import DefaultBookingFields from './formParts/DefaultBookingFields';
import SuccessMessage from './formParts/SuccessMessage';
import OptionalBookingFields from './formParts/OptionalBookingFields';
import { ApiError } from '../Error';
import { initializeBookingFields } from './formParts/BookingHelpers';
import OptionalCosts from './formParts/OptionalCosts';
import Guests from './formParts/Guests';
import { validateForm } from './formParts/Validations';
import { AppContext } from '../AppContext';
import { HouseType, PortalSiteType } from '../../types';
import { BookingType } from './calender_types';

interface Props {
  house: HouseType;
  PortalSite: PortalSiteType;
  booking: BookingType;
}

function FormCreator({
  house,
  PortalSite,  
  booking
}: Props): JSX.Element {
  const { options } = PortalSite;

  const bookingFields =
    options.bookingFields || DefaultBookingFields;

  const { locale } = useContext(AppContext);

  const bookingPrice = house.booking_price;

  let costs = {};

  for (const val of bookingPrice.optional_house_costs) {
    costs[val.id] = '0';
  }

  const optBookingFieldsInitialized = initializeBookingFields(bookingFields);

  return (
    <Mutation mutation={CREATE_BOOKING_MUTATION}>
      {(createBooking, { loading, error, data }) => (
        <Formik
          validate={(values) => validateForm(values, house, bookingFields)}
          initialValues={{
            ...booking,
            ...optBookingFieldsInitialized,
            costs,
            adults: booking.persons,
            children: 0,
            babies: 0,
            persons: 2,
            discount: 0,
            country: 'nl'
          }}
          onSubmit={(values, { setSubmitting }) => {
            let variables = {
              ...values,
              is_option: JSON.parse(values.is_option),
              house_code: values.objectCode,
              portal_code: values.portalCode,
              comment: values.comment || '',
              language: locale,
              country: values.country.toUpperCase(),
              adults: Number(values.adults),
              children: Number(values.children) || 0,
              babies: Number(values.babies) || 0,
              discount: Number(values.discount) || 0,
              damage_insurance: Number(values.damage_insurance) || 0,
              cancel_insurance: Number(values.cancel_insurance) || 0,
              travel_insurance: Number(values.travel_insurance) || 0,
              arrival_date: values.arrivalDate.date,
              departure_date: values.departureDate.date,
              costs: JSON.stringify(values.costs),
              extra_fields: JSON.stringify(values.extra_fields)
            };

            createBooking({ variables })
              .then(() => {
                if (
                  options.bookingForm &&
                  options.bookingForm.redirectUrl &&
                  options.bookingForm.redirectUrl !== ''
                ) {
                  window.location = options.bookingForm.redirectUrl;
                } else {
                  setTimeout(() => {
                    this.props.onReturn();
                  }, 15000);
                }
              })
              .catch((err) => {});
          }}
          render={({ errors, touched, values, status, isSubmitting }) => (
            <Form className="form">
              {loading && <div className="return-message">Loading...</div>}
              {error && (
                <Modal show={true}>
                  <ApiError errors={error} modal={true} />
                </Modal>
              )}
              {data && (
                <Modal show={true}>
                  <SuccessMessage />
                </Modal>
              )}

              <div className="form-content">
                <div className="form-section">
                  <a
                    className="return-link"
                    role="link"
                    tabIndex={0}
                    onClick={() => {
                      this.props.onReturn();
                    }}
                  >
                    <FormattedMessage id="return_to_calendar" />
                  </a>
                  <h2>
                    <FormattedMessage id="stay_details" />
                  </h2>
                  <Guests options={options} house={house} />

                  {errors.max_persons && (
                    <div className="error-message persons">
                      {errors.max_persons}
                    </div>
                  )}
                </div>
                <Discount
                  errors={errors}
                  house={house}
                  options={options}
                  values={values}
                />

                <Insurances house={house} values={values} />

                <OptionalCosts costs={bookingPrice.optional_house_costs} />

                <OptionalBookingFields
                  bookingFields={bookingFields}
                  errors={errors}
                  touched={touched}
                  PortalSite={PortalSite}
                  values={values}
                />
              </div>

              <div className="form-sum">
                <Summary house={house} values={values} />
                {status && status.msg && <div>{status.msg}</div>}
                <div className="terms">
                  <FormattedMessage id="agree_with" />{' '}
                  <FormattedMessage id="terms">
                    {(fm) => (
                      <Modal buttonText={fm}>
                        <div
                          style={{
                            width: '90vh',
                            height: '90vh'
                          }}
                        >
                          <iframe
                            src={house.rental_terms}
                            width="100%"
                            height="100%"
                            title="Terms"
                          />
                        </div>
                      </Modal>
                    )}
                  </FormattedMessage>
                </div>
                {[1, 2].includes(Number(values.cancel_insurance)) ? (
                  <div className="terms">
                    <FormattedMessage id="comply_insurance_card" />
                  </div>
                ) : null}
                <button
                  className="button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <FormattedMessage id="book" />
                </button>
              </div>
            </Form>
          )}
        />
      )}
    </Mutation>
  );
}

FormCreator.propTypes = {
  house: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  booking: PropTypes.object.isRequired,
  PortalSite: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default FormCreator;
