import { showPonyData } from './pony';
import './style.css'

const url = 'http://ponyapi.net/v1/character/all?limit=350';
const ponyCardDiv = document.querySelector('#ponyCardDiv');

/*fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
*/
async function loadCards(url){
//get character name, photo
//add learn more btn to run next api call function
    try{
        const response = await fetch(url);
        const data = await response.json();
        const dataArr = data['data'];
        dataArr.forEach(obj => {
            const ponyName = obj['name']
            //selecting the first available image
            if(!obj.hasOwnProperty('image')){
                return;
            }
            const ponyImg = obj['image'][0]
            ponyCardDiv.insertAdjacentHTML('beforeend', 
                `
                <div class="card">
                    <p class="characterName">${ponyName}</p>
                    <img class="ponyImg" src='${ponyImg} alt='Image of ${ponyName}'>
                    <button class='learn-more-btn'>Learn More!</button>
                </div>
                `
            )
        });
        const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
        learnMoreBtns.forEach(btn => btn.addEventListener('click', (e) => {
            const ponyCard = e.target.parentElement;
            const ponyName = ponyCard.querySelector('.characterName').textContent;
            window.location.href = `./pony.html?pony=${ponyName}`;

            //window.location.href = './pony.html';
            //showPonyData(ponyName)
        }))
    }
    catch(error){
        console.error(error);
    }
}
loadCards(url)