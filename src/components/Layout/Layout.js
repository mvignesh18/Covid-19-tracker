import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import InfoBox from "../InfoBox/InfoBox";
import Map from "../Map/Map";
import Table from "../Table/Table";
import "./Layout.css";
import { Card, CardContent } from "@material-ui/core";
import { sortData, prettyPrintStat } from "../../utils";
import LineGraph from "../LineGraph/LineGraph";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

const baseURL = "https://disease.sh/v3/covid-19";

function Layout() {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    // fetch API call to get countries
    const getCountries = async () => {
      const res = await fetch(`${baseURL}/countries`);
      const countryData = await res.json();
      const countries = countryData.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortData(countryData);
      setTableData(sortedData);
      setMapCountries(countryData);
      setCountries(countries);
    };
    getCountries();
  }, []);

  useEffect(() => {
    const url = `${baseURL}/all`;
    onCountryChange(url, "worldwide");
  }, []);

  // This will later be moved to Context provider as this is not needed here.
  // Logic required only in Header.js
  const onCountryChange = async (url, countryCode) => {
    const res = await fetch(url);
    const data = await res.json();
    setCountry(countryCode);
    setCountryInfo(data);
    if (data.countryInfo) {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    }
  };

  return (
    <div className="layout">
      <Header
        countries={countries}
        country={country}
        countryInfo={countryInfo}
        onCountryChange={onCountryChange}
      />

      <div className="layout__content">
        <div className="layout__left">
          <div className="layout__infoBoxContainer">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={() => setCasesType("cases")}
              title="No. of Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0.0a")}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={() => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0.0a")}
            />
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={() => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0.0a")}
            />
          </div>
          <div>
            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
        </div>
        <Card className="layout__right">
          {/* <Card> */}
          <CardContent className="layout__countriesCardContent">
            <div>
              <span className="layout__liveCases">Live Cases by Country</span>
              <Table countriesData={tableData} />
            </div>
          </CardContent>
          {/* </Card> */}
          <div className="layout__graph">
            <LineGraph casesType={casesType} />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Layout;
