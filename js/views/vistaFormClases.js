/**
 * @class
 * @classdesc Clase que representa una vista para la gestión y validación de formularios.
 * @extends Vista
 * @author Nacho - Antonio - Mario
 * @license MIT
 * @param {Object} controlador - El controlador asociado a la vista.
 * @param {HTMLElement} base - El elemento base de la vista.
 */

const inicio = () => {
  const nEtapa = document.getElementById('etapa')
  const nClase = document.getElementById('clase')
  const send = document.getElementById('send')

  nEtapa.onblur = validarEtapa
  nClase.onblur = validarClase
  send.onclick = validarForm
}
/**
 * Realiza la validación del campo de `nickname` en un formulario.
 * @method
 * @param {Event} evento - El evento `blur` que activa la validación.
 */
const validarEtapa = evento => {
  const input = evento.target
  const errorSpan = document.getElementById('etapa-error')
  const regex = /^[A-Za-záéíóúñ\s]{3,40}$/

  if (!regex.test(input.value)) {
    input.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
    errorSpan.textContent = 'La etapa solo puede contener letras.'
  } else {
    input.style.filter = 'drop-shadow(0 0 0.2em lightgreen)'
    errorSpan.textContent = ''
  }
}

/**
 * Realiza la validación del campo de `Email` en un formulario.
 * @method
 * @param {Event} evento - El evento `blur` que activa la validación.
 */
const validarClase = evento => {
  const input = evento.target
  const errorSpan = document.getElementById('clase-error')
  const regex = /^[A-Za-záéíóúñ0-9]{1,10}$/

  if (!regex.test(input.value)) {
    input.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
    errorSpan.textContent = 'La clase solo puede contener letras y números sin espacios.'
  } else {
    input.style.filter = 'drop-shadow(0 0 0.2em lightgreen)'
    errorSpan.textContent = ''
  }
}

/**
     * Realiza la validación de un formulario completo y maneja su estado resultante.
     * @method
     */
const validarForm = (e) => {
  e.preventDefault()
  const form = document.getElementById('form-end')
  const inputs = document.querySelectorAll('input')
  const statusSpan = document.getElementById('status-message')
  const errorMessages = document.getElementsByClassName('error-message')

  let todosLosCamposLlenos = true
  let todosLosCamposVacios = true

  inputs.forEach(input => {
    if (input.id === 'etapa') {
      /**
                 * Realiza la validación del campo `nickname`
                 * @type {Function}
                 */
      validarEtapa({ target: input })
    } else if (input.id === 'clase') {
      /**
                 * Realiza la validación del campo `correo`
                 * @type {Function}
                 */
      validarClase({ target: input })
    }

    if (input.value !== '') {
      todosLosCamposVacios = false
    } else {
      todosLosCamposLlenos = false
    }
  })

  /**
         * Indica si todos los mensajes de error están vacíos
         * @type {boolean}
         */
  const todosLosMensajesVacios = Array.from(errorMessages).every(errorMessage => errorMessage.textContent === '')

  if (todosLosCamposLlenos && todosLosMensajesVacios) {
    statusSpan.textContent = ''
    form.style.animation = 'okAnimation 0.8s forwards'

    setTimeout(function () {
      form.submit()
    }, 1000)
  } else if (todosLosCamposLlenos && !todosLosMensajesVacios) {
    statusSpan.textContent = 'Algún campo es incorrecto'
  } else if (todosLosCamposVacios) {
    statusSpan.textContent = 'Todos los campos están vacíos'
  } else {
    statusSpan.textContent = 'Hay algún campo vacío'
  }
}
window.onload = inicio
