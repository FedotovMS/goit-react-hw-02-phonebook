import React from 'react';

const Filter = ({ value, onSearch }) => (
  <input
    type="text"
    name="filter"
    value={value}
    onChange={onSearch}
    placeholder="Search contacts"
  />
);

export default Filter;
