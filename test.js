import { showCountry } from "./countries.js";

// const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
const url = "https://api.covid19api.com/summary";

let covidData;

const globalTrackerElement = document.getElementById("global-tracker");
const countryTrackerElement = document.getElementById("country-tracker");

const globalLastUpdate = document.getElementById("global-last-update");

export const fetchData = async () => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const showData = async () => {
  covidData = await fetchData();
  const globalData = covidData.Global;
  console.log(covidData);

  globalLastUpdate.innerHTML = `Last updated: ${new Date(
    globalData.Date
  ).toDateString()}`;

  const globalTrackerTemplate = `
    <div data-card="confirm" class="card">
              <div  id="test" class="card-title">Total Confirmed</div>
              <div class="card-value">${globalData.TotalConfirmed.toLocaleString(
                "en-us"
              )}</div>
              <div class="increasedBy">+${globalData.NewConfirmed.toLocaleString(
                "en-us"
              )}</div>
            </div>
            <div data-card="deaths" class="card">
              <div class="card-title">Total Deaths</div>
              <div class="card-value">${globalData.TotalDeaths.toLocaleString(
                "en-us"
              )}</div>
              <div class="increasedBy">+${globalData.NewDeaths.toLocaleString(
                "en-us"
              )}</div>
            </div>
            <div data-card="recovered" class="card">
              <div class="card-title">Total Recovered</div>
              <div class="card-value">${globalData.TotalRecovered.toLocaleString(
                "en-us"
              )}</div>
              <div class="increasedBy">+${globalData.NewRecovered.toLocaleString(
                "en-us"
              )}</div>
            </div> 
    `;

  const countryData = covidData.Countries.find((country) => {
    return country.Slug === "nepal";
  });
  console.log(countryData);
  const countryTrackerTemplate = `
      <div data-card="confirm" class="card">
      <div  id="test" class="card-title">Total Confirmed</div>
      <div class="card-value">${countryData.TotalConfirmed.toLocaleString(
        "en-us"
      )}</div>
      <div class="increasedBy">+${countryData.NewConfirmed.toLocaleString(
        "en-us"
      )}</div>
      </div>
      <div data-card="deaths" class="card">
      <div class="card-title">Total Deaths</div>
      <div class="card-value">${countryData.TotalDeaths.toLocaleString(
        "en-us"
      )}</div>
      <div class="increasedBy">+${countryData.NewDeaths.toLocaleString(
        "en-us"
      )}</div>
      </div>
      <div data-card="recovered" class="card">
      <div class="card-title">Total Recovered</div>
      <div class="card-value">${countryData.TotalRecovered.toLocaleString(
        "en-us"
      )}</div>
      <div class="increasedBy">+${countryData.NewRecovered.toLocaleString(
        "en-us"
      )}</div>
      </div> 
  `;

  countryTrackerElement.innerHTML = countryTrackerTemplate;

  globalTrackerElement.innerHTML = globalTrackerTemplate;
};

showData();

showCountry();
