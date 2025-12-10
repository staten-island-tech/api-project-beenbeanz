import './style.css'

fetch('http://ponyapi.net/v1/character/all')
    .then(response => response.json())
    .then(data => console.log(data))
console.log()
async function loadCards(){}