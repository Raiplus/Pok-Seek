document.addEventListener("DOMContentLoaded", () => {
    let start_button = document.getElementById("start_button")
    function getRandomPokemonId() {
        return Math.floor(Math.random() * 151) + 1; // Generates a number between 1 and 1000
    }
    let Pokemon_NameBox1 = document.getElementById("Pokemon_NameBox1")
        let Pokemon_NameBox2 = document.getElementById("Pokemon_NameBox2")
        let Pokemon_NameBox3 = document.getElementById("Pokemon_NameBox3")
        let Pokemon_NameBox4 = document.getElementById("Pokemon_NameBox4")

    start_button.addEventListener("click", async () => {
        
      

      
          //calling name changing fn
          await Pokemon_NameBox()
         
         //[TempName1,TempName2,TempName3,TempName4]
       

      

    })
    //to get other 3 pokemon 

    async function getother3pokemon() {
        let arr = []
        for (let i = 0; i < 3; i++) {
            let PokemonId = getRandomPokemonId()

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonId}`);
            const data = await response.json();
            arr.push(data.species.name)
        }

        return arr;
    }
    //to get pokemon 
    async function getPokemon() {
        let arr = []
        let arr1 = []
        let PokemonId = getRandomPokemonId()
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonId}`);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/6`);
        const data = await response.json();

        arr.push(data.species.name)
        arr1.push(data.abilities[0].ability.name)
        for (let i = 0; i < data.types.length; i++) {
            try {
                if (data.types[i]?.type?.name) { // here "?" is used to cheak it is there is any value exist  or not if not it will not give error
                    arr.push(data.types[i].type.name);
                } else {
                    throw new Error("No type found at index " + i);
                }
            } catch (err) {
                console.error(err);
            }
        }

        return { NameType: arr, ability: arr1 }

    }
    //suffle
    async function Pokemon_NameBox_random(TempName1,TempName2,TempName3,TempName4) {
        let Random_number = Math.random()
        console.log("i am hear")
        let a
        if (Random_number > 0.5) { a=TempName1
            TempName1=TempName2
            TempName2=a
                if(Math.random()<0.5){
                    a=TempName2
                    TempName2=TempName3
                    TempName3=a
                }
                if(Math.random()<0.5){
                    a=TempName3
                    TempName3=TempName4
                    TempName4=a
                }
        }
        else{ if(Math.random()<0.5){
            a=TempName1
            TempName1=TempName3
            TempName3=a
            if(Math.random()<0.5){
                a=TempName2
                TempName2=TempName3
                TempName3=a
            }
            if(Math.random()<0.5){
                a=TempName3
                TempName3=TempName4
                TempName4=a
            }
        }

        }
        
       return [TempName1,TempName2,TempName3,TempName4]

    }
    
    //put values
    async function Pokemon_NameBox() {
        let c = await getother3pokemon()
        const { NameType, ability } = await getPokemon()
        let TempName1=NameType[0]// true name
        let TempName2=c[0]
        let TempName3=c[1]
        let TempName4=c[2]

        console.log(NameType, 'its NameType')
        console.log(ability, "it's ability")
        let [pokeName1,pokeName2,pokeName3,pokeName4]=await Pokemon_NameBox_random(TempName1,TempName2,TempName3,TempName4)

        Pokemon_NameBox1.innerText=pokeName1
        Pokemon_NameBox2.innerText=pokeName2
        Pokemon_NameBox3.innerText=pokeName3
        Pokemon_NameBox4.innerText=pokeName4
        console.log(
            pokeName1, pokeName2, pokeName3, pokeName4
        )
        
    }


})