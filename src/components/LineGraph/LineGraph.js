import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./LineGraph.css";

const options = {
  legend: { display: false },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0.0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
        ticks: {
          fontColor: "#fff",
        },
      },
    ],
    yAxes: [
      {
        gridLines: { display: false },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
          fontColor: "#fff",
        },
      },
    ],
  },
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
      const dataPoint = data[casesType][date];
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: dataPoint - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = dataPoint;
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((res) => res.json())
        .then((data) => {
          const chartData = buildChartData(data, casesType);
          console.log(chartData);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);
  return (
    <div>
      <span className="graph__header">Worldwide new {casesType}</span>
      {data?.length > 0 && (
        <div className="graph__container">
          <Line
            options={options}
            data={{
              datasets: [
                {
                  backgroundColor: "rgba(204,16,52,0.4)",
                  borderColor: "#CC1034",
                  data,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LineGraph;
