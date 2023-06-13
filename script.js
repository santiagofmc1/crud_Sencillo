// Variables globales
var indexEditar = -1;

// Función para obtener los datos del Local Storage
function obtenerDatos() {
  var datos = JSON.parse(localStorage.getItem("datos"));
  return datos ? datos : [];
}

// Función para guardar los datos en el Local Storage
function guardarDatos(datos) {
  localStorage.setItem("datos", JSON.stringify(datos));
}

// Función para validar los campos de entrada
function validarCampos() {
  var nombre = document.getElementById("nombre").value;
  var edad = document.getElementById("edad").value;
  var celular = document.getElementById("celular").value;
  var correo = document.getElementById("correo").value;

  // Validación del nombre: No debe contener números
  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    alert("El campo Nombre solo puede contener letras y espacios.");
    return false;
  }

  // Validación del correo: Debe contener el símbolo @
  if (!/\S+@\S+\.\S+/.test(correo)) {
    alert("Por favor, ingrese un correo válido.");
    return false;
  }

  // Validación de la edad: Solo números permitidos
  if (isNaN(edad) || edad === "") {
    alert("Por favor, ingrese una edad válida.");
    return false;
  }

  // Validación del celular: Solo números permitidos
  if (isNaN(celular) || celular === "") {
    alert("Por favor, ingrese un número de celular válido.");
    return false;
  }

  return true;
}

// Función para agregar un registro
function agregarRegistro() {
  if (!validarCampos()) {
    return;
  }

  var nombre = document.getElementById("nombre").value;
  var edad = document.getElementById("edad").value;
  var celular = document.getElementById("celular").value;
  var correo = document.getElementById("correo").value;

  var datos = obtenerDatos();

  var nuevoRegistro = {
    nombre: nombre,
    edad: edad,
    celular: celular,
    correo: correo,
  };

  datos.push(nuevoRegistro);

  guardarDatos(datos);
  limpiarFormulario();
  mostrarRegistros();
}

// Función para actualizar un registro
function actualizarRegistro() {
  if (!validarCampos()) {
    return;
  }

  var nombre = document.getElementById("nombre").value;
  var edad = document.getElementById("edad").value;
  var celular = document.getElementById("celular").value;
  var correo = document.getElementById("correo").value;

  var datos = obtenerDatos();

  datos[indexEditar].nombre = nombre;
  datos[indexEditar].edad = edad;
  datos[indexEditar].celular = celular;
  datos[indexEditar].correo = correo;

  guardarDatos(datos);
  limpiarFormulario();
  mostrarRegistros();

  // Cambiar botones a "Agregar" después de actualizar
  document.getElementById("agregar").style.display = "inline-block";
  document.getElementById("editar").style.display = "none";

  indexEditar = -1;
}

// Función para eliminar un registro
function eliminarRegistro(index) {
  var datos = obtenerDatos();
  datos.splice(index, 1);
  guardarDatos(datos);
  mostrarRegistros();
}

// Función para editar un registro
function editarRegistro(index) {
  var datos = obtenerDatos();
  var registro = datos[index];

  document.getElementById("nombre").value = registro.nombre;
  document.getElementById("edad").value = registro.edad;
  document.getElementById("celular").value = registro.celular;
  document.getElementById("correo").value = registro.correo;

  // Cambiar botones a "Actualizar" al editar
  document.getElementById("agregar").style.display = "none";
  document.getElementById("editar").style.display = "inline-block";

  indexEditar = index;
}

// Función para mostrar los registros en la tabla
function mostrarRegistros() {
  var datos = obtenerDatos();
  var tabla = document.getElementById("tabla-crud");
  var tbody = tabla.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  for (var i = 0; i < datos.length; i++) {
    var registro = datos[i];

    var fila = document.createElement("tr");

    var celdaNombre = document.createElement("td");
    celdaNombre.textContent = registro.nombre;
    fila.appendChild(celdaNombre);

    var celdaEdad = document.createElement("td");
    celdaEdad.textContent = registro.edad;
    fila.appendChild(celdaEdad);

    var celdaCelular = document.createElement("td");
    celdaCelular.textContent = registro.celular;
    fila.appendChild(celdaCelular);

    var celdaCorreo = document.createElement("td");
    celdaCorreo.textContent = registro.correo;
    fila.appendChild(celdaCorreo);

    var celdaAcciones = document.createElement("td");

    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "btn btn-danger";
    botonEliminar.onclick = (function (index) {
      return function () {
        eliminarRegistro(index);
      };
    })(i);
    celdaAcciones.appendChild(botonEliminar);

    var botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.className = "btn btn-warning m-2";
    botonEditar.onclick = (function (index) {
      return function () {
        editarRegistro(index);
      };
    })(i);
    celdaAcciones.appendChild(botonEditar);

    fila.appendChild(celdaAcciones);
    tbody.appendChild(fila);
  }
}

// Función para limpiar el formulario
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("correo").value = "";
}

// Evento para agregar datos
document.getElementById("agregar").addEventListener("click", function () {
  agregarRegistro();
});

// Evento para actualizar datos
document.getElementById("editar").addEventListener("click", function () {
  actualizarRegistro();
});

// Mostrar los registros al cargar la página
mostrarRegistros();