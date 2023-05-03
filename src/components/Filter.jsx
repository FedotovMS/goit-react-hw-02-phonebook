import React from 'react';

const Filter = ({ value, onChange }) => (
  <input
    type="text"
    name="filter"
    value={value}
    onChange={onChange}
    placeholder="Search contacts"
  />
);

export default Filter;
