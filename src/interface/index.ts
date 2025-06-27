import { JSX } from "react";


export type TableColumn = {
 name: string;
 keys: string[];
 sortable?: boolean;
 className?: string;
 rowclassName?: string;
 customBodyRender?: (row: any, index?: number) => JSX.Element;
};


export interface ToolbarConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
}


export type TableConfig = {
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
   toolbar? : {
    showToolbar: boolean;
    onSearch : (query: string , seletedCols:string[][]) => void
    toolbarClass: ToolbarConfig
  }
  sortConfig? : {
    key: string[] | null,
    direction: 'asc' | 'desc'
  }

};


export interface PaginatateProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  itemsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
};


export interface TableComponentProps  {
  data: Record<string, any>[];
  fullData?: Record<string, any>[];
  config: TableConfig;
  onCellClick?: (cellData: string[], row: Record<string, any>) => void;
};


