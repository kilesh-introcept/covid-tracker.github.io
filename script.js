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
    });
};
fetchData();

const globalTrackerElement = document.getElementById("global-tracker");
const globalLastUpdate = document.getElementById("global-last-update");

const showData = async () => {
  if (!loading) {
    const globalData = datas.Global;
    globalLastUpdate.innerHTML = `Last updated: ${new Date(
      globalData.Date
    ).toDateString()}`;

    getCountryData(datas, defultCountry);

    countryAutocomplete(datas);

    globalTrackerElement.innerHTML = globalTrackerTemplate(globalData);
  }
};
