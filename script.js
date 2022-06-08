const API_KEY = "RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC" 
const LIMIT = 9
const RATING = 'g'
let pageNum = 0
let movePage = 0

const searchButton = document.querySelector("#searchButton")
const resultPage = document.querySelector("#foundGifs")
const showMore = document.querySelector("#moreButton")
let searchTerm = document.querySelector("#searchTerm")

async function getResults(){
    pageNum += 1
    
    console.log(pageNum)
    console.log(movePage)

    let url = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm.value}&limit=9&offset=${movePage}`
    const response = await fetch(url)
    const responseData = await response.json()
    const data = responseData.data

    console.log(response)
    console.log(responseData)
    console.log(data)

    displayResults(data)

    showMore.classList.remove("hidden")
    showMore.addEventListener("click", (event) => {
        event.preventDefault()
        showMoreResults(data)})
}

function displayResults(data){
    resultPage.innerHTML = ``
    data.forEach((gif,i) => {
        resultPage.innerHTML += `
        <img src = "${data[i].images.original.url}" alt = "gif">
        `
    });
}

function showMoreResults(data){
    movePage = pageNum * LIMIT
    getResults()
}

searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    getResults()})

window.onload = function()
{

}