import { countryTrackerTemplate } from "../template/trackerTemplate.js";

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
    // if (countrySearch.value.length === 0) {
    //   element.innerHTML = "";
    //   return;
    // }
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

  const countryData = datas.Countries.find((country) => {
    return country.Slug === selectedCountry;
  });

  countryTitle.innerHTML = `COVID-19 Tracker of ${countryData.Country}`;
  countryTrackerElement.innerHTML = countryTrackerTemplate(countryData);
};
