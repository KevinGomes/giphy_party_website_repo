const API_KEY = "RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC" 
const LIMIT = 9
const RATING = 'g'
let pageNum = 0
let previousSearch = ""

const searchButton = document.querySelector("#searchButton")
const resultPage = document.querySelector("#foundGifs")
const showMore = document.querySelector("#moreButton")
let searchTerm = document.querySelector("#searchTerm")

async function getResults(){
    
    if(previousSearch != searchTerm.value){
        console.log("different term detected")
        pageNum = 0
        resultPage.innerHTML=``
        previousSearch = searchTerm
    }
    
    const offset = pageNum * LIMIT
    
    console.log(pageNum)
    
    let url = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm.value}&limit=${LIMIT}&offset=${offset}`
    const response = await fetch(url)
    const responseData = await response.json()
    const data = responseData.data

    console.log(response)
    console.log(data)


    displayResults(data)
    showMore.classList.remove("hidden")
    pageNum++
    previousSearch = searchTerm.value
}

function displayResults(data){
    data.forEach((gif,i) => {
        resultPage.innerHTML += `
        <img src = "${data[i].images.original.url}" alt = "gif">
        `
    });
}

//function showMoreResults(data){
//    getResults()
//}
window.onload = function()
{


showMore.addEventListener("click", (event) => {
    event.preventDefault()
    getResults()})

searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    getResults()})



}