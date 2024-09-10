let assetsUrlServer = "https://api.coincap.io/v2/assets"

async function getServerUrl() {
    let responsive = await fetch(assetsUrlServer)
    let data = await responsive.json()

    return data.data
}

function renderRank(Rank) {
    let td = document.createElement("td")
    td.textContent = Rank

    let Li = document.querySelector(".Rank")
    Li.appendChild(td)
}

function renderName(Name) {
    let td = document.createElement("td")
    td.textContent = Name

    let Na = document.querySelector(".Name")
    Na.appendChild(td)
}

function renderPrice(Price) {
    let td = document.createElement("td")
    const formattedPrice = parseFloat(Price).toFixed(2)
    td.textContent = "$" + formattedPrice

    let Pr = document.querySelector(".Price")
    Pr.appendChild(td)
}

function renderVm(VMAP24Hr) {
    let td = document.createElement("td")
    const formattedVm = parseFloat(VMAP24Hr).toFixed(2)
    td.textContent = "$" + formattedVm
    
    let Vm = document.querySelector(".VM")
    Vm.appendChild(td)
}

function renderCap(MarketCap) {
    let td = document.createElement("td")
    const formattedMarketCap = parseFloat(MarketCap).toFixed(2)
    let shortMarketCap = ""

    if (MarketCap >= 1e12) {
        shortMarketCap = (MarketCap / 1e12).toFixed(2) + "T"
    } else if (MarketCap >= 1e9) {
        shortMarketCap = (MarketCap / 1e9).toFixed(2) + "B"
    } else if (MarketCap >= 1e6) {
        shortMarketCap = (MarketCap / 1e6).toFixed(2) + "M"
    } else if (MarketCap >= 1e3) {
        shortMarketCap = (MarketCap / 1e3).toFixed(2) + "K"
    } else {
        shortMarketCap = "$" + formattedMarketCap;
    }

    td.textContent = shortMarketCap

    let Mc = document.querySelector(".Cap")
    Mc.appendChild(td)
}

function renderSupply(Supply) {

    let td = document.createElement("td")
    let formattedSupply = parseFloat(Supply)

    if (formattedSupply >= 1e9) {
        td.textContent = (formattedSupply / 1e9).toFixed(2) + "B"
    } else if (formattedSupply >= 1e6) {
        td.textContent = (formattedSupply / 1e6).toFixed(2) + "M"
    } else if (formattedSupply >= 1e3) {
        td.textContent = (formattedSupply / 1e3).toFixed(2) + "K"
    } else {
        td.textContent = Supply
    }

    let Sp = document.querySelector(".Supply")
    Sp.appendChild(td)
}

function renderVolume(Volume24Hr) {

    let td = document.createElement("td")
    let formattedVolume = parseFloat(Volume24Hr)

    if (formattedVolume >= 1e9) {
        td.textContent = (formattedVolume / 1e9).toFixed(2) + "B"
    } else if (formattedVolume >= 1e6) {
        td.textContent = (formattedVolume / 1e6).toFixed(2) + "M"
    } else if (formattedVolume >= 1e3) {
        td.textContent = (formattedVolume / 1e3).toFixed(2) + "K"
    } else {
        td.textContent = Volume24Hr
    }

    let Sp = document.querySelector(".Volume")
    Sp.appendChild(td)
}

function renderChange(Change24Hr) {
    let td = document.createElement("td")
    const formattedChange = parseFloat(Change24Hr).toFixed(2)
    td.textContent = formattedChange + "%"

    let Cp = document.querySelector(".Change")
    Cp.appendChild(td)
}

async function displayAssets() {
    let list = await getServerUrl()

    for(let i = 0; i < 20; i++) {
        let item = list[i]
        renderRank(item.rank)
        renderName(item.name)
        renderPrice(item.priceUsd)
        renderCap(item.marketCapUsd)
        renderVm(item.vwap24Hr)
        renderSupply(item.supply)
        renderVolume(item.volumeUsd24Hr)
        renderChange(item.changePercent24Hr)
    }
}
displayAssets()

const loadMoreButton = document.querySelector(".loadMoreButton");
let currentItemCount = 20;

loadMoreButton.addEventListener("click", async () => {
    const additionalItems = await getAdditionalItems(currentItemCount);
    displayAdditionalItems(additionalItems);
    currentItemCount += 20;
});


async function getAdditionalItems(startIndex) {

    const list = await getServerUrl();

    for (let i = 20; i < 60; i++) {
        const item = list[i];
        renderRank(item.rank);
        renderName(item.name);
        renderPrice(item.priceUsd);
        renderCap(item.marketCapUsd);
        renderVm(item.vwap24Hr);
        renderSupply(item.supply);
        renderVolume(item.volumeUsd24Hr);
        renderChange(item.changePercent24Hr);
    }


    const additionalItems = list.slice(startIndex, startIndex + 20);
    return additionalItems;
}

function displayAdditionalItems(items) {
    console.log(items);
}