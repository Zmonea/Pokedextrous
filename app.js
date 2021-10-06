$(() => {

let currentCaroIndex = 20;
let maxCaroIndex = currentCaroIndex + 10;

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
        }else if(id >= 810 && id <= 898){
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


    const sortByClass = (selector, append) => {
        //credit to Jamie Dunstan of Stack Overflow for the nice suggestion on using Each.

        let sortClassList = $(selector).toArray().sort((a, b) => {
            return parseInt(a.class) - parseInt(b.class)
        })
    
        $.each(sortClassList, (i, div) => {
            let newDiv = sortClassList;
             $(selector).remove();
            $(append).append(newDiv)
            
        });
          console.log(sortClassList)
      }

const filterByType = () => {
  
}


const prevCaro = ( min, max) => {
    min -= 10
    max -= 10
    if(min < 0){
        min = 889
        max = 899
    }

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
    console.log(min, max)
    min += 10
    max += 10

    if(max >= 899 || min > 889){
        min = 0
        max = 10
    }
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

    
      
    const getPokemonData = (pokemon) => {
        


        $.ajax({
        
            type: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
            }).then( (data) => {


                //Id
                let $id = $('<div>').attr('id',`${data.id}`)
                let $idReal = $('<div>').addClass('idSmall')
                $id.addClass('id')
                $idReal.html(`${data.id}`)
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
                
                //More Info Button
                let $infoButton = $('<button>').addClass('moreInfo')
                $infoButton.html(`More Info`)
                $id.append($infoButton)
                
               


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
                
                

                

                //carosel
                let $spriteCarosel = $('<img>').attr("src", `${data.sprites.other['official-artwork'].front_default}`)
                $spriteCarosel.addClass('caroselPic')
                $spriteCarosel.attr('id',`${data.id}`)
                $spriteCarosel.css('background')

                $('.caroselImg').append($spriteCarosel)

                sortById('.caroselPic','.caroselImg')
                
               


                    sortById('.id','#test')
                   
                    $( ".moreInfo" ).each(function( index ) {

                        $( this ).on('click', () => {
                            let name = $('.name').toArray()
                            let moreInfoTerm = name[index].innerText 
                            console.log(moreInfoTerm)
                            $('.modalImage').empty()
                            $('.modalText').empty()

                            $.ajax({
        
                                type: 'GET',
                                url: `https://pokeapi.co/api/v2/pokemon/${moreInfoTerm}`,
                                }).then( (data) => {

                                    //Modal Creation

                                    let $modalImage = $('<img>').attr("src", `${data.sprites.other['official-artwork'].front_default}`)
                                    $('.modalImage').append($modalImage)

                                    let $modalName = $('<h2>').html(`${data.name}`.toUpperCase())
                                        $('.modalText').append($modalName)

                                        let $modalID = $('<h2>').html(`${data.id}`)
                                        $('.modalText').append($modalID)
                                })
                                    setTimeout( () => {
                                        $.ajax({
                                            type: "GET",
                                             url: `https://pokeapi.co/api/v2/pokemon-species/${moreInfoTerm}`,
                                    
                                         }).then( (specData) => {
                                            
                                            
                                            let $modalFlavor = $('<div>').html(`${specData.flavor_text_entries[0].flavor_text}`)
                                            $('.modalText').append($modalFlavor)
    
                                            let $modalHabitat = $('<div>').html(`Habitat: ${specData.habitat.name}`)
                                            $('.modalText').append($modalHabitat)
                                           
                                         })
                                    }, 400)
                            
                            $('.modalContainer').css('display','block')
                                

                        });
                    });
                    

            })
    }

for (let i = currentCaroIndex; i <= maxCaroIndex; i++) {
    
    getPokemonData(i)
     
}



$('.updateSearch').on('click', () => {

    //if Pokemon name
    //Credit to DelftStack.com on how to check for numbers
    
     let newSearchTerm = $('.searchTerm').val()
     if(isNaN(newSearchTerm)){
     $('#test').empty()
     $('.caroselImg').empty()

     getPokemonData(newSearchTerm.toLowerCase())
     }else{

    //if number
    let newSearchIndex = $('.searchTerm').val()
    let newSearchMax = parseInt(newSearchIndex) + 10

    console.log(newSearchIndex)
    console.log(newSearchMax)

    $('#test').empty()
    $('.caroselImg').empty()
     for (let i = newSearchIndex; i <= newSearchMax; i++) {
        getPokemonData(i)
    }
    currentCaroIndex = parseInt(newSearchIndex)
    maxCaroIndex = newSearchMax
    }
})

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

$('.modalContainer').on('click', () => {
    $('.modalContainer').css('display', 'none')
})


    //credit to Wirex00 on stack Overflow on a method for being able to target event not yet in the DOM
    //This Allows them to click on the Carosel Picture and search the index
$('body').on('click', '.caroselPic', (event) => {
    
   let $caroIndexUpdate = $(event.currentTarget)[0].id

   let $newMax = parseInt($caroIndexUpdate) + 10

   $('#test').empty()
   $('.caroselImg').empty()
   
   for (let i = $caroIndexUpdate; i <= $newMax; i++) {
    
         getPokemonData(i)
    }
    currentCaroIndex = parseInt($caroIndexUpdate)
    maxCaroIndex = parseInt($newMax)

}) 

$('.sortByClass').on('click', () => {
    
let grandpa = $('.normal').eq(0).parent().parent()
    console.log(grandpa)


})




          
});

