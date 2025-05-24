//
function getRandomPokemonId() {
  return Math.floor(Math.random() * 1000) + 1; // Generates a number between 1 and 1000
}
// //to get name of pokimon 
async function getPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/4");
  const data = await response.json();
  console.log(data.species.name);
}
//to get ability 
async function getPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/4");
  const data = await response.json();
  console.log(data.abilities[0].ability.name);
}
// to get pokemon types
async function getPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/4");
  const data = await response.json();

  if (data.types[0].type.name) {
    console.log(data.types[0].type.name);
  } if (data.types[1].type.name) {
    console.log(data.types[1].type.name);
  }
}

getPokemon();
// to get image 
const image = document.getElementById("image")
image.src = data.sprites.front_default
image.style.display = "block"

let High_score
if (localStorage.getItem("High_score")) {
  High_score = localStorage.getItem("High_score")


  let High_score_Value = document.getElementById("High_score")

  High_score_Value.innerText = High_score
}
else {
  High_score = 0// deflat 
}

// geting in score board
if (last_Rank < score) {
  ToLeader_Board()


}
try {
  let data = { name: userName, score: score };
  let response = await fetch('/AmION10', {
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