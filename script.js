import { globalTrackerTemplate } from "./template/trackerTemplate.js";
import { countryAutocomplete, getCountryData } from "./utils/autoComplete.js";

const url = "https://api.covid19api.com/summary";

let datas = {};
let defultCountry = "nepal";
let loading = true;

const fetchData = async () => {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      loading = false;
      datas = data;
      showData(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
fetchData();

const globalTrackerElement = document.getElementById("global-tracker");
const globalLastUpdate = document.getElementById("last-update");

const showData = async () => {
  if (loading) {
    globalTrackerElement.innerHTML = `<div>Loading...</div>`;
  }
  const globalData = datas.Global;
  globalLastUpdate.innerHTML = `Last updated: ${new Date(
    globalData.Date
  ).toDateString()}`;

  getCountryData(datas, defultCountry);

  countryAutocomplete(datas);

  globalTrackerElement.innerHTML = globalTrackerTemplate(globalData);
};
