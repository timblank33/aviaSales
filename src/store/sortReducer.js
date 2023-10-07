const defaultValue = [
  { id: 1, name: 'Самый дешевый', checked: false },
  { id: 2, name: 'Самый быстрый', checked: false },
  { id: 3, name: 'Оптимальный', checked: false },
];

export const sortReducer = (state = defaultValue, { type, payload }) => {
  switch (type) {
    case 'change':
      return state.map((el) => (el.name === payload ? { ...el, checked: !el.checked } : { ...el, checked: false }));
    default:
      return state;
  }
};
