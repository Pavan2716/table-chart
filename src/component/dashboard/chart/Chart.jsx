/* eslint-disable react/prop-types */
import "./Chart.css";
import Plot from "react-plotly.js";

function Chart({ xData = [], yData = [], lables = [] }) {
  return (
    <div className="chart">
      {xData && (
        <Plot
          data={[
            {
              type: "bar",
              x: xData,
              y: yData,
              text: lables,
              marker: { color: "var(--blue-color)" },
            },
          ]}
          layout={{
            width: 600,
            height: 600,
            title: "User Age Plot",
            xaxis: {
              tickangle: 45,
            },
            yaxis: {
              zeroline: false,
              gridwidth: 2,
            },
            bargap: 0.05,
          }}
        />
      )}
    </div>
  );
}

export default Chart;
