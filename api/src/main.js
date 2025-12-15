import './style.css'

const url = 'http://ponyapi.net/v1/character/all?limit=350';
const ponyCardDiv = document.querySelector('#ponyCardDiv');

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
                <div class="card w-full bg-gray-200 rounded-lg m-auto mt-2 mb-2">
                    <p class="characterName text-center text-4xl mt-2 mb-2">${ponyName}</p>
                    <img class="ponyImg m-auto rounded-lg block w-3/6 h-3/6 mb-4 mt-4" src='${ponyImg} alt='Image of ${ponyName}'>
                    <button class='learn-more-btn block bg-pink-300 text-gray-200 m-auto cursor-pointer'>Learn More!</button>
                </div>
                `
            )
        });
        const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
        learnMoreBtns.forEach(btn => btn.addEventListener('click', (e) => {
            const ponyCard = e.target.parentElement;
            const ponyName = ponyCard.querySelector('.characterName').textContent;
            window.location.href = `./pony.html?pony=${ponyName}`;
        }))
    }
    catch(error){
        console.error(error);
    }
}
loadCards(url)