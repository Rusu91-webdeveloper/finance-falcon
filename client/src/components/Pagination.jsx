import { useState } from "react";
import { Pagination } from "rsuite";

const PaginationComponent = () => {
  const [activePage, setActivePage] = useState(5);

  return (
    <>
      <Pagination
        prev
        last
        next
        first
        size="md"
        total={100}
        limit={10}
        activePage={activePage}
        onChangePage={setActivePage}
      />
    </>
  );
};

export default PaginationComponent;
