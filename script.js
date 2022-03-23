const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
const data = fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const covid_data = data.filter((country) => country.country === "Nepal");
    console.log(covid_data);
  })
  .catch((error) => console.log(error));
