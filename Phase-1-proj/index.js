const sliderContainer = document.querySelector(".slider-container");
const slider = document.querySelector(".slider");

let i = 1;
const fetchTrendingData = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/search/trending"
  );

  const data = await response.json();
  data.coins.forEach((item) => handleTrendData(item.item));
};

// Trend data handler

const handleTrendData = (data) => {
  const tokenName = document.createElement("span");
  const tokenImg = document.createElement("img");

  const contentDiv = document.createElement("div");
  contentDiv.className = "content";
  tokenImg.src = data.large;
  tokenName.textContent = ` ${i++}. ${data.name} (${data.symbol})`;
  contentDiv.appendChild(tokenImg);
  contentDiv.appendChild(tokenName);
  slider.appendChild(contentDiv);
  sliderContainer.appendChild(slider);
};

//Clicks on the Add token button, popUp form pops up, closes on the X button.
const addTokenBtn = document.querySelector(".btn");
const popUpBg = document.querySelector(".popup-bg");
const popUpClose = document.querySelector(".popup-close");

addTokenBtn.addEventListener("click", () => {
  //console.log('click')
  popUpBg.classList.add("bg-active");
});

popUpClose.addEventListener("click", () => {
  popUpBg.classList.remove("bg-active");
});

// Submits a form with new coins and appends it to the slide.
const cryptoForm = document.querySelector(".crypto-form");
cryptoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formName = document.querySelector("#name").value;
  const formSymbol = document.querySelector("#symbol").value;
  const formImage = document.querySelector("#img").value;

  const token = {
    name: formName,
    symbol: formSymbol,
    large: formImage,
  };
  handleTrendData(token);
  popUpBg.classList.remove("bg-active");
  cryptoForm.reset();
});

fetchTrendingData();

const tableRows = document.querySelector(".table-rows");
const filterRank = document.querySelector("#rank");
const filterName = document.querySelector("#name");
const filterPrice = document.querySelector("#price");
const filterVolume = document.querySelector("#volume");
const filterChange = document.querySelector("#change");
const filterMarketCap = document.querySelector("#mcap");

let dataList = [];
let isAscending = true;

const fetchTokenData = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
  );

  dataList = await response.json();

  dataList.forEach((token) => {
    renderRows(token);
  });
};

const renderRows = (data) => {
  // console.log(data);

  const tableRow = document.createElement("div");
  tableRow.className = "table-row";

  const assetName = document.createElement("div");
  assetName.className = "crypto-name";
  assetName.textContent = `${data.name} (${data.symbol.toUpperCase()})`;

  const assetRank = document.createElement("div");
  assetRank.className = "crypto-rank";
  assetRank.textContent = `${data.market_cap_rank}`;

  const assetImage = document.createElement("img");
  assetImage.className = "crypto-symbol";
  assetImage.src = data.image;

  const assetPrice = document.createElement("div");
  assetPrice.className = "crypto-price";
  assetPrice.textContent = `$${data.current_price}`;

  const assetChange = document.createElement("div");
  assetChange.classList.add("crypto-24h-change");

  if (Number(data.price_change_percentage_24h) > 0) {
    assetChange.classList.add("positive-return");
  } else if (Number(data.price_change_percentage_24h) < 0) {
    assetChange.classList.add("negative-return");
  }
  assetChange.textContent = `${data.price_change_percentage_24h}%`;

  const assetVolume = document.createElement("div");
  assetVolume.className = "crypto-total-volume";
  assetVolume.textContent = `$${data.total_volume.toLocaleString()}`; //}`;

  const assetMarketCap = document.createElement("div");
  assetMarketCap.className = "crypto-market-cap ";
  assetMarketCap.textContent = `$${data.market_cap.toLocaleString()}`;

  tableRow.appendChild(assetRank);
  tableRow.appendChild(assetImage);
  tableRow.appendChild(assetName);
  tableRow.appendChild(assetPrice);
  tableRow.appendChild(assetChange);
  tableRow.appendChild(assetVolume);
  tableRow.appendChild(assetMarketCap);

  tableRows.appendChild(tableRow);
};

const searchFilter = document.querySelector("#search-text");

const filterSearch = () => {
  const searchInput = document.querySelector("#search-text");
  const filter = searchInput.value;
  const listItems = document.querySelectorAll(".table-row");

  listItems.forEach((item) => {
    let text = item.textContent;

    if (text.toLowerCase().includes(filter.toLowerCase())) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
};

searchFilter.addEventListener("input", filterSearch);

const filterBy = (field) => {
  isAscending = !isAscending;
  let newSortedData = dataList.sort((a, b) => {
    if (isAscending) {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (a[field] > b[field]) {
        return -1;
      } else if (a[field] < b[field]) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  const filterRow = document.querySelectorAll(".table-row");
  filterRow.forEach((node) => {
    node.parentNode.removeChild(node);
  });
  newSortedData.forEach((token) => {
    renderRows(token);
  });
  filterRow.innerHTML = "";
};

// filters

filterRank.addEventListener("click", () => {
  filterBy("market_cap_rank");
});

filterName.addEventListener("click", () => {
  filterBy("name");
});

filterPrice.addEventListener("click", () => {
  filterBy("current_price");
});

filterChange.addEventListener("click", () => {
  filterBy("price_change_percentage_24h");
});

filterVolume.addEventListener("click", () => {
  filterBy("total_volume");
});

filterMarketCap.addEventListener("click", () => {
  filterBy("market_cap");
});

fetchTokenData();
