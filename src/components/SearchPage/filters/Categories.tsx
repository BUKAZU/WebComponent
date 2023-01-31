import React, { SyntheticEvent } from 'react';
import { PortalSiteType } from '../../../types';
import { FiltersType } from './filter_types';

interface Props {
  PortalSite: PortalSiteType;
  filters: FiltersType;
  onChange: Function;
}

function Categories({ PortalSite, filters, onChange }: Props): JSX.Element[] {
  const properties = filters.properties || [];
  let requiredCategories = PortalSite.options.filtersForm.categories;
  let input: JSX.Element[] = [];

  const handleChange = (event: SyntheticEvent<any>) => {
    const value = Number(event.currentTarget.value);

    if (properties.includes(value)) {
      let index = properties.indexOf(value);
      properties.splice(index, 1);
    } else {
      properties.push(value);
    }
    onChange('properties', properties);
  };

  PortalSite.categories.map((category) => {
    if (requiredCategories.includes(category.id)) {
      input.push(
        <div className="bu-properties" key={category.id}>
          <strong>{category.name}</strong>
          <ul>
            {category.properties.map((property) => (
              <li key={property.id}>
                <label htmlFor={property.id.toString()}>
                  <input
                    type="checkbox"
                    id={property.id.toString()}
                    value={property.id}
                    checked={properties.includes(property.id)}
                    onChange={handleChange}
                  />
                  {property.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  });

  return input;
}

export default Categories;
