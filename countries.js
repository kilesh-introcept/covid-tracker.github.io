import { fetchData } from "./script.js";
let countries = [];
const countryListElement = document.getElementById("country-list");
const countrySearch = document.getElementById("search-input");
const countryListItem = document.getElementById("list-item");

// export function fetchCountries() {
//   fetch("https://restcountries.com/v3.1/all")
//     .then((res) => res.json())
//     .then((data) => {
//       countries = data.map((country) => country.name.common);
//       countries.sort();
//     });
// }

export function showCountry() {
  fetchData().then((data) => {
    countries = data.Countries.map((country) => country.Country);
    countries.sort();
  });
}
function loadData(data, element) {
  let innerHTML = "";
  if (countrySearch.value.length === 0) {
    element.innerHTML = "";
    return;
  }
  data.map((country) => {
    innerHTML += `<li id="list-item" value="${country}">${country}</li>`;
    // countryListItem.setAttribute("onclick", handleClick());
  });
  element.innerHTML = innerHTML;
}

function handleClick() {
  countryListItem.addEventListener("click", (e) => {
    const country = e.target.value;
    console.log(country);
  });
}

function filterData(data, searchValue) {
  return data.filter((country) => {
    return country.toLowerCase().includes(searchValue.toLowerCase());
  });
}

countrySearch.addEventListener("keyup", () => {
  const searchValue = countrySearch.value;
  const filteredCountries = filterData(countries, searchValue);
  loadData(filteredCountries, countryListElement);
});
