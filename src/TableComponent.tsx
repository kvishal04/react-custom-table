import React from "react";

interface TableProps {
  data: { [key: string]: any }[];
  columns: string[];
}

const TableComponent: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} style={{ border: "1px solid black", padding: "8px" }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>   
            {columns.map((col, colIndex) => (
              <td key={colIndex} style={{ border: "1px solid black", padding: "8px" }}>
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
