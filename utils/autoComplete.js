import { countryTrackerTemplate } from "../template/trackerTemplate.js";

export const countryAutocomplete = async (datas, countries) => {
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
          onclick="handleClick('${country}')" 
          value="${country}">${country}
        </li>`;
    });
    element.innerHTML = innerHTML;
  };

  //filtering the data in the autocomplete list
  function filterData(data, searchValue) {
    return data.filter((country) => {
      return country.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  countrySearch.addEventListener("click", () => {
    loadData(countries, countryListElement);
  });
  document.onclick = (e) => {
    if (e.target.id !== "list-item") {
      countryListElement.innerHTML = "";
    }
  };

  countrySearch.addEventListener("keyup", () => {
    loadData(filterData(countries, countrySearch.value), countryListElement);
  });
};

//getting country data
export const getCountryData = async (datas, selectedCountry) => {
  const countryTrackerElement = document.getElementById("country-tracker");
  const countryTitle = document.getElementById("country-title");

  const countryData = datas.Countries.find((country) => {
    return country.Country === selectedCountry;
  });

  // // const url =
  // //   `https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`;
  // // const countryData = await fetch(url)
  // //   .then((res) => res.json())
  // //   .then((data) => {
  // //     return data;
  // //   });
  // console.log(countryData);

  countryTitle.innerHTML = `COVID-19 Tracker of ${selectedCountry}`;
  countryTrackerElement.innerHTML = countryTrackerTemplate(countryData);
};
