export const globalTrackerTemplate = (globalData) => {
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

export const countryTrackerTemplate = (countryData) => {
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
