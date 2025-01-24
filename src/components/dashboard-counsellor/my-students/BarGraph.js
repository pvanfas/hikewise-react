import React from "react";
import style from "./BarGraph.module.scss";

import Chart from "react-apexcharts";

export default function BarGraph({
  data,
  color,
  title,
  horizontal,
  height,
  barHeight,
}) {
  const { values, labels } = data;
  let maxValue = 0;
  values.forEach((item) => {
    if (item > maxValue) maxValue = item;
  });

  const state = {
    options: {
      chart: {
        type: "bar",

        animations: {
          enabled: false,
        },

        toolbar: {
          tools: {
            download: false,
          },
        },
      },
      grid: {
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: false,
          },
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: horizontal,
          borderRadius: 0,
          columnWidth: "40%",
          barHeight: barHeight ? `${barHeight}%` : "70%",
        },
      },

      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: labels,
        min: 0,
        max: 9,
        tickAmount: 9,
        labels: {
          trim: false,
          rotate: -90,
        },
      },

      yaxis: {
        labels: {
          show: true,
          trim: false,
          maxWidth: 250,
        },
      },

      colors: [color],
    },
    series: [
      {
        name: "score",
        data: values,
      },
    ],
  };

  return (
    <div
      className={style.wrapper}
      style={horizontal ? { maxWidth: "100%", width: "100%" } : {}}
    >
      <div className={style.title}>{title}</div>
      <div className={style.chartWrapper}>
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          height={height}
        />
      </div>
    </div>
  );
}
