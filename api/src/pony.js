export async function showPonyData(ponyName){
    let ponyNameForUrl = ponyName;
    if(ponyName.includes(' ')){
        const index = ponyName.indexOf(' ');
        const charToInsert = '_'
        ponyNameForUrl = ponyName.slice(0, index) +
                        charToInsert +
                        ponyName.slice(index+1)
    }

    try{
        const response = await fetch(`http://ponyapi.net/v1/character/${ponyNameForUrl}`)
        const data = await response.json();
        const dataArr = data['data']
        console.log(dataArr)
    }
    catch(error){
        console.error(error)
    }

    
}