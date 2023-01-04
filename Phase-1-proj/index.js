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


//Clicks on the Add tocken button, popUp form pops up, closes on the X button. 

const addTokenBtn = document.querySelector('.btn')
const popUpBg = document.querySelector('.popup-bg')
const popUpClose = document.querySelector('.popup-close')
addTokenBtn.addEventListener('click', () => {
  //console.log('click')
  popUpBg.classList.add('bg-active')
})

popUpClose.addEventListener('click', () => {
  popUpBg.classList.remove('bg-active')
})

// Submits a form with new coins and appends it to the slide.
const cryptoForm = document.querySelector('.crypto-form')
cryptoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('submit')
    const formName = document.querySelector('#name').value
    const formSymbol = document.querySelector('#symbol').value
    const formImage = document.querySelector('#img').value
    const token = {
      name: formName,
      symbol: formSymbol,
      large: formImage
    }
    handleTrendData(token)
    popUpBg.classList.remove('bg-active')
    cryptoForm.reset()
})

fetchTrendingData();

