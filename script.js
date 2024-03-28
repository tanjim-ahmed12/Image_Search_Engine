const accessKey = "sJqaMR-215to4dihpOxl03ZyozbyAYXoyyIxTQQYH98"; //Use your own API key

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");
const showMore = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchEngine() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page == 1){
        searchResults.innerHTML = "";
    }
   
    const results = data.results;

    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank"; //opens the link in new tab

        imageLink.appendChild(image);
        searchResults.appendChild(imageLink);
    })
    showMore.style.display = "block";
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchEngine();
})

showMore.addEventListener("click", () =>{
    page++;
    searchEngine();
})

