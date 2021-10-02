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
  
    const sortById = (i) => {
        //credit to Jamie Dunstan of Stack Overflow for the nice suggestion on using Each.

        let sortIdList = $('.id').toArray().sort((a, b) => {
            return parseInt(a.id) - parseInt(b.id)
        })
        $.each(sortIdList, (i, div) => {
            let newDiv = sortIdList;
             $('.id').remove();
            $("#test").append(newDiv)
            
        });
        //$("#test div").toArray().sort( (a, b) => {
          //   return parseInt(a.id) - parseInt(b.id);
        //}).each( () => {
        //     let elem = $(this);
        //     elem.remove();
        //     $("#test").append(elem);
        // });
          
      }

    const getPokemonData = (pokemon) => {
        let dataMap = []

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

                //generation
                let $generation = $('<div>').addClass('generation')
                console.log(calcGen(data.id))
                $generation.html(`${calcGen(data.id)}`)
                $id.append($generation)
                
                //sprite
                let $sprite = $('<img>').attr("src", `${data.sprites.other['official-artwork'].front_default}`)
                $sprite.addClass('sprites')
               // $('#test').append($sprite)
                $id.append($sprite)

                //types
                let $typeBox = $('<div>').addClass('type')
                $id.append($typeBox)

                for(index = 0;index < data.types.length; index++){
                    let $type = $('<div>').addClass(`${data.types[index].type.name}`)
                    let $type1 = data.types[index].type.name
                    $type.html(`${$type1}`)
                    $typeBox.append($type)

                }
                //Modal Button Creation
                
               

               


                    sortById(pokemon)

            })
    }
for (let i = 160; i <= 170; i++) {
    getPokemonData(i)
    
}

          
});

