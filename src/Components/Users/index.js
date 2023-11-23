import "./Users.css";

import Footer from "../Footer";
import React, { useEffect, useState, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditDetails from "../EditDetails";


let Users = ({apiCall}) => {
  
  let [data, setData] = useState("");
  let [dataPerPage, setDataPerPage] = useState("");
  let [updateUser, setUpdateUser] = useState(-1);
  let [isMarked, setIsMarked] = useState([]);
  let [markAll, setMarkAll] = useState();



  useEffect(() => {
    (async () => {
      const users = await apiCall();
      setData(users);
    })();
  }, []);
  

  const handleUserData = useCallback((data, startIdx, endIdx) => {
    setDataPerPage(data.slice(startIdx, endIdx));
  }, []);

  const handleSearch = (e) => {
    let apiData = JSON.parse(localStorage.getItem("Data"));
    const value = e.target.value;
    const resultData = apiData.filter(
      (ele) =>
        ele.name.includes(value) ||
        ele.email.includes(value) ||
        ele.role.includes(value)
    );

    setData(resultData);
  };

  const handleSubmit = (e) => {
    let apiData = JSON.parse(localStorage.getItem("Data"));
    let modified = apiData.map((val1) => {
      let obj = val1;
      data.forEach((val2) => {
        if (val1.id === val2.id) {
          return (obj = { ...val2 });
        }
      });
      return obj;
    });
    localStorage.setItem("Data", JSON.stringify(modified));
    e.preventDefault();
    setUpdateUser(-1);
  };

  const handleChange = (e, id) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      markAll ? setMarkAll(false) : setMarkAll(true);
      let newData = dataPerPage.map((value) => ({
        ...value,
        isChecked: checked,
      }));
      setDataPerPage(newData);
      if (checked) {
        dataPerPage.forEach((element) => {
          isMarked.push(element.id);
        });
      } else {
        setIsMarked([]);
      }
    } else {
      setMarkAll(false);
      let newData = dataPerPage.map((value) =>
        value.name === name ? { ...value, isChecked: checked } : value
      );
      setDataPerPage(newData);
      if (checked) {
        isMarked.push(id);
      } else {
        let newMarkedArr = isMarked.filter((val) => val !== id);
        setIsMarked(newMarkedArr);
      }
    }
  };
  //console.log(markAll);

  const handleDelete = (id) => {
    let apiData = JSON.parse(localStorage.getItem("Data"));
    let indexAtStorage = apiData.findIndex((value) => value.id === id);
    apiData.splice(indexAtStorage, 1);
    localStorage.setItem("Data", JSON.stringify(apiData));
    let newData = [...data];
    let index = newData.findIndex((value) => value.id === id);
    newData.splice(index, 1);
    setData(newData);
  };

  const dataAfterDelete = () => {
    let apiData = JSON.parse(localStorage.getItem("Data"));
    //console.log(isMarked);
    isMarked.forEach((val1) => {
      let index = apiData.findIndex((val2) => val1 === val2.id);
      apiData.splice(index, 1);
      // console.log(index);
    });
    //console.log(apiData);
    localStorage.setItem("Data", JSON.stringify(apiData));
  };

  const handleDeleteMarked = (e) => {
    //console.log("clicked on delete selected.");
    dataAfterDelete();
    setMarkAll(false);
    let newArr = data.filter((val) => {
      return !isMarked.includes(val.id);
    });
    setData(newArr);
    setIsMarked([]);
    //console.log(data);
  };

  return (
    <div>
      <input
        className="search-bar"
        placeholder="Search by name, email or role"
        onChange={handleSearch}
      />
      {dataPerPage.length ? (
        <form onSubmit={handleSubmit}>
          <table className="table">
            <tbody>
              <tr className="table-head-row">
                <th>
                  <input
                    type="checkbox"
                    name="selectAll"
                    checked={markAll}
                    onClick={handleChange}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
              {dataPerPage.map((value) => {
                return (
                  <tr className="table-data-row" key={value.id}>
                    {updateUser === value.id ? (
                      <EditDetails
                        usersData={data}
                        personData={value}
                        setData={setData}
                      />
                    ) : (
                      <>
                        <th>
                          <input
                            type="checkbox"
                            name={value.name}
                            value={value.id}
                            checked={value ? value.isChecked : false}
                            onClick={(e) => handleChange(e, value.id)}
                          />
                        </th>
                        <th>{value.name}</th>
                        <th>{value.email}</th>
                        <th>{value.role}</th>
                        <th>
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={(e) => {
                              setUpdateUser(value.id);
                            }}
                          >
                            <EditNoteIcon padding="1px" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={(e) => {
                              handleDelete(value.id);
                            }}
                          >
                            <DeleteOutlinedIcon
                              fontSize="small"
                              style={{ color: "red" }}
                            />
                          </IconButton>
                        </th>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      ) : (
        <div className="data-not-found">
          No data found! Please Reload the page and Search Again
        </div>
      )}
      <Footer
        usersData={data}
        dataHandler={handleUserData}
        setUserData={setData}
        handleDelete={handleDeleteMarked}
      ></Footer>
    </div>
  );
};

export default Users;
