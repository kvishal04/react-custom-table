import { JSX } from "react";


export type TableColumn = {
 name: string;
 keys: string[];
 sortable?: boolean;
 className?: string;
 rowclassName?: string;
 customBodyRender?: (row: any, index?: number) => JSX.Element;
};




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
   showItemQuantity: number;
   columns: TableColumn[];
   rows: {
     className: string;
   };
   emptyState: {
     text: () => string;
   };
};
