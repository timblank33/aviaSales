import React from 'react';
import classes from './task.module.scss';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import { FallingLines } from 'react-loader-spinner';

const Task = ({ price, carrier, segments = [1], fetchProps }) => {
  function msecToString(val) {
    let mins = val;
    const hours = Math.floor(mins / 60);
    mins %= 60;
    if (mins < 10) mins = '0' + mins;
    return hours + 'ч ' + mins + 'м';
  }
  const isLoading = fetchProps.loading;
  const formatPrice = (price) => {
    const str = String(price);
    if (str.length === 4) {
      return str.slice(0, 1) + ' ' + str.slice(1);
    } else if (str.length === 5) {
      return str.slice(0, 2) + ' ' + str.slice(2);
    } else if (str.length === 6) {
      return str.slice(0, 3) + ' ' + str.slice(3);
    }
    return price;
  };
  const loader = <FallingLines color="#000" width="80" visible={true} ariaLabel="falling-lines-loading" />;
  const aviaImg = (
    <React.Fragment>
      <p className={classes['ticket-price']}>{formatPrice(price)} Р</p>
      <img className={classes['ticket-logo']} src={`//pics.avs.io/99/36/${carrier}.png`} alt="avia-logo" />
    </React.Fragment>
  );
  return (
    <div className={classes['ticket']}>
      <div className={classes['ticket-header']}>{isLoading ? <p>Загружаем билет</p> : aviaImg}</div>
      {segments.map((item) => {
        const { origin, destination, date, duration, stops = [] } = item;
        const id = nanoid();
        const numberTransfer = stops.length;
        const newDate = new Date(date);
        const addTimeDate = new Date(Date.parse(date) + duration * 60000);
        const renderDate = !isLoading && `${format(newDate, 'HH:mm')} – ${format(addTimeDate, 'HH:mm')}`;
        const transferFragment = (
          <React.Fragment>
            <div className={classes['ticket-transfer']}>
              <p className={classes['ticket-title']}>
                {numberTransfer > 1
                  ? numberTransfer + ' Пересадки'
                  : numberTransfer > 0
                  ? numberTransfer + ' Пересадка'
                  : 'Без пересадок'}
              </p>
              <p className={classes['ticket-value']}>
                {!stops &&
                  stops.map((item) => {
                    return ` ${item}`;
                  })}
              </p>
            </div>
          </React.Fragment>
        );

        return (
          <div key={id} className={classes['ticket-info']}>
            <div className={classes['ticket-place']}>
              {isLoading ? (
                loader
              ) : (
                <p className={classes['ticket-title']}>
                  {origin}- {destination}
                </p>
              )}

              <p className={classes['ticket-value']}> {renderDate}</p>
            </div>
            <div className={classes['ticket-time']}>
              {!isLoading && <p className={classes['ticket-title']}>В пути</p>}

              <p className={classes['ticket-value']}>{!isLoading && msecToString(duration).toUpperCase()}</p>
            </div>

            {date && transferFragment}
          </div>
        );
      })}
    </div>
  );
};
const mapsStateProps = (state) => {
  return state;
};

export default connect(mapsStateProps)(Task);
