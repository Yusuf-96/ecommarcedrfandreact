import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getAllReport } from "../service/ReportApiCalls";

const ChartUi = () => {
  const [datas, setData] = useState([]);

  const getMontReport = async () => {
    let response = await getAllReport();

    if (response.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getMontReport();
  }, []);

  const getChartData = () => {
    return {};
  };

  let data = {
    options: {
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },

      dataLabels: {
        enabled: false,
      },

      title: {
        text: "Sales 2022",
      },
      xaxis: {
        categories: [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ],
        labels: {
          rotate: -45,
          rotateAlways: true,
        },
      },
    },
    series: [
      {
        name: "total",
        data: datas.day_items && datas.day_items.map((d) => d.total),
      },
    ],
  };
  return (
    <>
      <Chart options={data.options} series={data.series} type="bar" />
    </>
  );
};

export default ChartUi;
