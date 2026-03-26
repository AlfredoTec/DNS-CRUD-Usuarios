const API = "/api/usuarios";

const form = document.getElementById("form");
const tabla = document.getElementById("tabla");

const idInput = document.getElementById("id");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

// 🔄 cargar usuarios
async function cargarUsuarios() {
  const res = await fetch(API);
  const data = await res.json();

  tabla.innerHTML = "";

  data.forEach(u => {
    tabla.innerHTML += `
      <tr class="border-t">
        <td class="p-2">${u.id}</td>
        <td class="p-2">${u.nombre}</td>
        <td class="p-2">${u.email}</td>
        <td class="p-2">
          <button onclick="editar(${u.id}, '${u.nombre}', '${u.email}', '${u.password}')" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
          <button onclick="eliminar(${u.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ➕ guardar / actualizar
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = {
    nombre: nombre.value,
    email: email.value,
    password: password.value
  };

  try {
    if (idInput.value) {
      await fetch(`${API}/${idInput.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
      });

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        timer: 1500,
        showConfirmButton: false
      });

    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
      });

      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        timer: 1500,
        showConfirmButton: false
      });
    }

    form.reset();
    idInput.value = "";
    cargarUsuarios();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Algo salió mal"
    });
  }
});

// ✏️ editar
function editar(id, n, e, p) {
  idInput.value = id;
  nombre.value = n;
  email.value = e;
  password.value = p;

  Swal.fire({
    icon: "info",
    title: "Modo edición",
    timer: 1000,
    showConfirmButton: false
  });
}

// ❌ eliminar
async function eliminar(id) {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  });

  if (result.isConfirmed) {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    Swal.fire({
      icon: "success",
      title: "Eliminado",
      timer: 1200,
      showConfirmButton: false
    });

    cargarUsuarios();
  }
}

// 🚀 iniciar
cargarUsuarios();