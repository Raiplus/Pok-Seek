document.addEventListener("DOMContentLoaded", () => {
   
    let userName = ''// this is trmparory soon we are going to add user login/singup but for now we are trying to make a working leader bord it's last for 1 weak
    let last_Rank = 0;
    userName = localStorage.getItem('userName')
    let score = 0//defult
    if (userName) {

        confirm(`Your trainer name is "${userName}". Confirm?`)


        async function Rank() {
            try {
                let response = await fetch('https://pok-seek.onrender.com/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"

                    }
                })
                let data = await response.json()
                console.log(data)
                last_Rank = data.last_Rank
                console.log(last_Rank)
            }
            catch (err) {
                console.log(err)
            }

        }
        Rank()
    }
    else if (!userName) {
        NotuserName()

    }


    function NotuserName() {
        userName = prompt("Enter your trainer name")
        confirm(`Your trainer name is "${userName}", Confirm?`)
        localStorage.setItem('userName', userName)
        if (!userName) {


            NotuserName()
        }

        else {
            arr = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '+', '-', '/', '}', '{', ']', '[', "'", '"', '?', ',', '>', '<', ';', ':']

            for (let i in userName) {// this thing is user to run the loop till all itrations 
                for (let items of arr) {// store indivual index as itms 

                    if (userName[i] == items) {
                        alert('Invalid Characters')
                        NotuserName()
                    }
                }
            }

        }// for of and for in 




    }

    let Rank10 = 0


    let High_score
    if (localStorage.getItem("High_score")) {
        High_score = localStorage.getItem("High_score")


        let High_score_Value = document.getElementById("High_score")

        High_score_Value.innerText = High_score
    }
    else {
        High_score = 0// deflat 
    }
    //update leader board
    Leaderboard()
    async function Leaderboard() {
        let arr = []


        try {
            let response = await fetch('https://pok-seek.onrender.com/getdata')
            if (!response.ok) {
                throw new Error("404")
            }
            else {
                let data = await response.json()
                console.log(data)
                arr.push(data)



            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);

        }

        for (let i = 1; i < 6; i++) {
            if (i == 1) {
                document.getElementById(`Trainer${i}`).innerHTML = `<i class="fas fa-medal" style="color: #ffd700;"></i> ${arr[0].arr[i].name}`
                document.getElementById(`Trainer_Score${i}`).innerHTML = `${arr[0].arr[i].score}`
            }
            else if (i == 2) {
                document.getElementById(`Trainer${i}`).innerHTML = `<i class="fas fa-medal" style="color: #c0c0c0;"></i> ${arr[0].arr[i].name}`
                document.getElementById(`Trainer_Score${i}`).innerHTML = `${arr[0].arr[i].score}`
            }
            else if (i == 3) {
                document.getElementById(`Trainer${i}`).innerHTML = `<i class="fas fa-medal" style="color: #cd7f32;"></i> ${arr[0].arr[i].name}`
                document.getElementById(`Trainer_Score${i}`).innerHTML = `${arr[0].arr[i].score}`
            }

            else {
                document.getElementById(`Trainer${i}`).innerHTML = `<i class="fas fa-star"></i> ${arr[0].arr[i].name}`
                document.getElementById(`Trainer_Score${i}`).innerHTML = `${arr[0].arr[i].score}`

            }

        }
    }

    let start_button = document.getElementById("start_button")
    function getRandomPokemonId() {
        return Math.floor(Math.random() * 1025) + 1; // Generates a number between 1 and 1025
    }

    let Pokemon_NameBox1 = document.getElementById("Pokemon_NameBox1")
    let Pokemon_NameBox2 = document.getElementById("Pokemon_NameBox2")
    let Pokemon_NameBox3 = document.getElementById("Pokemon_NameBox3")
    let Pokemon_NameBox4 = document.getElementById("Pokemon_NameBox4")
    let hint = document.getElementById("hint")
    let User_score = document.getElementById("Score")
    let NotInternet = 0//defult no internet problem


    start_button.addEventListener("click", async () => {
        for (let i = 1; i < 5; i++) {
            document.getElementById(`Pokemon_NameBox${i}`).style.background = "";
        }
        OFFdisableAllOptions()
        //calling name changing fn
        await Pokemon_NameBox()
        //temporary decabling the btn  to avoide multiple cliks
        start_button.style.pointerEvents = "none";
        setTimeout(() => {
            start_button.style.pointerEvents = "auto";

        }, 3000)// Suspended for 3 seconds
        start_button.innerText = "Restart"

        start_button.style.backgroundColor = "#ff3e3e";
        const image_div = document.getElementById("image_div")
        image_div.style.filter = "blur(10px)";


    })// geting in score board
    if (last_Rank < score) {
        ToLeader_Board()


    }


    //to get other 3 pokemon 

    async function getother3pokemon() {
        let arr = []
        for (let i = 0; i < 3; i++) {
            let PokemonId = getRandomPokemonId()


            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonId}`);
                if (!response.ok) {


                    throw new Error("Somthing went wrong")
                }
                const data = await response.json();
                arr.push(data.species.name)
            }
            catch (err) {
                console.log(err)
                NotInternet = NotInternet + 1

            }


        }

        return arr;
    }
    //to get pokemon 
    async function getPokemon() {
        let arr = []
        let arr1 = []
        let PokemonId = getRandomPokemonId()
        let data

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonId}`);
            if (!response.ok) {
                NotInternet = NotInternet + 1
                ErrorManagement(NotInternet)
                throw new Error("Somthing went wrong")
            }
            data = await response.json();
        }
        catch (err) {
            console.log(err)

        }



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



        let [pokeName1, pokeName2, pokeName3, pokeName4] = await Pokemon_NameBox_random(TempName1, TempName2, TempName3, TempName4)

        Pokemon_NameBox1.innerText = pokeName1
        Pokemon_NameBox2.innerText = pokeName2
        Pokemon_NameBox3.innerText = pokeName3
        Pokemon_NameBox4.innerText = pokeName4
        hint.innerText = `🕵️ Hint: This Pokémon's ability is "${ability[0]}" and it's a ${NameType[1]}${NameType[2] ? " & " + NameType[2] : ""} type Pokémon!`;

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
        selectedName = selectedName

        const box = document.getElementById(`Pokemon_NameBox${index}`);
        start_button.style.backgroundColor = "#ffcc00";
        start_button.innerText = "Next"

        const image_div = document.getElementById("image_div")
        image_div.style.filter = "none";

        image_div.style.opacity = "1";
        disableAllOptions()
        if (selectedName === pokeName) {

            hint.innerText = `"Correct! 🎉 You guessed ${selectedName}!"`

            box.style.background = "lightgreen";
            setTimeout(() => {
                scoreCounte()
            }, 200)



        }
        else {

            box.style.background = "#ff3e3e";
            hint.innerText = `"Wrong ❌ The correct answer was ${selectedName}!"`

        }
        setTimeout(() => {
            for (let i = 1; i <= 4; i++) {
                const Option_box = document.getElementById(`Pokemon_NameBox${i}`);
                if (Option_box.innerText == selectedName) {
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
            box.style.pointerEvents = "auto"; // enables clicking
            box.style.opacity = "1"; //  normal opacity

        }
    }
    //score counter
    function scoreCounte() {

        score = score + 1


        User_score.innerText = score

        if (score > High_score) {
            High_score = score
            let High_score_Value = document.getElementById("High_score")


            setTimeout(async () => {
                try {
                    const data = { userName: userName, score: High_score };
                    console.log(data);

                    let response = await fetch('https://pok-seek.onrender.com/userscores', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });

                    if (!response.ok) {
                        throw new Error("Something went wrong");
                    }
                }

                catch (err) {
                    alert(err)
                }
            }, 100)

            High_score_Value.innerText = score
            localStorage.setItem("High_score", High_score)

        }
    }
    //ErrorManagement
    function ErrorManagement() {
        if (NotInternet >= 2) {
            const errorMessageBox = document.getElementById("error-message");
            errorMessageBox.style.display = "block";
            errorMessageBox.innerText = "No Internet Connection";

            setTimeout(() => {
                errorMessageBox.style.display = "none";
            }, 5000); // Hide after 5 seconds

            NotInternet = 0; // Reset
        }
    }
    //sends users dta to leader board
    async function ToLeader_Board() {
        try {
            let data = { name: userName, score: score };
            let response = await fetch('https://pok-seek.onrender.com/AmION10', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            let resData = await response.json();
            console.log(resData);
        } catch (err) {
            console.log(err);
        }


    }


})
