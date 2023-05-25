const formulario = document.getElementById("formulario");

const ANALISIS = [
  { nombre: "Sangre", id: 1 },
  { nombre: "Orina", id: 2 },
  { nombre: "Radiografia", id: 3 },
  { nombre: "Ecografia", id: 4 },
  { nombre: "Mamografia", id: 5 },
]
const listadeestudios = document.getElementById("estudios")
listadeestudios.innerHTML = "<option>Seleccione un estudio para realizarse</option>"
ANALISIS.forEach((opciones) => {
  let item = document.createElement("option");
  item.value = opciones.id.toString();
  item.innerText = opciones.nombre;
  listadeestudios.append(item);
});


formulario.addEventListener("submit", (e) => {
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const email = document.querySelector("#email").value;
  const estudios = document.querySelector("#estudios").value;
  const listadeestudios = document.getElementById("estudios");
  const centromedico1 = document.getElementById("centromedico1").value;
  const centromedico2 = document.getElementById("centromedico2").value;
  const centromedico3 = document.getElementById("centromedico3").value;

  e.preventDefault();

  if ((nombre == "" || apellido == "" || email == "" || estudios == "")) {
    Swal.fire({
      title: 'Error!',
      text: 'No puedes dejar espacios vacios',
      icon: 'error',
      confirmButtonText: 'Voler'
    })
  }
  else {
    let usuarioIngresado = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      estudios: estudios,

    }


    const usuarioJSON = JSON.stringify(usuarioIngresado);
    localStorage.setItem("usuario", usuarioJSON);

    const usuarioEnLocalStorage = localStorage.getItem("usuario");
    const usuarioObjeto = JSON.parse(usuarioEnLocalStorage);
    limpiarinputs();

    Swal.fire({
      title: 'Información de usuario ingresada',
      html: `
        <p>Nombre: ${usuarioIngresado.nombre}</p>
        <p>Apellido: ${usuarioIngresado.apellido}</p>
        <p>Email: ${usuarioIngresado.email}</p>
        <p>Estudios: ${ANALISIS.find(opcion => opcion.id == usuarioIngresado.estudios)
          .nombre}</p>
         'Se enviara informacion por mail',`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
});
function limpiarinputs() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("email").value = "";
}

const centrosmedicos = document.getElementById("centromedicos");
const lista = document.querySelector("#json");

centrosmedicos.addEventListener("click", () => {
  ocultarSucursales();
})


function fetchP() {
  fetch('data.json')
    .then((res) => res.json())
    .then(data => {
      mostrarcentros(data);
    })
};

fetchP();

function mostrarcentros(centrosmedicos) {
  centrosmedicos.forEach((centrosmedico) => {
    const li = document.createElement('div')
    li.innerHTML = `<h3>${centrosmedico.nombre} </h3><br>
    <p>${centrosmedico.direccion}</p>`
    lista.append(li);
  })
};

function ocultarcentros() {
  lista.classList.toggle("json-active");

  if (lista.classList.contains("json-active")) {
    centrosmedicos.innerText = "Ocultar centros";
    lista.style.display = "";

  } else {
    centrosmedicos.innerText = "Mostrar centros";
    lista.style.display = "none";
  }
};