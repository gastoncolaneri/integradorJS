let divPrueba = document.querySelector('#prueba');
let carouselDiv = document.querySelector('#carousel');
let imgOne = document.querySelector('#imgOne');
let imgTwo = document.querySelector('#imgTwo');
let imgThree = document.querySelector('#imgThree');
let imgFour = document.querySelector('#imgFour');
let imgFive = document.querySelector('#imgFive');
let listaElementos = [imgOne, imgTwo, imgThree, imgFour, imgFive];

let listaJuegos = [];
const CORSURL = 'https://cors-anywhere.herokuapp.com/';
const APIURL = 'https://www.freetogame.com/api/games';
const URLGAMEID = 'https://www.freetogame.com/api/game?id=';

const pruebaAPI = async () => {
  let datos = await fetch(APIURL);
  let respuesta = await datos.json();

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

const carouselAPI = async (i) => {
  let numRandom = Math.floor(Math.random() * (515 - 1)) + 1;
  let datos = await fetch(URLGAMEID + numRandom);
  let respuesta = await datos.json();
  if (respuesta.status !== 0) {
    console.log(listaElementos);
    listaElementos[i].innerHTML += `<img src=${respuesta.thumbnail}/>`;
    return respuesta;
  } else {
    carouselAPI(i);
  }
};

const carouselGames = () => {
  for (let i = 0; i < 5; i++) {
    carouselAPI(i);
  }
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
  var instances = M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true,
    duration: 500,
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var textNeedCount = document.querySelectorAll(
    '#input_text, #textarea1, #textarea2'
  );
  M.CharacterCounter.init(textNeedCount);
});
