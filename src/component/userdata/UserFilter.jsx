/* eslint-disable react/prop-types */
import { useState } from "react";

function UserFilter({ handleFilterChange }) {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      ></input>
      <button
        onClick={() => {
          handleFilterChange(filter);
        }}
      >
        Filter
      </button>
    </div>
  );
}

export default UserFilter;
