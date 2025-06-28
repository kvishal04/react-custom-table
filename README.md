# React Table Component with Pagination

## Overview

This React library provides a customizable and responsive table component with built-in pagination, sorting, and search capabilities. It allows users to display structured tabular data with high flexibility.

## Features

* ✅ Customizable table structure and style via classNames
* ✅ Sortable columns (including nested fields)
* ✅ Search toolbar with column selection support
* ✅ Custom cell renderers with full JSX support
* ✅ Dynamic row styling
* ✅ Empty state handling
* ✅ Pagination with items-per-page controls

---

## Installation

Install the package using npm:

```sh
npm i react-table-pagination-v1
```

Or using yarn:

```sh
yarn add react-table-pagination-v1
```

---

## Quick Example

```tsx
import { TableComponent, Pagination } from "react-table-pagination-v1";

<TableComponent data={data} config={config} />
<Pagination
  totalItems={data.length}
  itemsPerPage={10}
  currentPage={1}
  onPageChange={() => {}}
  onItemsPerPageChange={() => {}}
/>
```

---

## Pagination Configuration Examples

### Basic Pagination Setup

```tsx
<Pagination
  totalItems={100}
  itemsPerPage={10}
  currentPage={1}
  onPageChange={(page) => console.log("Page:", page)}
  onItemsPerPageChange={(items) => console.log("Items per page:", items)}
/>
```

### Custom Items Per Page Options

```tsx
<Pagination
  totalItems={250}
  itemsPerPage={24}
  currentPage={3}
  itemsPerPageOptions={[24, 48, 96]}
  onPageChange={handlePageChange}
  onItemsPerPageChange={handleItemsPerPageChange}
/>
```

---

## TableConfig Reference

### Properties:

* **tableClassName**: CSS classes for the table element.
* **tHeadClassName**: CSS classes for the table header (`<thead>`).
* **tBodyClassName**: CSS classes for table body (`<tbody>`).
* **trClassName**: Function returning a dynamic class for each row.
* **thClassName**: CSS classes for table header (`<th>`).
* **thIconClassName**: CSS classes for header icons.
* **tdClassname**: CSS classes for table data cells (`<td>`).
* **columns**: Array defining column headers and associated data keys.
* **rows**: CSS class configuration for rows.
* **emptyState**: Function returning the text to display when no data is available.
* **toolbar?**: Configuration for the toolbar, including search functionality.
* **sortConfig?**: Optional object defining default sort key and direction.

### Full Feature Example

```ts
const fullFeatureConfig = {
  tableClassName: "min-w-full border border-gray-300",
  tHeadClassName: "bg-indigo-600 text-white",
  tBodyClassName: "",
  trClassName: {
    class: (row) => (row.status === "inactive" ? "bg-gray-100" : ""),
  },
  thClassName: "px-4 py-2 text-left",
  thIconClassName: "inline ml-1",
  tdClassname: "px-4 py-2 border-t",
  columns: [
    {
      name: "User",
      keys: ["user", "name"],
      sortable: true,
      className: "text-blue-600",
      customBodyRender: (row) => <span className="font-medium">{row.user.name}</span>,
    },
    {
      name: "Email",
      keys: ["user", "email"],
      sortable: false,
    },
    {
      name: "Status",
      keys: ["status"],
      sortable: true,
      customBodyRender: (row) => (
        <span className={row.status === "active" ? "text-green-500" : "text-red-500"}>{row.status}</span>
      ),
    },
    {
      name: "Registered At",
      keys: ["registered_at"],
      sortable: true,
    },
  ],
  rows: { className: "" },
  emptyState: {
    text: () => "No users found.",
  },
  toolbar: {
    showToolbar: true,
    onSearch: (query, selectedCols) => console.log(query, selectedCols),
    toolbarClass: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
      borderColor: "#cccccc",
      hoverBgColor: "#f1f5f9",
      hoverTextColor: "#111827",
    },
  },
  sortConfig: {
    key: ["user", "name"],
    direction: "asc",
  },
};
```

### Minimal Config

```ts
const minimalConfig = {
  tableClassName: "table-auto",
  tHeadClassName: "bg-gray-100",
  tBodyClassName: "",
  trClassName: { class: () => "" },
  thClassName: "text-left p-2",
  thIconClassName: "",
  tdClassname: "p-2",
  columns: [
    { name: "Name", keys: ["name"] },
    { name: "Age", keys: ["age"] },
  ],
  rows: { className: "" },
  emptyState: { text: () => "Nothing to show" },
};
```

### Custom Cell Render with Toolbar

```ts
const renderToolbarConfig = {
  tableClassName: "min-w-full",
  tHeadClassName: "bg-gray-800 text-white",
  tBodyClassName: "",
  trClassName: { class: () => "" },
  thClassName: "p-2",
  thIconClassName: "",
  tdClassname: "p-2",
  columns: [
    {
      name: "Status",
      keys: ["status"],
      sortable: true,
      customBodyRender: (row) => <span>{row.status.toUpperCase()}</span>,
    },
    {
      name: "Score",
      keys: ["score"],
      sortable: true,
    },
  ],
  rows: { className: "" },
  emptyState: { text: () => "Empty table" },
  toolbar: {
    showToolbar: true,
    onSearch: (query, selectedCols) => console.log(query, selectedCols),
    toolbarClass: {
      backgroundColor: "#fff",
      textColor: "#333",
      borderColor: "#ddd",
      hoverBgColor: "#eee",
      hoverTextColor: "#000",
    },
  },
};
```

---

## License

MIT

---

## Contributing

PRs and suggestions are welcome!

---

## Support

For bugs or questions, raise an issue in the GitHub repo.
