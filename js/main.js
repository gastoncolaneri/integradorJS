let divPrueba = document.querySelector('#prueba');
let listaJuegos = [];

const pruebaAPI = async () => {
  let datos = await fetch(
    'https://www.cheapshark.com/api/1.0/deals?upperPrice=15'
  );
  let respuesta = await datos.json();
  divPrueba.innerHTML = `<ul> ${respuesta.map((datos) => {
    return `<li> ${datos.internalName}</li>`;
  })} </ul>`;
  console.log(respuesta);
};

for (let i = 0; i < 2; i++) {
  const gamesAPI = async () => {
    let datos = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${i}`);
    let respuesta = await datos.json();
    listaJuegos.push(respuesta.info.title);
  };
  gamesAPI();
}

// Materialize JS
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function () {
  var options = {
    data: {
      Apple: null,
      Microsoft: null,
      Google: null,
    },
  };
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, options);
});
