const defaultValue = {
  searchId: '',
  ticketsInfo: [],
  maxLength: 5,
  filterTickets: [],
  error: false,
  loading: false,
  total: 0,
};
export const fetchReducer = (state = defaultValue, { type, payload }) => {
  switch (type) {
    case 'change_id':
      return { ...state, searchId: payload };
    case 'tickets_error':
      return { ...state, error: payload };
    case 'tickets_loading':
      return { ...state, loading: payload };
    case 'tickets_sucsess':
      return { ...state, ticketsInfo: payload, total: payload.length };
    case 'max_length':
      return { ...state, maxLength: payload };
    case 'filter':
      return { ...state, filterTickets: payload };
    case 'sort_tickets':
      return { ...state, sortTickets: payload };
    default:
      return state;
  }
};
