document.addEventListener("DOMContentLoaded", () => {
    let High_score
    if(localStorage.getItem("High_score")){
       High_score=localStorage.getItem("High_score")
       let High_score_Value=document.getElementById("High_score")
        
        High_score_Value.innerText=High_score
    }
    else{
         High_score=0// deflat 
    }
       
        let score =0//defult
    let start_button = document.getElementById("start_button")
    function getRandomPokemonId() {
        return Math.floor(Math.random() * 151) + 1; // Generates a number between 1 and 1000
    }
    let Pokemon_NameBox1 = document.getElementById("Pokemon_NameBox1")
    let Pokemon_NameBox2 = document.getElementById("Pokemon_NameBox2")
    let Pokemon_NameBox3 = document.getElementById("Pokemon_NameBox3")
    let Pokemon_NameBox4 = document.getElementById("Pokemon_NameBox4")
    let hint = document.getElementById("hint")
     let User_score= document.getElementById("Score")


    start_button.addEventListener("click", async () => {
        for (let i = 1; i < 5; i++) {
            document.getElementById(`Pokemon_NameBox${i}`).style.background = "";
        }
        OFFdisableAllOptions()
        //calling name changing fn
        await Pokemon_NameBox()
        //[TempName1,TempName2,TempName3,TempName4]
        start_button.innerText = "Restart"

        start_button.style.backgroundColor = "#ff3e3e";
        const image_div = document.getElementById("image_div")
        image_div.style.filter = "blur(10px)";


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
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonId}`);


        const data = await response.json();
        const image = document.getElementById("image")
        image.src = data.sprites.front_default


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
    async function Pokemon_NameBox_random(TempName1, TempName2, TempName3, TempName4) {
        let Random_number = Math.random()
        console.log("i am hear")
        let a
        if (Random_number > 0.5) {
            a = TempName1
            TempName1 = TempName2
            TempName2 = a
            if (Math.random() < 0.5) {
                a = TempName2
                TempName2 = TempName3
                TempName3 = a
            }
            if (Math.random() < 0.5) {
                a = TempName3
                TempName3 = TempName4
                TempName4 = a
            }
        }
        else {
            if (Math.random() < 0.5) {
                a = TempName1
                TempName1 = TempName3
                TempName3 = a
                if (Math.random() < 0.5) {
                    a = TempName2
                    TempName2 = TempName3
                    TempName3 = a
                }
                if (Math.random() < 0.5) {
                    a = TempName3
                    TempName3 = TempName4
                    TempName4 = a
                }
            }

        }

        return [TempName1, TempName2, TempName3, TempName4]

    }

    //put values
    async function Pokemon_NameBox() {
        let c = await getother3pokemon()
        const { NameType, ability } = await getPokemon()
        let TempName1 = NameType[0]// true name
        let TempName2 = c[0]
        let TempName3 = c[1]
        let TempName4 = c[2]
         console.log(TempName1)


        let [pokeName1, pokeName2, pokeName3, pokeName4] = await Pokemon_NameBox_random(TempName1, TempName2, TempName3, TempName4)

        Pokemon_NameBox1.innerText = pokeName1
        Pokemon_NameBox2.innerText = pokeName2
        Pokemon_NameBox3.innerText = pokeName3
        Pokemon_NameBox4.innerText = pokeName4
        hint.innerText = `🕵️ Hint: This Pokémon's ability is "${ability[0]}" and it's a ${NameType[1]}${NameType[2] ? " & " + NameType[2] : ""} type Pokémon!`;
        console.log(
            pokeName1, pokeName2, pokeName3, pokeName4
        )
        Pokemon_NameBox1.addEventListener('click', () => {


            let index = 1
            checking(pokeName1, TempName1, index)

        })
        Pokemon_NameBox2.addEventListener('click', () => {

            let index = 2
            checking(pokeName2, TempName1, index)
        })
        Pokemon_NameBox3.addEventListener('click', () => {

            let index = 3
            checking(pokeName3, TempName1, index)
        })
        Pokemon_NameBox4.addEventListener('click', () => {

            let index = 4
            checking(pokeName4, TempName1, index)
        })

    }
    //cheaking true or flse

    async function checking(pokeName, selectedName, index) {
        selectedName=selectedName
        
        const box = document.getElementById(`Pokemon_NameBox${index}`);
        start_button.style.backgroundColor = "#ffcc00";
        start_button.innerText = "Play Again"
        const image_div = document.getElementById("image_div")
        image_div.style.filter = "none";

        image_div.style.opacity = "1";
        disableAllOptions()
        if (selectedName == pokeName) {
            console.log("Correct!", index);
            box.style.background = "lightgreen";
            scoreCounte()
         
              
        }
         else {
            console.log("Incorrect!", index);
            box.style.background = "#ff3e3e";

        }
        setTimeout(() => {
            for (let i = 1; i <= 4; i++) {
                const Option_box = document.getElementById(`Pokemon_NameBox${i}`);
                if (Option_box.innerText== selectedName) {
                    Option_box.style.background = "lightgreen";
                }
            }
        }, 500); // 0.5 second delay

    }




    // enabling and decabling obtions after click by style.pointerevent method style.pointerevent="none/auto"
    function disableAllOptions() {

        for (let i = 1; i <= 4; i++) {
            const box = document.getElementById(`Pokemon_NameBox${i}`);
            box.style.pointerEvents = "none"; // disables clicking
            box.style.opacity = "0.7"; //opacity 0.8
        }
    }
    function OFFdisableAllOptions() {
        for (let i = 1; i <= 4; i++) {
            const box = document.getElementById(`Pokemon_NameBox${i}`);
            box.style.pointerEvents = "auto" // enables clicking
            box.style.opacity = "1"; //  normal opacity

        }
    }
    //score counter
    function scoreCounte() {
        score=score+1
        console.log(score,"fn called")
        
        User_score.innerText = score

        if (score >High_score){
            High_score=score
        let High_score_Value=document.getElementById("High_score")
        
        High_score_Value.innerText=score
        localStorage.setItem("High_score",High_score)
       
    }
    }
 
})
