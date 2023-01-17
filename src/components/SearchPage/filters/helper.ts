export function createNumberArray(max_number: number): number[] {
  return Array.apply(null, { length: max_number + 1 }).map(Number.call, Number);
}

export function createPriceArray(max_price: number): number[] {
  let rounded = Math.ceil(max_price / 100);
  return Array.from({ length: rounded }, (v, k) => k * 100);
}

export const defaultFilter = [
  {
    label: 'Land',
    id: 'countries',
    type: 'select',
    required: false,
    mandatory: true,
    options: ['select', 'list', 'radio', 'text']
  }
];
