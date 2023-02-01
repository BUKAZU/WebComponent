import React, { SyntheticEvent } from 'react';
import { Field, FiltersType, OptionsType } from './filter_types';

interface Props {
  options: OptionsType[];
  filters: FiltersType;
  onChange: Function;
  field: Field;
}

function Radio({ options, filters, onChange, field }: Props): JSX.Element {
  const countries = filters.countries;

  const handleChange = (event: SyntheticEvent<any>) => {
    onChange(field.id, event.currentTarget.value);
  };

  return (
    <ul className="radioList">
      {options.map((opt) => (
        <li
          key={opt.id || opt}
          className={`bu-list-item ${
            countries && !countries.includes(opt.country_id)
              ? 'bu-disabled'
              : ''
          }`}
        >
          <input
            name={field.id}
            type="radio"
            id={opt.id || opt}
            value={opt.id || opt}
            disabled={countries ? !countries.includes(opt.country_id) : false}
            // checked={value === opt.id || opt}
            onBlur={handleChange}
            onChange={handleChange}
          />
          <label htmlFor={opt.id || opt}>{opt.name || opt}</label>
        </li>
      ))}
    </ul>
  );
}

export default Radio;
