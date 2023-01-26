import { gql } from "@apollo/client";

export const BOOKING_PRICE_QUERY = gql`
  query BookingPriceQuery(
    $id: ID!
    $house_id: String!
    $starts_at: Date!
    $ends_at: Date!
    $persons: Int
  ) {
    PortalSite(id: $id) {
      houses(house_code: $house_id) {
        id
        name
        booking_price(
          starts_at: $starts_at
          ends_at: $ends_at
          persons: $persons
        )
      }
    }
  }
`;