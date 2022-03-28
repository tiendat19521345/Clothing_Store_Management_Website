import React from "react";
import "./table.css";
const Table = ({ theadData, tbodyData, renderHead, renderBody }) => {
  return (
    <table>
      {theadData && renderHead && renderHead(theadData)}
      {tbodyData && renderBody && renderBody(tbodyData)}
    </table>
  );
};

export default Table;
