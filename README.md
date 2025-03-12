# React Table Component with Pagination

## Overview
This React library provides a customizable and responsive table component with built-in pagination. It allows users to display, sort, and paginate tabular data efficiently.

## Features
- Customizable table structure with configurable styles.
- Sorting functionality for columns.
- Pagination controls with adjustable items per page.
- Supports click handlers for table cells.

---

## Installation
To install the package, run:
```sh
npm i react-table-pagination-v1
```

Or using yarn:
```sh
yarn add react-table-pagination-v1
```

---


## Use Cases
### 1. Using Only the Table Component
Use this when you only need to display tabular data without pagination or filtering.
```tsx
import { TableComponent } from "react-table-pagination-v1";

const SimpleTable: React.FC = () => {
  const data = [...yourData];
  
  const tableConfig = {
    tableClassName: "min-w-full bg-white border border-gray-200 shadow-md rounded-lg",
    tHeadClassName: "bg-darkGreen text-white border rounded-lg sticky top-0 z-10",
    thClassName: "py-2 px-4 text-left border-b cursor-pointer gap-2",
    trClassName: {
      class: () => "border-b hover:bg-gray-100 border-b-lightGreen",
    },
    thIconClassName: "flex flex-row items-center gap-2",
    tBodyClassName: "",
    tdClassname: "py-2 px-4",
    columns: [
      { name: "Number", keys: ["number"], sortable: true },
      { name: "Name", keys: ["product_name"], sortable: true },
    ],
    emptyState: {
      text: () => "No data available",
    },
  };

  return <TableComponent fullData={data} data={data} config={tableConfig} />;
};

export default SimpleTable;
```

### 2. Using Table with Pagination
Use this when your dataset is large and you need pagination to enhance user experience.
```tsx
import React, { useState } from "react";
import { TableComponent, Pagination } from "react-table-pagination-v1";

const PaginatedTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const data = [...yourData];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <TableComponent fullData={data} data={currentItems} config={tableConfig} />
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(items) => {
          setItemsPerPage(items);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default PaginatedTable;
```

### 3. Using Table with Pagination and Filtering
Use this when you want users to filter/search through data along with pagination.
```tsx
import React, { useState } from "react";
import { TableComponent, Pagination, Toolbar } from "react-table-pagination-v1";

const FilterablePaginatedTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumns, setSearchColumns] = useState<string[]>([]);
  const data = [...yourData];

  const tableConfig: TableConfig = {
    tableClassName: "min-w-full bg-black border border-gray-200 shadow-md rounded-lg",
    tHeadClassName: "bg-darkGreen text-white border rounded-lg sticky top-0 z-10",
    thClassName: "py-2 px-4 text-left border-b cursor-pointer gap-2",
    trClassName: {
      class: () => "border-b hover:bg-gray-100 hover:text-black border-b-lightGreen",
    },
    thIconClassName: "flex flex-row items-center gap-2",
    tBodyClassName: "",
    tdClassname: "py-2 px-4",
    columns: [
      { name: "Number", keys: ["number"], sortable: true },
      { name: "Name", keys: ["name"], sortable: true },
      { name: "Accreditation", keys: ["accreditation"], sortable: true },
      { name: "Submitted Date", keys: ["submitted"], sortable: true },
      { name: "Response Date", keys: ["response"], sortable: true },
      { name: "Status", keys: ["status"], sortable: true },
    ],
    emptyState: {
      text: () => "No data available",
    },
    rows: {
      className: ""
    },

    toolbar: {
      showToolbar: true,
      toolbarClass: {
        backgroundColor: "bg-white",
        textColor: "text-black",
        borderColor: "border-gray-500",
        hoverBgColor: "hover:bg-black",
        hoverTextColor: "hover:text-white",
      },
      onSearch: (query , seletedCols)=>  handleSearch(query , seletedCols)
    }
  };

  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;
    return searchColumns.some((col) => {
      const value = (item as Record<string, any>)[col]?.toString().toLowerCase();
      return value?.includes(searchQuery.toLowerCase());
    });
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (query: string, selectedColumns: string[]) => {
    setSearchQuery(query);
    setSearchColumns(selectedColumns);
    setCurrentPage(1);
  };

  return (
    <div>
      <TableComponent fullData={data} data={currentItems} config={tableConfig} />
      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(items) => {
          setItemsPerPage(items);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default FilterablePaginatedTable;
```

---
## Table Component Types and Interfaces

### `TableColumn`
Defines the structure of a column in your table.

```ts
type TableColumn = {
  name: string;
  keys: string[];
  sortable?: boolean;
  className?: string;
  rowclassName?: string;
  customBodyRender?: (row: any, index?: number) => JSX.Element;
};
```

#### Properties:
- `name`: Display name of the column in the table header.
- `keys`: Data object keys that map to this column.
- `sortable?`: Whether the column can be sorted.
- `className?`: Custom CSS class for the column header.
- `rowclassName?`: Custom CSS class for each row in this column.
- `customBodyRender?`: A function to render a custom component inside the column's cells.

#### Example Usage:
```tsx
const columns: TableColumn[] = [
  { name: "ID", keys: ["id"], sortable: true },
  { name: "Name", keys: ["name"], sortable: true },
  {
    name: "Actions",
    keys: ["actions"],
    customBodyRender: (row) => (
      <button onClick={() => alert(row.name)}>Click Me</button>
    )
  }
];
```

---

### `ToolbarConfig`
Defines the styling options for the optional toolbar.

```ts
interface ToolbarConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
}
```

#### Properties:
- `backgroundColor?`: Background color for the toolbar.
- `textColor?`: Text color for the toolbar.
- `borderColor?`: Border color of the toolbar.
- `hoverBgColor?`: Background color when hovering over elements.
- `hoverTextColor?`: Text color when hovering over elements.

---

### `TableConfig`
Defines the structure of the table's configuration.

```ts
type TableConfig = {
  tableClassName: string;
  tHeadClassName: string;
  tBodyClassName: string;
  trClassName: {
    class: (row: any) => string;
  };
  thClassName: string;
  thIconClassName: string;
  tdClassname: string;
  columns: TableColumn[];
  rows: {
    className: string;
  };
  emptyState: {
    text: () => string;
  };
  toolbar?: {
    showToolbar: boolean;
    onSearch: (query: string, selectedCols: string[]) => void;
    toolbarClass: ToolbarConfig;
  };
};
```

#### Properties:
- `tableClassName`: CSS classes for the table element.
- `tHeadClassName`: CSS classes for the table header (`<thead>`).
- `tBodyClassName`: CSS classes for table body (`<tbody>`).
- `trClassName`: Function returning a dynamic class for each row.
- `thClassName`: CSS classes for table header (`<th>`).
- `thIconClassName`: CSS classes for header icons.
- `tdClassname`: CSS classes for table data cells (`<td>`).
- `columns`: Array defining column headers and associated data keys.
- `rows`: CSS class configuration for rows.
- `emptyState`: Function returning the text to display when no data is available.
- `toolbar?`: Configuration for the toolbar, including search functionality.

---

### Table Props

#### `TableComponent` Props
| Prop            | Type                                  | Description                                     |
|----------------|--------------------------------------|-------------------------------------------------|
| `data`         | `Record<string, any>[]`              | Data to be displayed in the table.              |
| `config`       | `TableConfig`                        | Configuration object for table styles and behavior. |
| `showItemQuantity` | `number`                          | Number of items to display per page.            |
| `onCellClick`  | `(cellData: any, row: Record<string, any>) => void` | Click handler for table cells. |

#### `Pagination` Props
| Prop                   | Type                | Description |
|------------------------|--------------------|-------------|
| `totalItems`           | `number`           | Total number of items. |
| `itemsPerPage`         | `number`           | Number of items per page. |
| `currentPage`          | `number`           | Current active page. |
| `onPageChange`         | `(page: number) => void` | Function to update the current page. |
| `onItemsPerPageChange` | `(items: number) => void` | Function to update items per page. |

---

## Example Usage

```tsx
const tableConfig: TableConfig = {
  tableClassName: "min-w-full bg-white border border-gray-200 shadow-md rounded-lg",
  tHeadClassName: "bg-darkGreen text-white border rounded-lg sticky top-0 z-10",
  tBodyClassName: "",
  trClassName: {
    class: (row) => "border-b hover:bg-gray-100 border-b-lightGreen",
  },
  thClassName: "py-2 px-4 text-left border-b cursor-pointer gap-2",
  thIconClassName: "flex flex-row items-center gap-2",
  tdClassname: "py-2 px-4",
  columns: [
    { name: "Number", keys: ["number"], sortable: true },
    { name: "Name", keys: ["product_name"], sortable: true },
  ],
  rows: {
    className: "bg-white",
  },
  emptyState: {
    text: () => "No data available",
  },
  toolbar: {
    showToolbar: true,
    toolbarClass: {
      backgroundColor: "bg-white",
      textColor: "text-black",
      borderColor: "border-gray-500",
      hoverBgColor: "hover:bg-black",
      hoverTextColor: "hover:text-white",
    },
    onSearch: (query, selectedCols) => console.log(query, selectedCols),
  },
};
```

---

## License
This project is licensed under the MIT License.

---

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

---

## Support
For any questions or support, please open an issue on GitHub.

---




