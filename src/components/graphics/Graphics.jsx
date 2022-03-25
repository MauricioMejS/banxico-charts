import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import "./graphics.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Graphics(respApi, openGraphs, setOpenGraphs, api) {
  ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

  let dataChart = [];
  let titleData = {};

  if (respApi.respApi !== undefined) {
    titleData = respApi.respApi.bmx.series[0].titulo;
    respApi.respApi.bmx.series[0].datos.map((resp, i) => {
      dataChart.push({
        label: resp.fecha,
        value: resp.dato,
      });

      return dataChart;
    });
  }

  const chartConfigs = {
    type: respApi.api.type,
    width: 350,
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: titleData,
        numberSuffix: "K",
        theme: "fusion",
      },
      data: dataChart,
    },
  };

  return (
    <div
      className={respApi.openGraphs === true ? "modal__display" : "modal__none"}
    >
      <div>
        <h1>Graphics</h1>
        <AiOutlineCloseCircle
          className="icon"
          size={25}
          onClick={() => respApi.setOpenGraphs(false)}
        />
      </div>

      <ReactFC className="chart" {...chartConfigs} />
    </div>
  );
}

export default Graphics;
