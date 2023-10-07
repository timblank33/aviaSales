const defaultState = [
  { id: 1, name: 'no-transfer', value: 'Без пересадок', checked: false },
  { id: 2, name: 'one-transfer', value: '1 пересадка', checked: false },
  { id: 3, name: 'two-transfer', value: '2 пересадки', checked: false },
  { id: 4, name: 'three-transfer', value: '3 пересадки', checked: false },
];

export const transferReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'transfer':
      return state.map((el) => (el.name === payload ? { ...el, checked: !el.checked } : el));

    case 'checkAll':
      return state.map((el) => ({ ...el, checked: true }));

    case 'unCheckAll':
      return state.map((el) => ({ ...el, checked: false }));

    default:
      return state;
  }
};
