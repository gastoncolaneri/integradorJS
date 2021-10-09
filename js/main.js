let divPrueba = document.querySelector('#prueba');
let listaJuegos = [];
const CORSURL = 'https://cors-anywhere.herokuapp.com/';
const APIURL = 'https://www.freetogame.com/api/games';

const pruebaAPI = async () => {
  let datos = await fetch(CORSURL + APIURL);
  console.log(datos);

  let respuesta = await datos.json();
  console.log(respuesta);

  divPrueba.innerHTML = `${respuesta.map((juego) => {
    return `
    <div class="col s6 m3">
      <div class="card">
        <div class="card-image">
          <img src="${juego.thumbnail}">
          <span class="card-title">${juego.title}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
        </div>
      </div>
    </div>`;
  })}</div>`;
};

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

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
  var options = {
    dropdownOptions: {
      Apple: null,
      Microsoft: null,
      Google: null,
    },
  };
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
