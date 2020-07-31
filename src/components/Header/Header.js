import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./Header.css";

const baseURL = "https://disease.sh/v3/covid-19";

function Header(props) {
  const { countries, country, countryInfo, onCountryChange } = props;
  // useEffect(() => {
  //   // fetch API call to get countries
  //   const getCountries = async () => {
  //     const res = await fetch(`${baseURL}/countries`);
  //     const countryData = await res.json();
  //     const countries = countryData.map((country) => ({
  //       name: country.country,
  //       value: country.countryInfo.iso2,
  //     }));
  //     setCountries(countries);
  //   };
  //   getCountries();
  // }, []);

  // useEffect(() => {
  //   const url = `${baseURL}/all`;
  //   onCountryChange(url, "worldwide");
  // }, []);

  const handleCountryChange = async (e) => {
    const countryCode = e.target.value;

    // fetch API to get cases based on country code
    const url =
      countryCode === "worldwide"
        ? `${baseURL}/all`
        : `${baseURL}/countries/${countryCode}`;

    onCountryChange(url, countryCode);
  };
  return (
    <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={country}
          onChange={handleCountryChange}
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
