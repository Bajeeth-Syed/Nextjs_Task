"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import TableInfo from "@/components/TableInfo";
import FormPopup from "@/components/FormPopup";

export default function Home() {
  //all the state
  const [userInfo, setUserInfo] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sendData, setSendData] = useState([]);

  const [pageNumber, setPageNumber] = useState(5);
  const [pageLength, setPageLength] = useState(5);
  const [num, setNum] = useState(1);

  const [order, setOrder] = useState();

  function change(e) {
    var value1 = e.target.value;
    setSearch(value1);
    setSendData(
      userInfo.filter(
        (item) => item.name === value1 || item.language === value1
      )
    );
    console.log(value1, sendData);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/data");
      setUserInfo(response?.data); // Ensure it's an array
      setSendData(response.data.slice(0, pageLength));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:8000/data", formData);
      fetchData; // Refresh data after submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const pageSelect = async (e) => {
    let number = parseInt(e.target.value);
    setPageNumber(number);
    setPageLength(number);
    let data = userInfo.slice(0, number);
    // console.log(data);
    setSendData(data);
    setNum(1);
  };

  function NextPage() {
    let data = userInfo.slice(pageNumber, pageLength + pageNumber);
    setPageNumber(pageNumber + pageLength);
    console.log(data, pageNumber, pageLength + pageNumber);
    setSendData(data);
    setNum((pre) => pre + 1);
  }

  function prevPage() {
    if (pageNumber === userInfo.length) {
      setPageNumber(pageNumber - pageLength);
    }
    var data = userInfo.slice(pageNumber - pageLength, pageNumber);
    setPageNumber(pageNumber - pageLength);
    setSendData(data);
    setNum((prev) => prev - 1);
    console.log(data, pageNumber - pageLength, pageNumber);
  }

  //calling the func
  useEffect(() => {
    fetchData();
  }, []);

  function sortBy(e) {
    var item = e.target.value;
    console.log(item);
    // userInfo.sort((a, b) => a[item].localeCompare(b[item]));
    if (order === 1) {
      userInfo?.sort((a, b) => (a[item] > b[item] ? 1 : -1));
    } else {
      userInfo?.sort((a, b) => (a[item] > b[item] ? -1 : 1));
    }
    var data = userInfo.slice(0, pageLength);
    console.log(item, data);
    setNum(1);
    setPageNumber(pageLength);
    setSendData(data);
  }

  return (
    <div>
      <div className="search">
        <input
          type="text"
          name="search"
          id=""
          onChange={(e) => change(e)}
          value={search}
          className="inputbox"
          placeholder="Search"
        />
      </div>
      <select
        className="sort"
        onChange={(e) => {
          setOrder(e.target.value), console.log(e.target.value);
        }}
      >
        <option value="name">Sort By Order</option>
        <option value={1}>Low to High</option>
        <option value={-1}>High to Low</option>
      </select>
      <select
        name="cars"
        id="cars"
        onChange={(e) => sortBy(e)}
        className="sortBy"
      >
        <option value="name">Sort By</option>
        <option value="name">Sort By Name</option>
        <option value="language">Sort By Language</option>
      </select>
      <TableInfo data={sendData.length ? sendData : userInfo} />
      <button className="addButton" onClick={() => setShowForm(true)}>
        Add New Data
      </button>
      {showForm && (
        <FormPopup
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
      <select name="cars" id="cars" onChange={pageSelect}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
      </select>
      <button onClick={prevPage} disabled={num > 1 ? false : true}>
        Prev
      </button>
      <label for="cars">
        Page:{num} of {Math.ceil(userInfo.length / pageLength)}
      </label>
      <button
        onClick={NextPage}
        disabled={
          num === Math.ceil(userInfo.length / pageLength) ? true : false
        }
      >
        Next
      </button>
    </div>
  );
}
