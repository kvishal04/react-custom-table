import { Triangle } from "lucide-react";
import React, { useState } from "react";
import { TableColumn, TableComponentProps, TableConfig } from "./interface";
import Toolbar from "./Toolbar";



const DownIcon: React.FC = () => (
  <Triangle strokeWidth={1.75} fill="white" size={10} className="rotate-180" />
);
const UpIcon: React.FC = () => (
  <Triangle strokeWidth={1.75} fill="white" size={10} />
);
const CombineIcon: React.FC = () => (
  <>
    <UpIcon />
    <DownIcon />
  </>
);


const TableComponent: React.FC<TableComponentProps> = ({
  data,
  fullData = [],
  config,
  onCellClick,
}) => {
    const [sortConfig, setSortConfig] = useState<{
      key: string | null;
      direction: "asc" | "desc";
    }>({ key: config?.sortConfig?.key?.join(" ") || null, direction: config?.sortConfig?.direction || 'asc'  });


    const handleSort = (key: string) => {
      setSortConfig((prev) => ({
        key,
        direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
      }));
    };


    const isDate = (value: string): boolean => /^\d{2}\/\d{2}\/\d{4}$/.test(value);


    const parseDate = (dateStr: string): Date | null => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };
    const compareValues = (
      a: Record<string, any>,
      b: Record<string, any>,
      keys: string[],
      direction: "asc" | "desc"
    ) => {
      const getCombinedValue = (row: Record<string, any>): string => {
        return keys.map(k => String(row[k] ?? "").trim()).join(" ").toLowerCase();
      };
    
      const aValue = getCombinedValue(a);
      const bValue = getCombinedValue(b);
    
      // Handle null or empty
      if (!aValue) return direction === "asc" ? -1 : 1;
      if (!bValue) return direction === "asc" ? 1 : -1;
    
      // Check if it's a date
      if (isDate(aValue) && isDate(bValue)) {
        const dateA = parseDate(aValue)?.getTime() ?? 0;
        const dateB = parseDate(bValue)?.getTime() ?? 0;
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }
    
      // Check if it's numeric
      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        return direction === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
    
      // Fallback: string sort
      return direction === "asc"
        ? aValue.localeCompare(bValue, undefined, { numeric: true })
        : bValue.localeCompare(aValue, undefined, { numeric: true });
    };

    
    const sortedData = [...data].sort((a, b) =>
      sortConfig.key ? compareValues(a, b, sortConfig.key.split(" "), sortConfig.direction) : 0
    );

    const getSortIcon = (col: TableColumn) => {
      if (!col.sortable) return null;
      console.log(col.keys.join(" "), "sortConfig.key",sortConfig.key)
      if (sortConfig.key === col.keys.join(" ")) {
        return sortConfig.direction === "asc" ? <UpIcon /> : <DownIcon />;
      }
      return <CombineIcon />;
    };

  return (
    <div>
    {config.toolbar && config.toolbar.showToolbar &&
      <Toolbar
        toolbarConfig={config.toolbar.toolbarClass}
        columns={config.columns}
        onSearch={config.toolbar?.onSearch}
        data={fullData || []} // Fallback to empty array
        currentPageData={data || []} // Fallback to empty array
      />
    } 

  <table className={config.tableClassName}>
    <thead className={config.tHeadClassName}>
      <tr>
        {config.columns.map((col) => (
          <th
            key={col.name}
            className={
              col.className
                ? `${col.className} ${config.thClassName}`
                : config.thClassName
            }
            onClick={() => col.sortable && handleSort(col.keys.join(" "))}
          >
            <div className={config.thIconClassName}>
              <span>{getSortIcon(col)}</span>
              <span>{col.name}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody className={config.tBodyClassName}>
      {sortedData.length > 0 ? (
        sortedData.map((row, index) => (
          <tr
            key={row.id || JSON.stringify(row)}
            className={config.trClassName.class(row)}

          >
            {config.columns.map((col) => (
              <td
                key={col.name}
                className={`${config.tdClassname ?? ""} ${col.rowclassName ?? ""
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onCellClick?.(col.keys, row);
                }}
              >
                {col.customBodyRender
                  ? col.customBodyRender(row, index)
                  : col.keys.map(k => row[k]).filter(Boolean).join(" ") || config.emptyState.text()}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={config.columns.length} className={config.tdClassname}>
            {config.emptyState.text()}
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
  );
};


export default TableComponent;
