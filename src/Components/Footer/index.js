import React, { useEffect, useState } from "react";
import "./Footer.css";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

let Footer = ({ usersData, dataHandler, handleDelete }) => {
  let usersCountPerPage = 10;
  let noOfPages = Math.ceil(usersData.length / usersCountPerPage);
  let [page, setPage] = useState(1);
  //console.log(usersData);
  //console.log(noOfPages);
  useEffect(() => {
    dataHandler(
      usersData,
      page * usersCountPerPage - usersCountPerPage,
      page * usersCountPerPage
    );
  }, [usersData]);

  const handleChange = (event, value) => {
    setPage(value);
    dataHandler(
      usersData,
      value * usersCountPerPage - usersCountPerPage,
      value * usersCountPerPage
    );
  };

  return (
    <div className="footer">
      <Button
        variant="contained"
        className="delete-selected"
        onClick={handleDelete}
      >
        Delete Selected
      </Button>
      <Pagination
        className="page-numbers"
        count={noOfPages}
        page={page}
        showFirstButton
        showLastButton
        onChange={handleChange}
      />
    </div>
  );
};

export default Footer;
