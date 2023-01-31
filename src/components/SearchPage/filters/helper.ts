export function createNumberArray(max_number: number): number[] {
  return Array.from({ length: max_number + 1 }, (v, k) => k);
}

export function createPriceArray(max_price: number): number[] {
  let rounded = Math.ceil(max_price / 100);
  return Array.from({ length: rounded + 1 }, (v, k) => k * 100);
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
