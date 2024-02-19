/* eslint-disable react/prop-types */
import UserRowList from "./UserRowList";
import UserHeader from "./UserHeader";
import UserFilter from "./UserFilter";
import Table from "../table/Table";
import Paging from "../table/paging/Paging";

function UserTable({
  userState,
  handlePageChange,
  handleFilterChange,
  handleRowSelectionChange,
}) {
  return (
    userState && (
      <Table columns="20px 1.5fr 1.5fr 1fr 1fr">
        <UserFilter handleFilterChange={handleFilterChange}></UserFilter>
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
          totalPage={Math.ceil(userState.totalCount / userState.pageLimit)}
          handlePageChange={handlePageChange}
        ></Paging>
      </Table>
    )
  );
}

export default UserTable;
