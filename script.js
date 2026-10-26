const input = document.querySelector("#countryInput");
const button = document.querySelector("#searchBtn");
const result = document.querySelector("#result");

button.addEventListener("click", searchCountry);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchCountry();
});

function searchCountry() {
  const countryName = input.value.trim();

  if (!countryName) {
    result.innerHTML = `<p class="error">Please enter a country name</p>`;
    return;
  }

  getCountryData(countryName);
}

async function getCountryData(country) {
  result.innerHTML = `<p>Loading...</p>`;

  try {
    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/info?returns=flag,capital`
    );

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Could not get countries data");
    }

    const found = data.data.find((item) =>
      item.name.toLowerCase() === country.toLowerCase()
    );

    if (!found) {
      throw new Error("Country not found");
    }

    showCountryInfo(found);

  } catch (error) {
    result.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

function showCountryInfo(country) {
  const name = country.name || "Unknown";
  const flag = country.flag || "";
  const capital = country.capital || "Unknown";

  result.innerHTML = `
    <h2>${name}</h2>
    ${flag ? `<img src="${flag}" alt="Flag of ${name}" style="width:150px; margin:15px 0;">` : ""}
    <p><strong>Capital:</strong> ${capital}</p>
  `;
}