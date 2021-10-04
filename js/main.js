let divPrueba = document.querySelector('#prueba');

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
