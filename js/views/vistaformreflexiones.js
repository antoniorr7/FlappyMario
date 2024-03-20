function inicio() {
  let div = document.getElementById("vistaForm")
  let btnaniadir = document.getElementById("aniadir")
  let formulario = document.getElementById("form-end")

  btnaniadir.onclick = function () {
      // Clonar el formulario
      let clonedFormulario = formulario.cloneNode(true);

      // Recorrer los elementos del formulario clonado
      clonedFormulario.querySelectorAll('input, textarea').forEach(function (input) {
          // Establecer el valor del campo clonado según el valor del campo original
          input.value = '';
      });

      // Eliminar el atributo "id" para evitar duplicados en los clones
      clonedFormulario.removeAttribute("id");

      let btnBorrar = clonedFormulario.querySelector(".borrar");
      btnBorrar.onclick = function () {
          div.removeChild(clonedFormulario);
      };

      clonedFormulario.appendChild(btnBorrar);
      div.appendChild(clonedFormulario);
  };
}

window.onload = inicio;
