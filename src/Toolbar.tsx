import { TableColumn, ToolbarConfig } from "../interface/index";
import { useState } from "react";
import { Search, ChevronDown, Download } from "lucide-react";
import { saveAs } from "file-saver";
import Papa from "papaparse";



interface ToolbarProps {
  columns: TableColumn[];
  onSearch: (query: string, columns: string[]) => void;
  toolbarConfig: ToolbarConfig;
  data: any[];
  currentPageData: any[];
}

export default function Toolbar({
  columns,
  onSearch,
  toolbarConfig,
  data,
  currentPageData,
}: ToolbarProps) {
  const [query, setQuery] = useState("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);

  const handleColumnChange = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const exportCSV = (exportData: any[], fileName: string) => {
    if (!exportData || exportData.length === 0) {
      console.error("No data available for export.");
      return;
    }
    const selectedCols = selectedColumns.length
      ? selectedColumns
      : columns.map((col) => col.keys[0]);
    const filteredData = exportData.map((row) =>
      Object.fromEntries(selectedCols.map((col) => [col, row[col]]))
    );
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full mt-4">
      {/* Search Input */}
      <div className="relative flex-grow w-full sm:w-1/2 lg::w-3/4">
        <input
          type="text"
          className="w-full p-2 pl-10 border rounded"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(
              e.target.value,
              selectedColumns.length ? selectedColumns : columns.map((col) => col.keys[0])
            );
          }}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
      </div>

      {/* Buttons Section */}
      <div className="w-full sm:w-1/2 lg:w-1/4 flex flex-wrap justify-end items-end gap-2 p-2">
        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className={`flex items-center gap-2 px-3 py-2 border rounded transition 
              ${toolbarConfig.backgroundColor} ${toolbarConfig.textColor} ${toolbarConfig.borderColor} 
              ${toolbarConfig.hoverBgColor} ${toolbarConfig.hoverTextColor}`}
          >
            Filters <ChevronDown size={16} />
          </button>

          {isFilterDropdownOpen && (
            <div className={`absolute left-0 mt-2 border rounded shadow-lg w-48 z-10 p-2 
                ${toolbarConfig.backgroundColor} ${toolbarConfig.textColor}`}>
              {columns.map((col) => (
                <label
                  key={col.name}
                  className={`flex items-center gap-2 p-2 transition 
                    ${toolbarConfig.hoverBgColor} ${toolbarConfig.hoverTextColor}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(col.keys[0])}
                    onChange={() => handleColumnChange(col.keys[0])}
                  />
                  {col.name}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Download Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
            className="px-3 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
          >
            <Download size={16} /> CSV <ChevronDown size={16} />
          </button>

          {isDownloadDropdownOpen && (
            <div className="absolute right-0 mt-2 border rounded shadow-lg w-36 bg-white text-black z-20 ">
              <button
                onClick={() => {
                  exportCSV(currentPageData, "current_page");
                  setIsDownloadDropdownOpen(false);
                }}
                className="block  text-left px-3 py-2 hover:bg-gray-200"
              >
                Current Page
              </button>
              <button
                onClick={() => {
                  exportCSV(data, "all_data");
                  setIsDownloadDropdownOpen(false);
                }}
                className="block text-left px-3 py-2 hover:bg-gray-200"
              >
                All Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
