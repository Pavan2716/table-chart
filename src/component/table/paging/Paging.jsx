/* eslint-disable react/prop-types */
import Table from "../Table";

function Paging({ currentPage, totalPage, handlePageChange }) {
  return (
    <>
      {totalPage > 0 && (
        <Table.Footer>
          <div>
            {currentPage === 1 ? (
              <button disabled className="btn-disabled">
                ❮
              </button>
            ) : (
              <button onClick={() => handlePageChange(-1)}>❮</button>
            )}
            <span className="paging">
              {currentPage}/{totalPage}
            </span>
            {currentPage === totalPage ? (
              <button disabled>❯</button>
            ) : (
              <button
                href="#"
                className="a-active"
                onClick={() => handlePageChange(1)}
              >
                ❯
              </button>
            )}
          </div>
        </Table.Footer>
      )}
    </>
  );
}

export default Paging;
