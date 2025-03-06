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

## Usage

### Importing Components
```tsx
import { TableComponent, Pagination } from "react-table-pagination-v1";
```

### Example Usage
```tsx
import React, { useState } from "react";
import { TableComponent, Pagination } from "react-table-pagination-v1";

const ProductTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const data = [...yourData];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const tableConfig: TableConfig = {
    tableClassName: "min-w-full bg-white border border-gray-200 shadow-md rounded-lg",
    tHeadClassName: "bg-darkGreen text-white border rounded-lg sticky top-0 z-10",
    thClassName: "py-2 px-4 text-left border-b cursor-pointer gap-2",
    trClassName: {
      class: () => "border-b hover:bg-gray-100 border-b-lightGreen",
    },
    thIconClassName: "flex flex-row items-center gap-2",
    tBodyClassName: "",
    tdClassname: "py-2 px-4",
    showItemQuantity: 20,
    columns: [
      { name: "Number", keys: ["number"], sortable: true },
      { name: "Name", keys: ["product_name"], sortable: true },
    ],
    emptyState: {
      text: () => "No data available",
    },
  };

  return (
    <div>
      <TableComponent data={currentItems} config={tableConfig} showItemQuantity={itemsPerPage} />
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

export default ProductTable;
```

---

## TableConfig Interface
The `TableConfig` interface defines the structure for configuring the table's appearance and behavior.

### Properties

| Property          | Type                                      | Description |
|------------------|-----------------------------------------|-------------|
| `tableClassName`  | `string`                                | CSS classes for the table element. |
| `tHeadClassName`  | `string`                                | CSS classes for the table header (`<thead>`). |
| `thClassName`     | `string`                                | CSS classes for table header (`<th>`). |
| `trClassName`     | `{ class: () => string }`              | Function returning CSS classes for each row (`<tr>`). |
| `thIconClassName` | `string`                                | CSS classes for header icons. |
| `tBodyClassName`  | `string`                                | CSS classes for table body (`<tbody>`). |
| `tdClassname`     | `string`                                | CSS classes for table data cells (`<td>`). |
| `showItemQuantity` | `number`                               | Number of items to display per page. |
| `columns`         | `TableColumn[]`                         | Array defining column headers and associated data keys. |
| `emptyState`      | `{ text: () => string; }`              | Configuration for the empty state message when no data is available. |

---

## TableColumn Interface
The `TableColumn` interface defines the structure for each column in the table.

### Properties

| Property          | Type                                      | Description |
|------------------|-----------------------------------------|-------------|
| `name`           | `string`                                | Display name of the column in the table header. |
| `keys`           | `string[]`                              | Keys from the data object mapped to this column. |
| `sortable`       | `boolean?`                              | (Optional) Enables sorting for this column. |
| `className`      | `string?`                               | (Optional) CSS classes for the column header. |
| `rowclassName`   | `string?`                               | (Optional) CSS classes for the row data in this column. |
| `customBodyRender` | `(row: any, index?: number) => JSX.Element?` | (Optional) Custom rendering function for column content. |

#### Example
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

## Props
### TableComponent Props
| Prop            | Type                                  | Description                                     |
|----------------|--------------------------------------|-------------------------------------------------|
| `data`         | `Record<string, any>[]`              | Data to be displayed in the table.              |
| `config`       | `TableConfig`                        | Configuration object for table styles and behavior. |
| `showItemQuantity` | `number`                          | Number of items to display per page.            |
| `onCellClick`  | `(cellData: any, row: Record<string, any>) => void` | Click handler for table cells. |

### Pagination Props
| Prop                   | Type                | Description |
|------------------------|--------------------|-------------|
| `totalItems`           | `number`           | Total number of items. |
| `itemsPerPage`         | `number`           | Number of items per page. |
| `currentPage`          | `number`           | Current active page. |
| `onPageChange`         | `(page: number) => void` | Function to update the current page. |
| `onItemsPerPageChange` | `(items: number) => void` | Function to update items per page. |

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


