export const transferDispatch = (transferId) => ({ type: 'transfer', payload: transferId });
export const checkAllTransfers = () => ({ type: 'checkAll' });
export const unCheckAllTransfers = () => ({ type: 'unCheckAll' });
export const sortChange = (checked) => ({ type: 'change', payload: checked });
export const searchId = (id) => ({ type: 'change_id', payload: id });
export const ticketsError = (bool) => ({ type: 'tickets_error', payload: bool });
export const ticketsIsLoading = (bool) => ({ type: 'tickets_loading', payload: bool });
export const ticketsSucsess = (items) => ({ type: 'tickets_sucsess', payload: items });
export const filter = (name) => ({ type: 'filter', payload: name });
export const upMaxLength = (length) => ({ type: 'max_length', payload: length });
export const fetchTickets = () => {
  return async (dispatch) => {
    await dispatch(ticketsIsLoading(true));
    let responeseId = await fetch('https://aviasales-test-api.kata.academy/search');
    if (responeseId.status !== 200) {
      await dispatch(ticketsError(true));
    }
    const jsonId = await responeseId.json();
    await dispatch(searchId(jsonId.searchId));
    let stop = false;
    async function subscribe(tickets = []) {
      if (jsonId.searchId) {
        let responeseTickets = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${jsonId.searchId}`
        );
        if (responeseTickets.status !== 200) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await subscribe(tickets);
        }
        if (!stop) {
          let jsonTickets = await responeseTickets.json();

          stop = jsonTickets.stop;
          let allTIckets = [...tickets, ...jsonTickets.tickets];

          await dispatch(ticketsSucsess(allTIckets));
          await dispatch(ticketsIsLoading(false));
          await subscribe(allTIckets);
        }
      }
    }
    await subscribe();
  };
};
