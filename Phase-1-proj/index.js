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

fetchTrendingData();
