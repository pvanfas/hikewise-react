import React, { useState, useEffect } from "react";
import style from "./BarGraph.module.scss";

import Chart from "react-apexcharts";
import clsx from "clsx";

export default function BarGraph({
  data,
  color,
  title,
  horizontal,
  className,
  height,
}) {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!data) return;

    const { values, labels } = data;

    const stateUpdate = {
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
            columnWidth: "100%",
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
            rotate: -45,
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

    setState(stateUpdate);
  }, [data]);

  return (
    <div className={clsx(style.wrapper, className)}>
      <div className={style.title}>{title}</div>
      {state && (
        <div className={style.chartWrapper}>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            height={height}
          />
        </div>
      )}
    </div>
  );
}
