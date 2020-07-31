import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table(props) {
  const { countriesData } = props;
  console.log(countriesData);
  return (
    <div className="table">
      {countriesData.map(({ country, cases }) => (
        <tr className="table__row">
          <td className="table__data__left">{country}</td>
          <td className="table__data__right">
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
