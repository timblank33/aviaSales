import React, { useEffect } from 'react';
import Task from '../task';
import classes from './task-list.module.scss';
import { fetchTickets, upMaxLength, filter } from '../../store/actions';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

const TaskList = ({ checkProps, sortProps, fetchProps, fetchTickets, upMaxLength, filter }) => {
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
  useEffect(() => {
    let tickets = [];
    fetchProps.ticketsInfo.forEach((ticket) => {
      for (let ticketKey of ticket.segments) {
        for (let checkKey of checkProps) {
          if (checkKey.checked && checkKey.id - 1 === ticketKey.stops.length) {
            tickets.push(ticket);
          }
        }
      }
    });
    if (sortProps[0].checked) {
      tickets = tickets.sort((a, b) => a.price - b.price);
    }
    if (sortProps[1].checked) {
      tickets = tickets.sort((a, b) => {
        return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
      });
    }
    if (sortProps[2].checked) {
      tickets = tickets.sort(
        (a, b) =>
          a.price +
          a.segments[0].duration +
          a.segments[1].duration -
          (b.price + b.segments[0].duration + b.segments[1].duration)
      );
    }
    filter(tickets);
  }, [checkProps, sortProps, fetchProps.ticketsInfo, filter]);

  const { loading, error, filterTickets, total } = fetchProps;
  const ticketsMaxLength = fetchProps.maxLength;
  const zeroArr = [1, 2, 3, 4, 5];

  let maxTickets = filterTickets.reduce((acc, item, i) => {
    if (i < ticketsMaxLength) {
      acc.push(item);
    }

    return acc;
  }, []);

  const onClick = () => {
    if (ticketsMaxLength < total) upMaxLength(ticketsMaxLength + 5);
  };
  const btnContent = (
    <React.Fragment>
      <button className={classes['task-more']} onClick={onClick}>
        Показать еще 5 билетов!
      </button>
    </React.Fragment>
  );
  const isError = <p className={classes['error-message']}>Ошибка, обновите страницу</p>;
  const noResults = <p className={classes['error-message']}>Результатов нет, выберите новый пункт</p>;

  const hasError = error ? isError : null;
  const renderMoreBtn = loading
    ? null
    : filterTickets.length > 0 && ticketsMaxLength < filterTickets.length
    ? btnContent
    : noResults;
  return (
    <div className={classes['task-list']}>
      <div className={classes['loader']}>{hasError}</div>
      {!loading &&
        maxTickets.map((item) => {
          const id = nanoid();
          return <Task {...item} key={id} />;
        })}
      {loading &&
        zeroArr.map((item) => {
          const id = nanoid();
          return <Task {...item} key={id} />;
        })}
      {renderMoreBtn}
    </div>
  );
};
const mapsStateProps = (state) => {
  return state;
};

export default connect(mapsStateProps, { fetchTickets, upMaxLength, filter })(TaskList);
