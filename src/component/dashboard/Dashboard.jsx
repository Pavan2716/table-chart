import { useEffect, useReducer, useRef } from "react";
import {
  userReducer,
  UserAction,
  initialState as UserInitState,
} from "../UserReducer";
import useFetch from "use-http";
import ErrorMessage from "../ErrorMessage";
import Table from "../table/Table";
import "./Dashboard.css";
import Paging from "../table/paging/Paging";
import Chart from "./chart/Chart";
import UserRowList from "../userdata/UserRowList";
import UserHeader from "../userdata/UserHeader";
import LoadingOverlay from "react-loading-overlay-ts";

function Dashboard() {
  const filterRef = useRef();
  const [userState, dispatchUser] = useReducer(userReducer, UserInitState);
  const xData = [];
  const yData = [];
  const chartLabel = [];

  if (userState?.data?.length > 0) {
    userState.data
      .filter((x) => x.selected)
      .forEach((user) => {
        xData.push(user.firstName);
        yData.push(user.age);
        chartLabel.push(`${user.firstName} ${user.lastName} : ${user.age}`);
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
  return (
    <LoadingOverlay active={loading} spinner text="Loading your content...">
      {error && <ErrorMessage />}
      {!error && (
        <div className="container">
          <div>
            {userState && (
              <Table columns="20px 1.5fr 1.5fr 1fr 1fr">
                <div>
                  <input type="text" ref={filterRef}></input>
                  <button
                    onClick={() => {
                      handleFilterChange(filterRef.current.value);
                      filterRef.current.value = "";
                    }}
                  >
                    Filter
                  </button>
                </div>
                <UserHeader></UserHeader>
                <UserRowList
                  userData={userState?.data}
                  pageLimit={userState?.pageLimit}
                  handleRowSelectionChange={handleRowSelectionChange}
                ></UserRowList>
                {userState?.data.length === 0 && (
                  <Table.Body height="30rem"></Table.Body>
                )}
                <Paging
                  currentPage={userState.page}
                  totalPage={Math.ceil(
                    userState.totalCount / userState.pageLimit
                  )}
                  handlePageChange={handlePageChange}
                ></Paging>
              </Table>
            )}
          </div>
          <div>
            <Chart xData={xData} yData={yData} lables={chartLabel}></Chart>
          </div>
        </div>
      )}
    </LoadingOverlay>
  );
}

export default Dashboard;
