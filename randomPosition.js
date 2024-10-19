


async function getApi(url) {
    try {
        const response = await fetch(url);

        // Ensure successful response before proceeding
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching API data:', error);
        // Optionally return an error object or handle the error differently
    }
}






// const array = [
//     {
//         id: 1,
//         name: 'meo1',
//         age: 8
//     },
//     {
//         id: 2,
//         name: 'meo2',
//         age: 8
//     },
//     {
//         id: 3,
//         name: 'meo3',
//         age: 8
//     },
//     {
//         id: 4,
//         name: 'meo4',
//         age: 8
//     },
// ]
const offset = 0
const limit = 4
const arrayRandom = []
const url = `https://pokeapi.co/api/v2/pokemon-form/?offset=${offset}&limit=${limit}`



while (arrayRandom.length < limit) {
    let num = Math.floor(Math.random() * limit) + 1
    let check = false

    arrayRandom.forEach(element => {
        if (element === num) {
            check = true
        }
    });

    if (check === false) {
        arrayRandom.push(num)
    }
}
console.log('Array Random: ', arrayRandom);
// let newArray = []
// arrayRandom.forEach(value => {
//     for (let i = 0; i < array.length; i++) {
//         if (array[i].id === value) {
//             newArray.push(array[i])
//             break
//         }
//     }
// });

// const arrayList = array.map((object)=>object.id === 3)

// const newArray = arrayRandom.map((value) => {
//     const results = array.find((object) => {
//         if (object.id === value) {
//             return object
//         }
//     })
//     return results
// })

// console.table(newArray);

(async () => {
    const data = await getApi(url);
    // create an array null
    let array = []
    for (const element of data.results) {
        // call api again with each pokemon url
        const pokemonData = await getApi(element.url);
        // push each pokemon object into array
        array = [...array, pokemonData]
    }
    // arrayRandom is an array number
    const dataPokemon = arrayRandom.map((value) => {
        const results = array.find((object) => {
            // find the id in object equal to value in arrayRandom
            if (object.id === value) {
                // if id object match with value => return it
                return object
            }
        })
        // return the object which the result after find
        // results is an object
        return results
    })
    console.table(dataPokemon);
    
})();