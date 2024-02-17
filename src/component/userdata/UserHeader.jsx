import Table from "../table/Table";

function UserHeader() {
  return (
    <Table.Header>
      <div></div>
      <div className="col-text">firstName</div>
      <div className="col-text">lastName</div>
      <div>age</div>
      <div>height</div>
    </Table.Header>
  );
}

export default UserHeader;
