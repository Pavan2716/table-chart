/* eslint-disable react/prop-types */
import Table from "../table/Table";

function UserRowList({ userData, handleRowSelectionChange }) {
  return (
    <>
      {userData &&
        userData.map((u) => {
          return (
            <Table.Row key={u.id}>
              <div>
                <input
                  onChange={(event) => {
                    handleRowSelectionChange(event, u);
                  }}
                  type="checkbox"
                  checked={u.selected}
                ></input>
              </div>
              <div className="col-text">{u.firstName}</div>
              <div className="col-text">{u.lastName}</div>
              <div>{u.age}</div>
              <div>{u.height}</div>
            </Table.Row>
          );
        })}
    </>
  );
}

export default UserRowList;
