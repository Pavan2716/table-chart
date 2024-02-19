import ErrorMessage from "../ErrorMessage";
import "./Dashboard.css";
import Chart from "./chart/Chart";
import LoadingOverlay from "react-loading-overlay-ts";
import useUserData from "../userdata/useUserData";
import UserTable from "../userdata/UserTable";

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
            <UserTable
              userState={userState}
              handleRowSelectionChange={handleRowSelectionChange}
              handleFilterChange={handleFilterChange}
              handlePageChange={handlePageChange}
            ></UserTable>
          </div>
          <div>
            <Chart
              title="User Age Plot"
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
