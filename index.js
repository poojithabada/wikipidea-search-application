let searchResults = document.getElementById("searchResults");
let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        title,
        link,
        description
    } = result;
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResults.appendChild(resultItem);

    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.textContent = title;
    resultTitle.href = link;
    resultTitle.target = "_blank";
    resultItem.appendChild(resultTitle);
    let breakEl = document.createElement("br");
    resultItem.appendChild(breakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    resultItem.appendChild(urlEl);
    let lineBreak = document.createElement("br");
    resultItem.appendChild(lineBreak);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("result-title");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItem.appendChild(descriptionEl);
}

function displayResults(jsonData) {
    let {
        search_results
    } = jsonData;
    for (let result of search_results) {
        createAndAppend(result);
    }
}

function search(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        searchResults.textContent = "";
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput.value;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                displayResults(jsonData);
                spinner.classList.add("d-none");
            });
    }
}
searchInput.addEventListener("keydown", search);