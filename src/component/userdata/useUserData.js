import { useEffect, useReducer } from "react";
import {
  userReducer,
  UserAction,
  initialState as UserInitState,
} from "./UserReducer";
import useFetch from "use-http";

function useUserData() {
  const [userState, dispatchUser] = useReducer(userReducer, UserInitState);
  const graphData = { xData: [], yData: [], chartLabel: [] };

  if (userState?.data?.length > 0) {
    userState.data
      .filter((x) => x.selected)
      .forEach((user) => {
        graphData.xData.push(user.firstName);
        graphData.yData.push(user.age);
        graphData.chartLabel.push(
          `${user.firstName} ${user.lastName} : ${user.age}`
        );
      });
  }

  const { get, response, loading, error } = useFetch("https://dummyjson.com");

  useEffect(() => {
    const getUserData = async () => {
      let url = `/users${
        userState.query.length > 0 ? "/search?q=" + userState.query + "&" : "?"
      }limit=${userState.pageLimit}&skip=${
        userState.startIndex
      }&select=firstName,lastName,age,height,weight`;

      const userData = await get(url);
      if (response.ok) {
        var data = userData.users.map((u, i) => {
          return { ...u, selected: i < 5 };
        });
        dispatchUser({
          type: UserAction.UPDATE,
          payload: data,
          totalCount: userData.total,
        });
      }
    };

    getUserData();
  }, [
    get,
    response,
    dispatchUser,
    userState.pageLimit,
    userState.startIndex,
    userState.query,
  ]);

  const handleRowSelectionChange = (event, user) => {
    dispatchUser({
      type: UserAction.SELECTION,
      payload: user,
    });
  };

  const handlePageChange = (index) => {
    const newPage = userState.page + index;
    const totalPage = userState.totalCount / userState.pageLimit;
    if (newPage > 0 && newPage <= totalPage)
      dispatchUser({
        type: UserAction.PAGINATION,
        page: userState.page + index,
      });
  };

  const handleFilterChange = (text) => {
    if (text != undefined) {
      dispatchUser({
        type: UserAction.FILTER,
        query: text,
      });
    }
  };

  return {
    userState,
    loading,
    error,
    graphData,
    handleRowSelectionChange,
    handleFilterChange,
    handlePageChange,
  };
}

export default useUserData;
