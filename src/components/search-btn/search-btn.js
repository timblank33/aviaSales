import React from 'react';
import classes from './seach-btn.module.scss';
import { sortChange, filter } from '../../store/actions';
import { connect } from 'react-redux';

const SearchBtn = ({ sortProps, sortChange }) => {
  const onClick = (e) => {
    sortChange(e.target.innerHTML);
  };
  return (
    <div className={classes['search-btn']}>
      {sortProps &&
        sortProps.map(({ id, name, checked }) => {
          return (
            <button key={id} className={`${classes['btn']} ${checked && classes['active']}`} onClick={onClick}>
              {name}
            </button>
          );
        })}
    </div>
  );
};
const mapsStateProps = (state) => {
  return state;
};

export default connect(mapsStateProps, { sortChange, filter })(SearchBtn);
