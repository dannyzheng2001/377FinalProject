function injectInfo(list) {
    const target = document.querySelector("#info");
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

async function getData() {
    const pokemon = document.getElementById("pokemonName").value;
    const shiny = document.querySelector("#shinyFilter");
    console.log('pokemon is:', pokemon);
    const url = new URL("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    console.log("API Url:", url.toString());

    const response = await fetch(url);

    // console.log(response);

    const data = await response.json();

    console.log(data);
    injectInfo("Pokemon Type: " + getType(data));

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

}