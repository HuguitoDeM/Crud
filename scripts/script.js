const URL = "https://65427be2ad8044116ed3715e.mockapi.io/users";

const BotonGet = document.getElementById("btnGet1");
const BotonPost = document.getElementById("btnPost");
const BotonPut = document.getElementById("btnPut");
const BotonDelete = document.getElementById("btnDelete");

const inputPutId = document.getElementById("inputPutId");
const Resultados = document.getElementById("results");
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");

const inputGet1Id = document.getElementById("inputGet1Id");

const inputDelete = document.getElementById("inputDelete");

BotonDelete.addEventListener("click", () => {
  const userId = inputDelete.value;

  fetch(`https://65427be2ad8044116ed3715e.mockapi.io/users/${userId}`, {
    method: 'DELETE'
  })
    .then((response) => {
      if (response.ok) {
        const bien = document.createElement('div');
        bien.classList.add('alert', 'alert-success');
        bien.textContent = 'Borrado exitoso.';
        document.body.appendChild(bien);
      } else {
        const error = document.createElement('div');
        error.classList.add('alert', 'alert-danger');
        error.textContent = 'Algo salió mal...';
        document.body.appendChild(error);
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
});

BotonGet.addEventListener("click", () => {
  const UserGetID = inputGet1Id.value;
  const apiUrl = UserGetID ? `https://65427be2ad8044116ed3715e.mockapi.io/users/${UserGetID}` : "https://65427be2ad8044116ed3715e.mockapi.io/users";
  fetch(apiUrl)
    .then(response => response.json())
    .then(item => {
    
     Resultados.innerHTML = ""
     if(UserGetID===item.id || UserGetID ===""){
      if (UserGetID) {
        Resultados.innerHTML = `<li>Nombre: ${item.name} Apellido: ${item.LastName}</li>`;
        console.log(item);
      } else {
     item.forEach(element => {
        Resultados.innerHTML   += `<li>Nombre: ${element.name} Apellido: ${element.LastName}</li>`
       });
      }
     }
     else{
        swal.fire("Ingrese un valor valido")
     }
     inputGet1Id.value=""
    })
  
});

BotonPost.addEventListener("click", () => {
  fetch(URL, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: inputPostNombre.value,
      lastname: inputPostApellido.value
    })
  });
});

BotonPut.addEventListener("click", async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Modificar ' + inputPutId.value,
    html:
      '<input id="name" class="swal2-input" value="">' +
      '<input id="lastname" class="swal2-input" value="">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('name').value,
        document.getElementById('lastname').value
      ];
    }
  }).then(res => {
    fetch(`https://65427be2ad8044116ed3715e.mockapi.io/users/${inputPutId.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: res[0],
        lastname: res[1]
      })
    });
  });
});
BotonPut.addEventListener("click", () => {
    fetch(URL + "/" + inputPutId.value, {
        method: "GET",
        redirect: "follow"
    })
        .then(res => res.json())
        .then(res => Swal.fire({
            title: 'Modificar ' + inputPutId.value,
            html: `<input id="name" class="swal2-input" value="${res.name}"><input id="lastname" class="swal2-input" value="${res.lastname}">`,
            focusConfirm: false,
            preConfirm: () => {
                res.name = document.getElementById('name').value;
                res.lastname = document.getElementById('lastname').value;
                return res;
            }
        }))
        .then(res => {
            if (res.isConfirmed) {
                fetch(URL + "/" + inputPutId.value, {
                    method: "PUT",
                    redirect: "follow",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(res.value)
                })
                .then(aa => {
                    fetch(URL)
                        .then(resa => resa.json())
                        .then(resa => mostrar(resa));
                });
            }
        });
});