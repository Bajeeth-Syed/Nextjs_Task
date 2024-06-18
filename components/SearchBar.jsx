import React, { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  function change(e) {
    var value = e.target.value;
    setSearch(value);
  }
  return (
    <input
      type="text"
      name="search"
      id=""
      onChange={(e) => change(e)}
      value={search}
    />
  );
}
