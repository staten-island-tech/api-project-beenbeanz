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
        const dataArr = data['data'][0]
        console.log(dataArr)
        
        for(let key in dataArr){
            console.log(key, dataArr[key])
        }

        const ponyInfoSection = document.querySelector('#ponyInfo')
        ponyInfoSection.insertAdjacentHTML('beforeend', 
            `
            <h3 class='ponyName'></h3>
            `
        )
    }
    catch(error){
        console.error(error)
    }
}