import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = ({ totalPages = 1, currentPage, setPage }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages > 0 ? totalPages : 1).keys()].map((x) => (
        <Pagination.Item
          key={x + 1}
          active={x + 1 === currentPage}
          onClick={() => handlePageChange(x + 1)}
        >
          {x + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default Paginate;
