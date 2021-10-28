let containerCardGames = document.querySelector('#containerCard');
let loader = document.querySelector('#loader');
let carouselDiv = document.querySelector('#carousel');
let imgOne = document.querySelector('#imgOne');
let imgTwo = document.querySelector('#imgTwo');
let imgThree = document.querySelector('#imgThree');
let imgFour = document.querySelector('#imgFour');
let imgFive = document.querySelector('#imgFive');
let listaElementos = [imgOne, imgTwo, imgThree, imgFour, imgFive];

let listaJuegos = {};
const APIURL = 'https://www.freetogame.com/api/games';
const URLGAMEID = 'https://www.freetogame.com/api/game?id=';

const gamesListComplete = async () => {
  let datos = await fetch(APIURL);
  let respuesta = await datos.json();
  let iconPlatform = '';
  loader.classList.add('hiddenLoader');

  {
    respuesta.map((juego) => {
      {
        juego.platform == 'PC (Windows)'
          ? (iconPlatform = 'desktop_windows')
          : (iconPlatform = 'web');
      }
      containerCardGames.innerHTML += `<div class="col s9 m5 l4 offset-s1">
      <div class="card cardContent hoverable">
        <div class="card-image">
          <img src="${juego.thumbnail}">
          <span class="card-title">${juego.title}</span>
        </div>
        <div class="card-content description">
          <p class="truncate ">${juego.short_description}</p>
          <div class="valign-wrapper mt15 justifyFE">
          <div class="btn-small genreTag ">${juego.genre}</div>
          <i class="material-icons">${iconPlatform}</i>
          </div>
        </div>
      </div>
    </div>`;
    });
  }
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

const prueba = (elemtn) => {
  console.log(elemtn);
};
const gamesAutocomplete = async () => {
  let datos = await fetch(APIURL);
  let respuesta = await datos.json();
  respuesta.map((juego) => {
    listaJuegos[juego.title] = juego.thumbnail;
  });
};

// Materialize JS
document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function () {
  let options = {
    data: listaJuegos,
    onAutocomplete: function (texto) {
      prueba(texto);
    },
  };
  let elems = document.querySelectorAll('.autocomplete');
  let instances = M.Autocomplete.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.tooltipped');
  let instances = M.Tooltip.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.carousel');
  let instances = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true,
    duration: 500,
  });
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.parallax');
  let instances = M.Parallax.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.fixed-action-btn');
  let instances = M.FloatingActionButton.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let textNeedCount = document.querySelectorAll(
    '#input_text, #textarea1, #textarea2'
  );
  M.CharacterCounter.init(textNeedCount);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.dropdown-trigger');
  let options = {
    coverTrigger: false,
    constrainWidth: false,
  };
  let instances = M.Dropdown.init(elems, options);
});
