import ErrorMessage from "../ErrorMessage";
import Table from "../table/Table";
import "./Dashboard.css";
import Paging from "../table/paging/Paging";
import Chart from "./chart/Chart";
import UserRowList from "../userdata/UserRowList";
import UserHeader from "../userdata/UserHeader";
import UserFilter from "../userdata/UserFilter";
import LoadingOverlay from "react-loading-overlay-ts";
import useUserData from "../userdata/useUserData";

function Dashboard() {
  const {
    userState,
    loading,
    error,
    graphData,
    handleRowSelectionChange,
    handleFilterChange,
    handlePageChange,
  } = useUserData();
  return (
    <LoadingOverlay active={loading} spinner text="Loading your content...">
      {error && <ErrorMessage />}
      {!error && (
        <div className="container">
          <div>
            {userState && (
              <Table columns="20px 1.5fr 1.5fr 1fr 1fr">
                <UserFilter
                  handleFilterChange={handleFilterChange}
                ></UserFilter>
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
            <Chart
              xData={graphData.xData}
              yData={graphData.yData}
              lables={graphData.chartLabel}
            ></Chart>
          </div>
        </div>
      )}
    </LoadingOverlay>
  );
}

export default Dashboard;
