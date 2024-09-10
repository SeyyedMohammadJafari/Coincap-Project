let exchangerUrlServer = "https://api.coincap.io/v2/exchanges"

async function getServerUrl() {
    let responsive = await fetch(exchangerUrlServer)
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

    let Li = document.querySelector(".Name")
    Li.appendChild(td)
}

function renderTrading(Trading) {
    let td = document.createElement("td")
    td.textContent = Trading

    let Li = document.querySelector(".Trading")
    Li.appendChild(td)
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

function renderTotal(Total) {
    let td = document.createElement("td")
    const formattedChange = parseFloat(Total).toFixed(2)
    td.textContent = formattedChange + "%"

    let Cp = document.querySelector(".Change")
    Cp.appendChild(td)
}

async function displayExchange() {
    let list = await getServerUrl()

    for (let i = 0; i < 20; i++) {
        let item = list[i]
        renderRank(item.rank)
        renderName(item.name)
        renderTrading(item.tradingPairs)
        renderVolume(item.volumeUsd)
        renderTotal(item.percentTotalVolume)
    }
}
displayExchange()

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
        let item = list[i]
        renderRank(item.rank)
        renderName(item.name)
        renderTrading(item.tradingPairs)
        renderVolume(item.volumeUsd)
        renderTotal(item.percentTotalVolume)
    }


    const additionalItems = list.slice(startIndex, startIndex + 20);
    return additionalItems;
}

function displayAdditionalItems(items) {
    console.log(items);
}