const LineChart = (datas) => {
  let myChart = document.getElementById("myChart").getContext("2d");

  let datesArr = datas.map((data) => {
    const dateFormat = new Date(data.Date);
    return (
      dateFormat.toLocaleString("default", { month: "short" }) +
      " " +
      dateFormat.getDate()
    );
  });

  let confirmedArr = datas.map((data) => {
    return data.Confirmed;
  });

  let deathsArr = datas.map((data) => {
    return data.Deaths;
  });

  let recoveredArr = datas.map((data) => {
    return data.Recovered;
  });

  let barChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: datesArr,
      datasets: [
        {
          label: "Total Confirmed",
          data: confirmedArr,
          backgroundColor: ["#ff0000", "#ff0000", "#ff0000"],
          borderWidth: 1,
        },
        {
          label: "Total Recovered",
          data: recoveredArr,
          backgroundColor: ["#00ff00", "#00ff00", "#00ff00"],
          borderWidth: 1,
        },
        {
          label: "Total Deaths",
          data: deathsArr,
          backgroundColor: ["#0000ff", "#0000ff", "#0000ff"],
          borderWidth: 1,
        },
      ],
    },
  });
};

export default LineChart;
