import { countryTrackerTemplate } from "../template/trackerTemplate.js";
import LineChart from "../charts/linechart.js";

export const countryAutocomplete = async (datas) => {
  window.handleClick = (country) => {
    getCountryData(datas, country);
    countrySearch.value = "";
    countryListElement.innerHTML = "";
  };

  const countryListElement = document.getElementById("country-list");
  const countrySearch = document.getElementById("search-input");

  //loading data in the autocomplete list
  const loadData = (data, element) => {
    let innerHTML = "";

    if (data.length === 0) {
      innerHTML = `<li id="list-item" 
  
     >No country found
    </li>`;
    }
    data.map((country) => {
      innerHTML += `
        <li id="list-item" 
          onclick="handleClick('${country.Slug}')" 
          value="${country.Slug}">${country.Country}
        </li>`;
    });
    element.innerHTML = innerHTML;
  };

  //filtering the data in the autocomplete list
  function filterData(data, searchValue) {
    return data.filter((country) => {
      return country.Country.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  countrySearch.addEventListener("click", () => {
    loadData(datas.Countries, countryListElement);
  });
  document.onclick = (e) => {
    if (e.target.id !== "list-item") {
      countryListElement.innerHTML = "";
    }
  };

  countrySearch.addEventListener("keyup", () => {
    loadData(
      filterData(datas.Countries, countrySearch.value),
      countryListElement
    );
  });
};

//getting country data
export const getCountryData = async (datas, selectedCountry) => {
  const countryTrackerElement = document.getElementById("country-tracker");
  const countryTitle = document.getElementById("country-title");
  const dataSwitch = document.getElementById("data-switch");

  const countryData = datas.Countries.find((country) => {
    return country.Slug === selectedCountry;
  });

  const toDate = new Date(datas.Date).setUTCHours(0, 0, 0, 0);

  const prevweek = () => {
    var today = new Date();
    var prevweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 6
    );
    return prevweek;
  };

  const fromDate = prevweek().toISOString();
  console.log(selectedCountry);

  //fetching data of 7 days for chart

  const url = `https://api.covid19api.com/country/${selectedCountry}?from=${fromDate}&to=${toDate}`;
  const multiDaysData = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  countryTitle.innerHTML = `COVID-19 Tracker of ${countryData.Country}`;
  countryTrackerElement.innerHTML = countryTrackerTemplate(countryData);

  LineChart(multiDaysData);
};
