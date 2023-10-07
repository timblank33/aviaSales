import React from 'react';
import classes from './change-transfers.module.scss';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

const ChangeTransfer = ({ checkProps, transferDispatch, checkAllTransfers, unCheckAllTransfers }) => {
  return (
    <div className={classes['change-transfer']}>
      <p className={classes['change-transfer__title']}>Количество пересадок</p>
      <div className={classes['change-transfer__btn']}>
        <input
          className={classes['checkbox']}
          type="checkbox"
          name={'all-transfer'}
          checked={checkProps.every((el) => el.checked)}
          onChange={({ target: { checked } }) => (checked ? checkAllTransfers() : unCheckAllTransfers())}
        />
        <label htmlFor={'all-transfer'}>Все</label>
      </div>
      {checkProps &&
        checkProps.map(({ id, name, value, checked }) => {
          return (
            <div key={id} className={classes['change-transfer__btn']}>
              <input
                className={classes['checkbox']}
                type="checkbox"
                name={name}
                onChange={() => {
                  transferDispatch(name);
                }}
                checked={checked}
              />
              <label htmlFor={name}>{value}</label>
            </div>
          );
        })}
    </div>
  );
};
const mapsStateProps = (state) => {
  return state;
};

export default connect(mapsStateProps, actions)(ChangeTransfer);
