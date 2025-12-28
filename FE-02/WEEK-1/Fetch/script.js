// fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`)
//     .then(res => {
//         if (!res.ok) {
//             throw new Error(`Could not fetch the resource`)
//         }
//         return res.json()
//     })
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// ======= same as above using async await ==========
async function fetchData() {
    try {
        const pokemonName = document.getElementById('pokemon').value.toLowerCase()
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        if (!res.ok) {
            throw new Error(`could not fetch resource`)
        }
        const data = await res.json()
        console.log(data)

        // ------- Front Image -----------
        const pokemonImgFront = data.sprites.front_default
        const imgElement1  = document.getElementById('pokemon-image1')
        imgElement1.src = pokemonImgFront
        imgElement1.style.display = 'block'

        const pokemonImgBack = data.sprites.back_default
        const imgElement2  = document.getElementById('pokemon-image2')
        imgElement2.src = pokemonImgBack
        imgElement2.style.display = 'block'
    } catch (error) {
        console.error(error)        
    }
}

// fetchData()