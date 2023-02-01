import React from 'react';
import CostRow from './CostRow';
import { PricesType } from './cost_types';

interface Props {
  prices: PricesType;
}

export default function RentAndDiscount({ prices }: Props): JSX.Element {
  const { rent_price, discount, discounted_price } = prices;
  return (
    <div className="costs-section">
      <table>
        <tbody>
          <CostRow name="rent_price" formatName={true} amount={rent_price} />
          {discount > 0 ? (
            <>
              <CostRow name="discount" formatName={true} amount={discount} />
              <CostRow
                name="price_after_discount"
                formatName={true}
                amount={discounted_price}
              />
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
