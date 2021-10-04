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
  
const sortById = (selector, append) => {
        //credit to Jamie Dunstan of Stack Overflow for the nice suggestion on using Each.

    let sortIdList = $(selector).toArray().sort((a, b) => {
            return parseInt(a.id) - parseInt(b.id)
    })
        $.each(sortIdList, (i, div) => {
            let newDiv = sortIdList;
             $(selector).remove();
            $(append).append(newDiv)
            
        });
          
      }

let currentCaroIndex = 20;
let maxCaroIndex = currentCaroIndex + 10;

const prevCaro = ( min, max) => {
    min -= 10
    max -= 10
    currentCaroIndex = min
    maxCaroIndex = max

    for(let i = min; i < max; i++){
    

        $.ajax({
        
            type: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${i}?offset=${min}&limit=${max}`,
            }).then( (data) => {
                let $spriteCarosel = $('<img>').attr("src", `${data.sprites.other['official-artwork'].front_default}`)
                $spriteCarosel.addClass('caroselPic')
                $spriteCarosel.attr('id',`${i}`)
                $('.caroselImg').append($spriteCarosel)

                sortById('.caroselPic','.caroselImg')
            })
    }
}
const nextCaro = ( min, max) => {
    min += 10
    max += 10
    currentCaroIndex = min
    maxCaroIndex = max
    for(let i = min; i < max; i++){
    

        $.ajax({
        
            type: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${i}?offset=${min}&limit=${max}`,
            }).then( (data) => {
                let $spriteCarosel = $('<img>').attr("src", `${data.sprites.other['official-artwork'].front_default}`)
                $spriteCarosel.addClass('caroselPic')
                $spriteCarosel.attr('id',`${i}`)
                $('.caroselImg').append($spriteCarosel)

                sortById('.caroselPic','.caroselImg')
            })
    }
    console.log(max)

}
//Carousel Buttons
$('.prevCarosel').on('click', () => {
    setTimeout( () => {
        $('.caroselImg').empty()
        prevCaro(currentCaroIndex,maxCaroIndex)
        $('.caroselImg').removeClass('animateLeft')
    }, 100)
    
    $('.caroselImg').addClass('animateLeft')
    
    

    

})

$('.nextCarosel').on('click', () => {
    setTimeout( () => {
        $('.caroselImg').empty()
        nextCaro(currentCaroIndex,maxCaroIndex)
        $('.caroselImg').removeClass('animateRight')
    }, 100)
    
    $('.caroselImg').addClass('animateRight')

})
    
      
    const getPokemonData = (pokemon) => {
        let carosel = []


        $.ajax({
        
            type: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
            }).then( (data) => {

                //Id
                let $id = $('<div>').attr('id',`${pokemon}`)
                let $idReal = $('<div>').addClass('idSmall')
                $id.addClass('id')
                $idReal.html(`${pokemon}`)
                $('#test').append($id)
                $id.append($idReal)

                  


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
                

                //carosel
                let $spriteCarosel = $('<img>').attr("src", `${data.sprites.other['official-artwork'].front_default}`)
                $spriteCarosel.addClass('caroselPic')
                $spriteCarosel.attr('id',`${pokemon}`)
                $('.caroselImg').append($spriteCarosel)

                sortById('.caroselPic','.caroselImg')
                
               


                    sortById('.id','#test')
                   

                    

            })
    }
for (let i = currentCaroIndex; i <= maxCaroIndex; i++) {
    getPokemonData(i)
    
   
    
}



//sortById('.caroselPic','.caroselImg')

          
});

