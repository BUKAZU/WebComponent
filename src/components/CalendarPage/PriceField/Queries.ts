import { gql } from "@apollo/client";

export const BOOKING_PRICE_QUERY = gql`
  query BookingPriceQuery(
    $portalCode: ID!
    $objectCode: String!
    $starts_at: Date!
    $ends_at: Date!
    $persons: Int
  ) {
    PortalSite(id: $portalCode) {
      houses(house_code: $objectCode) {
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