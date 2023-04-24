function injectInfo(list) {
    console.log("fired injectHTML");
    const target = document.querySelector("#info");
    target.innerHTML = "";
    list.forEach((item, index) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str;
    });
  }

  function getType(data) {
    return data['types'][0]['type'].name;
  }

async function getData() {
    const pokemon = document.getElementById("pokemonName").value;
    console.log('pokemon is:', pokemon);
    const url = new URL("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    console.log("API Url:", url.toString());

    const response = await fetch(url);

    // console.log(response);

    const data = await response.json();

    console.log(data);
    console.log(getType(data));
}