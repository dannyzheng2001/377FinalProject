function injectInfo(list, id) {
    const target = document.querySelector("#" + id);
    target.innerHTML = "";
    target.innerHTML  += list;
  }

  function getType(data) {
    if (data['types'][1]) {
      return data['types'][0]['type'].name + '/' + data['types'][1]['type'].name;
    } else {
      return data['types'][0]['type'].name;
    }
    
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function randomMoves(data) {
    console.log("fired cut list");
    const range = [...Array(15).keys()];
    return (newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, data["moves"].length - 1);
      console.log("index is: ", index);
      return data["moves"][index]["move"].name;
    }));

  }

  function toArray(word) {
    return word.trim().split(",");
  }

async function getData() {
    const pokemon = document.getElementById("pokemonName").value;
    const shiny = document.querySelector("#shinyFilter");
    const generateMovesets = document.querySelector("#generateMove");
    console.log('pokemon is:', pokemon);
    const url = new URL("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    console.log("API Url:", url.toString());

    const response = await fetch(url);

    // console.log(response);

    const data = await response.json();



    console.log(data);
    injectInfo("Pokemon Type: " + getType(data), "info");

    document.getElementById("dafault_img").src = data['sprites']['front_default'];

    shiny.addEventListener('change', function() {
      default_img = "";
      if (this.checked) {
        default_img = data['sprites']['front_shiny'];
      } else {
        default_img = data['sprites']['front_default'];
      }
      document.getElementById("dafault_img").src = default_img;
    })

    generateMovesets.addEventListener("click", (event) => {
      orderedList = document.getElementById("moveList");
      orderedList.innerHTML = "";
      list = randomMoves(data);
      console.log(list);
      result = list.forEach((item)=>{
        let li = document.createElement("li");
        li.innerText = item;
        orderedList.appendChild(li);
      });

    });

    clearData.addEventListener("click", (event) =>{
      console.log('clear browser data');
        localStorage.clear();
        console.log('localStorage Check', localStorage.getItem("storedData"))
    })

}