/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import "./Table.css";
const tableContext = createContext("");

function Table({ columns, children }) {
  return (
    <tableContext.Provider value={columns}>
      <div className="table">{children}</div>
    </tableContext.Provider>
  );
}

function Header({ children }) {
  const columns = useContext(tableContext);
  return (
    <header className="table-header" style={{ gridTemplateColumns: columns }}>
      {children}
    </header>
  );
}

function Row({ children }) {
  const columns = useContext(tableContext);
  return (
    <div className="table-row" style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  );
}

function Footer({ children }) {
  return <div className="table-footer">{children}</div>;
}

function Body({ children, height }) {
  return (
    <div className="table-body" style={{ height: height }}>
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;
