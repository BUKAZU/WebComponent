// import React from 'react';
// import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import {
//   FormatIntl,
//   LONG_DATE_FORMAT,
//   Parse_EN_US
// } from '../../../_lib/date_helper';
// import { HouseType } from '../../../types';
// import { PossibleValues } from '../formParts/form_types';
// import { useLocale } from '../../../intl';

// interface Props {
//   house: HouseType;
//   values: PossibleValues;
// }

// export const Object = ({ house, values }: Props): React.ReactNode => {
//   const t = useLocale();

//   const { arrivalDate, departureDate } = values;
//   return (
//     <React.Fragment>
//       <h2>{t.formatMessage({ id: 'booking_details' })}</h2>
//       <div className="house-details">
//         <div>{house.name}</div>
//         <img src={house.image_url} alt="" />
//         <table>
//           <tbody>
//             <tr>
//               <th>{t.formatMessage({ id: `${house.house_type}.arrival` })}</th>
//               <td className="price">
//                 {FormatIntl(Parse_EN_US(arrivalDate.date), LONG_DATE_FORMAT)}
//               </td>
//               <td>
//                 {arrivalDate.arrival_time_from} - {arrivalDate.arrival_time_to}
//               </td>
//             </tr>
//             <tr>
//               <th>
//                 {t.formatMessage({ id: `${house.house_type}.departure` })}
//               </th>
//               <td className="price">
//                 {FormatIntl(Parse_EN_US(departureDate.date), LONG_DATE_FORMAT)}
//               </td>
//               <td>{departureDate.departure_time}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </React.Fragment>
//   );
// };
