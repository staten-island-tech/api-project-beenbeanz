import './style.css'

const params = new URLSearchParams(window.location.search);
const ponyName = params.get("pony");
if (ponyName) {
    showPonyData(ponyName);
}

const allPoniesBtn = document.querySelector('#allPoniesBtn');
allPoniesBtn.addEventListener('click', () => {
    window.location.href = `./index.html`;
})

export async function showPonyData(ponyName){
    const ponyNameForUrl = ponyName.replaceAll(' ', '_');

    try{
        const response = await fetch(`https://ponyapi.net/v1/character/${ponyNameForUrl}`)
        const data = await response.json();
        const pony = data['data'][0]     
        const {
            id,
            name,
            alias, 
            url,
            sex,
            residence,
            occupation,
            kind,
            image
        } = pony

        const aliasHTML = alias ? alias : "Oops! No data found";
        const occupationHTML = occupation ? occupation : "Oops! No data found";
        const residenceHTMl = residence ? residence : "Oops! No data found";

        const ponyInfoSection = document.querySelector('#ponyInfo')
        ponyInfoSection.insertAdjacentHTML('beforeend', 
            `
            <h3 class='name text-lg m-0.5'>${name}</h3>
            <h4 class='alias m-0.5'>Aliase(s): ${aliasHTML}</h4>
            <a class='url underline m-0.5' href='${url}'>Wiki page</a>
            <p class='sex normalText m-0.5'>Sex: ${sex}</p>
            <p class='residence normalText m-0.5'>Place(s) of residency: ${residenceHTMl}</p>
            <p class='occupation normalText m-0.5'>Occupation(s): ${occupationHTML}</p>
            <p class='kind normalText m-0.5'>Kind(s): ${kind}</p>
            <p class='id normalText m-0.5'>ID: ${id}</p>
            <div id='imgDiv' class="flex flex-wrap justify-center"></div>
            `
        )
        const imgDiv = document.querySelector('#imgDiv');
        image.forEach(img => {
            imgDiv.insertAdjacentHTML('beforeend', 
                `<img class='img w-50 h-50 m-2 rounded-lg' src='${img}'>`
            )
        });
    }
    catch(error){
        console.error(error)
    }
}