import React from "react";

import Chart from "react-apexcharts";

export default function Graph({ data, color, height, width }) {
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
          borderRadius: 0,
          horizontal: true,
          barHeight: "50%",
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
        data: values,
      },
    ],
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width={500}
        height="600"
      />
    </div>
  );
}
