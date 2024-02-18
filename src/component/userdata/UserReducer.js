export const initialState = {
  data: [],
  query: "",
  totalCount: 100,
  startIndex: 0,
  pageLimit: 10,
  page: 1,
};

export const UserAction = {
  SELECTION: "SELECTION",
  UPDATE: "UPDATE",
  FILTER: "FILTER",
  PAGINATION: "PAGINATION",
};
export const userReducer = (currntState, action) => {
  if (action.type === UserAction.UPDATE) {
    return {
      ...currntState,
      data: action.payload,
      totalCount: action.totalCount,
    };
  }
  if (action.type === UserAction.SELECTION) {
    const userData = [...currntState.data];
    const index = userData.findIndex((user) => user.id === action.payload.id);
    userData[index] = {
      ...userData[index],
      selected: !userData[index].selected,
    };
    return {
      ...currntState,
      data: userData,
    };
  }
  if (action.type === UserAction.FILTER) {
    return {
      ...currntState,
      data: [],
      query: action.query,
      startIndex: 0,
      page: 1,
    };
  }
  if (action.type === UserAction.PAGINATION) {
    return {
      ...currntState,
      data: [],
      page: action.page,
      startIndex: (action.page - 1) * currntState.pageLimit,
    };
  }
};
