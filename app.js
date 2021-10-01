$(() => {
    const calcGen = (id) => {
        if(id <= 151){
            return "1"
        } else if(id >= 252 && id <= 385) {
            return "2"
        }else if(id >= 386 && id <= 492){
            return "3"
        }else if(id >= 493 && id <= 648){

        }else if(id >= 649 && id <= 720){
      
        }else if(id >= 721 && id <= 808){
      
        }else if(id >= 809 && id <= 894){
      
        }
    }
    const getPokemonData = (pokemon) => {
        $.ajax({
        
            type: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon}?offset=0&limit=20`,
            }).then( (data) => {
                //name
                let $name = $('<div>').addClass('name')
                $name.html(`${data.name}`)
                $('#test').append($name)
                
                //sprite
                let $sprite = $('<img>').attr("src", `${data.sprites.other['official-artwork'].front_default}`)
                $sprite.addClass('sprites')
                $('#test').append($sprite)

                //types
                let $type = $('<div>').addClass('type')
                let $type1 = data.types[0].type.name
                let $type2 = data.types[1].type.name
                $type.html(`${$type1}, ${$type2}`)
                $('#test').append($type)

                //generation
                let $generation = $('<div>').addClass('generation')
                $generation.html(`${data.name}`)
                $('#test').append($generation)

                    //console.log(data.sprites.other['official-artwork'].front_default)

            })
    }
for (let i = 1; i <= 6; i++) {
    getPokemonData(i)
}

          
});

