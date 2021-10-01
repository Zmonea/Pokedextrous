$(() => {
    const calcGen = (id) => {
        if(id <= 151){
            return "I"
        } else if(id >= 152 && id <= 250) {
            return "II"
        }else if(id >= 251 && id <= 386){
            return "III"
        }else if(id >= 387 && id <= 493){
            return "IV"
        }else if(id >= 494 && id <= 649){
            return "V"
        }else if(id >= 650 && id <= 721){
            return "VI"
        }else if(id >= 722 && id <= 809){
            return "VII"
        }else if(id >= 810 && id <= 894){
            return "VII"
        }
    }
  
    const sortById = (id) => {
        $("#cat li").sort(function (a, b) {
            return parseInt(a.id) > parseInt(b.id);
        }).each(function () {
            var elem = $(this);
            elem.remove();
            $(elem).appendTo("#cat");
        });
          
      }

    const getPokemonData = (pokemon) => {
        $.ajax({
        
            type: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
            }).then( (data) => {

                //Id
                let $id = $('<div>').attr('id',`${pokemon}`)
                $id.addClass('id')
                 $id.html(`${pokemon}`)
                 $('#test').append($id)


                //name
                let $name = $('<div>').addClass('name')
                $name.html(`${data.name}`)
                $id.append($name)
                
                //sprite
                let $sprite = $('<img>').attr("src", `${data.sprites.other['official-artwork'].front_default}`)
                $sprite.addClass('sprites')
               // $('#test').append($sprite)
                $id.append($sprite)

                //types
                let $type = $('<div>').addClass('type')

                for(index = 0;index < data.types.length; index++){
                let $type = $('<div>').addClass('type')
                let $type1 = data.types[index].type.name
                $type.html(`${$type1}`)
               // $('#test').append($type)
               $id.append($type)

                }
                
               

                //generation
                let $generation = $('<div>').addClass('generation')
                console.log(calcGen(data.id))
                $generation.html(`${calcGen(data.id)}`)
                //$('#test').append($generation)
                $id.append($generation)

                    //console.log(data.sprites.other['official-artwork'].front_default)

            })
    }
for (let i = 150; i <= 165; i++) {
    getPokemonData(i)
}

          
});

