import React from "react";

type PaginationProps = {
 totalItems: number;
 itemsPerPage: number;
 currentPage: number;
 onPageChange: (page: number) => void;
 onItemsPerPageChange: (items: number) => void;
};


const Pagination: React.FC<PaginationProps> = ({
 totalItems,
 itemsPerPage,
 currentPage,
 onPageChange,
 onItemsPerPageChange,
}) => {
 const totalPages = Math.ceil(totalItems / itemsPerPage);
 const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
 const itemsPerPageOptions = [24, 48, 72, 96];


 return (
   <div className="text-center">
     {/* Pagination Controls */}
     <ul className="inline-flex gap-x-3 text-grey-900 mb-1.5">
       <li
         className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        
       >
         <button type="button" onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>
             &lt; Previous
         </button>
       
       </li>
       {pageNumbers.map((number) => (
         <li
           key={number}
           className={`cursor-pointer ${currentPage === number ? "font-bold" : ""}`}
         >
            <button type="button" onClick={() => onPageChange(number)}>
             {number}
           </button>
         
         </li>
       ))}
       <li
         className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
       >
          <button type="button" onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}>
               Next &gt;
           </button>
       
       </li>
     </ul>
     {/* Items Per Page */}
     <p>
       Show {" "}
       {itemsPerPageOptions.map((option, index) => (
         <button
           type="button"
           key={option}
           className={`cursor-pointer mx-1 ${itemsPerPage === option ? "font-bold" : ""}`}
           onClick={() => onItemsPerPageChange(option)}
         >
           {option}
           {index !== itemsPerPageOptions.length - 1 && " / "}
         </button>
       ))}
       {" "}per page
     </p>
   </div>
 );
};


export default Pagination;
