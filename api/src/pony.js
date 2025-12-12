import './style.css'

const params = new URLSearchParams(window.location.search);
const ponyName = params.get("pony");
if (ponyName) {
    showPonyData(ponyName);
}


export async function showPonyData(ponyName){
    let ponyNameForUrl = ponyName;
    if(ponyName.includes(' ')){
        const index = ponyName.indexOf(' ');
        const charToInsert = '_'
        ponyNameForUrl = ponyName.slice(0, index) +
                        charToInsert +
                        ponyName.slice(index + 1)
    }

    try{
        const response = await fetch(`http://ponyapi.net/v1/character/${ponyNameForUrl}`)
        const data = await response.json();
        const pony = data['data'][0]
        console.log(pony)
     
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
        
       
        const ponyInfoSection = document.querySelector('#ponyInfo')
        
        ponyInfoSection.insertAdjacentHTML('beforeend', 
            `
            <h3 class='name text-lg m-0.5'>${name}</h3>
            <h4 class='alias m-0.5'>Aliase(s): ${alias}</h4>
            <a class='url underline m-0.5' href='${url}'>Wiki page</a>
            <p class='sex normalText m-0.5'>Sex: ${sex}</p>
            <p class='residence normalText m-0.5'>Place(s) of residency: ${residence}</p>
            <p class='occupation normalText m-0.5'>Occupation(s): ${occupation}</p>
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