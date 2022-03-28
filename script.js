const url = "https://api.covid19api.com/summary";
let datas = {};
let loading = true;
const fetchData = async () => {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      loading = false;
      datas = data;
      showData(data);
      console.log(data);
    });
};
fetchData();

const globalTrackerTemplate = (globalData) => {
  return `
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
};

const countryTrackerTemplate = (countryData) => {
  return `
  <div data-card="confirm" class="card">
  <div  id="test" class="card-title">Total Confirmed</div>
  <div class="card-value">${countryData?.TotalConfirmed.toLocaleString(
    "en-us"
  )}</div>
  <div class="increasedBy">+${countryData?.NewConfirmed.toLocaleString(
    "en-us"
  )}</div>
  </div>
  <div data-card="deaths" class="card">
  <div class="card-title">Total Deaths</div>
  <div class="card-value">${countryData?.TotalDeaths.toLocaleString(
    "en-us"
  )}</div>
  <div class="increasedBy">+${countryData?.NewDeaths.toLocaleString(
    "en-us"
  )}</div>
  </div>
  <div data-card="recovered" class="card">
  <div class="card-title">Total Recovered</div>
  <div class="card-value">${countryData?.TotalRecovered.toLocaleString(
    "en-us"
  )}</div>
  <div class="increasedBy">+${countryData?.NewRecovered.toLocaleString(
    "en-us"
  )}</div>
  </div> 
`;
};

const globalTrackerElement = document.getElementById("global-tracker");
const countryTrackerElement = document.getElementById("country-tracker");
const countryTitle = document.getElementById("country-title");
const globalLastUpdate = document.getElementById("global-last-update");

const getCountryData = async (selectedCountry) => {
  const countryData = datas.Countries.find((country) => {
    return country.Country === selectedCountry;
  });
  countryTitle.innerHTML = `COVID-19 Tracker of ${selectedCountry}`;
  countryTrackerElement.innerHTML = countryTrackerTemplate(countryData);
};

const showData = async () => {
  if (!loading) {
    const globalData = datas.Global;
    globalLastUpdate.innerHTML = `Last updated: ${new Date(
      globalData.Date
    ).toDateString()}`;

    getCountryData("Nepal");

    const countries = datas.Countries.map((country) => {
      return country.Country;
    });

    countryAutocomplete(countries);

    globalTrackerElement.innerHTML = globalTrackerTemplate(globalData);
  }
};

const countryAutocomplete = async (countries) => {
  window.handleClick = (country) => {
    getCountryData(country);
    countrySearch.value = "";
    countryListElement.innerHTML = "";
  };

  const countryListElement = document.getElementById("country-list");
  const countrySearch = document.getElementById("search-input");

  const loadData = (data, element) => {
    let innerHTML = "";
    if (countrySearch.value.length === 0) {
      element.innerHTML = "";
      return;
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

  function filterData(data, searchValue) {
    return data.filter((country) => {
      return country.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  countrySearch.addEventListener("input", () => {
    loadData(filterData(countries, countrySearch.value), countryListElement);
  });
};
