import { Vista } from './vista.js'
/**
 * @class
 * @classdesc Clase que representa una vista para la gestión y validación de formularios.
 * @extends Vista
 * @author Nacho - Antonio - Mario
 * @license MIT
 * @param {Object} controlador - El controlador asociado a la vista.
 * @param {HTMLElement} base - El elemento base de la vista.
 */
export class VistaForm extends Vista {
  constructor (controlador, base) {
    super(controlador, base)
    const nickname = document.getElementById('nickname')
    this.correo = document.getElementById('correo')
    this.centro = document.getElementById('centro')
    this.cp = document.getElementById('cp')
    this.localidad = document.getElementById('localidad')
    const send = document.getElementById('send')

    nickname.onblur = this.validarNick
    this.correo.onblur = this.validarEmail
    this.centro.onchange = this.validarSelectC
    this.localidad.onchange = this.validarSelectL
    this.cp.onblur = this.validarCP
    send.onclick = this.validarForm
  }

  /**
 * Realiza la validación del campo de `nickname` en un formulario.
 * @method
 * @param {Event} evento - El evento `blur` que activa la validación.
 */

  validarNick = evento => {
    const input = evento.target
    const errorSpan = document.getElementById('nickname-error')
    const regex = /^[A-Za-záéíóúñ0-9]{3,20}$/

    if (!regex.test(input.value)) {
      input.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
      errorSpan.textContent = 'El nickname debe contener solo letras y números y tener entre 3 y 20 caracteres.'
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
  validarEmail = evento => {
    const input = evento.target
    const errorSpan = document.getElementById('correo-error')
    const regexCorreoGeneral = /^(\w{3,}\.?)*(\w{3,})@(\w{3,}\.?)*(\w{3,})\.[A-z]{2,}$/
    const regexCorreoGuadalupe = /^(\w+(\.\w+)*\.)*guadalupe@alumnado\.fundacionloyola\.net$|^(?!.*@alumnado\.fundacionloyola\.es$)\w+@?fundacionloyola\.es$/

    const centroSeleccionado = document.getElementById('centro').value

    const regex = centroSeleccionado === 'Virgen de Guadalupe' ? regexCorreoGuadalupe : regexCorreoGeneral

    if (!regex.test(input.value)) {
      input.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
      errorSpan.textContent = centroSeleccionado === 'Virgen de Guadalupe'
        ? 'El formato del correo electrónico no coincice con el del Virgen de Guadalupe'
        : 'El formato del correo electrónico no es válido.'
    } else {
      input.style.filter = 'drop-shadow(0 0 0.2em lightgreen)'
      errorSpan.textContent = ''
    }
  }

  /**
     * Realiza la validación del campo de `CP` en un formulario.
     * @method
     * @param {Event} evento - El evento `blur` que activa la validación.
     */
  validarCP = evento => {
    const input = evento.target
    const errorSpan = document.getElementById('cp-error')

    const localidadSeleccionada = document.getElementById('localidad').value
    const codigoPostal = input.value
    let regexCodigoPostal
    let mensajeError = ''

    switch (localidadSeleccionada) {
      case 'Badajoz':
      case 'Merida':
        regexCodigoPostal = /^06\d{3}$/
        break
      case 'Caceres': // Cáceres
        regexCodigoPostal = /^10\d{3}$/
        break
      case 'Sevilla': // Sevilla
        regexCodigoPostal = /^41\d{3}$/
        break
      default:
        regexCodigoPostal = /^\d{5}$/
        mensajeError = 'El código postal debe estar compuesto por 5 dígitos'
        break
    }

    if (!regexCodigoPostal.test(codigoPostal)) {
      input.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
      errorSpan.textContent = mensajeError || `El código postal no coincide con la localidad seleccionada: ${localidadSeleccionada}`
    } else {
      input.style.filter = 'drop-shadow(0 0 0.2em lightgreen)'
      errorSpan.textContent = ''
    }
  }

  /**
     * Realiza la validación del campo de select `centro` en un formulario , para que se seleccione algún centro que no sea el por defecto.
     * @method
     * @param {Event} evento - El evento que activa la validación en este caso onchange.
     */
  validarSelectC = (evento) => {
    const input = evento.target

    if (input.selectedIndex === 0) {
      input.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
    } else {
      input.style.filter = 'none'
    }

    if (this.correo.value !== '') {
      // Se llama al método validarEmail pasando el campo de `correo` como parámetro.
      this.validarEmail({ target: this.correo })
    }
  }

  /**
     * Realiza la validación del campo de select `centro` en un formulario , para que se seleccione algún centro que no sea el por defecto.
     * @method
     * @param {Event} evento - El evento que activa la validación en este caso onchange.
     */
  validarSelectL = (evento) => {
    const input = evento.target

    if (input.selectedIndex === 0) {
      input.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
    } else {
      input.style.filter = 'none'
    }

    if (this.cp.value !== '') {
      // Se llama al método validarCP pasando el campo de `cp` como parámetro.
      this.validarCP({ target: this.cp })
    }
  }

  /**
     * Realiza la validación de un formulario completo y maneja su estado resultante.
     * @method
     */
  validarForm = () => {
    /**
         *  Elemento del formulario
         *  @type {HTMLElement}
         */
    const form = document.getElementById('form-end')

    /**
         * Colección de elementos de entrada del formulario
         * @type {NodeListOf<HTMLInputElement>}
         */
    const inputs = document.querySelectorAll('input')

    /**
         * Elemento de selección de centros
         * @type {HTMLSelectElement}
         */
    const selectCentros = document.querySelectorAll('select')[0]

    /**
         * Elemento de selección de localidad
         * @type {HTMLSelectElement}
         */
    const selectLocalidad = document.querySelectorAll('select')[1]

    /**
         * Elemento de espacio para mensajes de estado
         * @type {HTMLElement}
         */
    const statusSpan = document.getElementById('status-message')

    /**
         * Colección de elementos para mensajes de error
         * @type {HTMLCollection}
         */
    const errorMessages = document.getElementsByClassName('error-message')

    let todosLosCamposLlenos = true
    let todosLosCamposVacios = true

    inputs.forEach(input => {
      if (input.id === 'nickname') {
        /**
                 * Realiza la validación del campo `nickname`
                 * @type {Function}
                 */
        this.validarNick({ target: input })
      } else if (input.id === 'correo') {
        /**
                 * Realiza la validación del campo `correo`
                 * @type {Function}
                 */
        this.validarEmail({ target: input })
      } else if (input.id === 'cp') {
        /**
                 * Realiza la validación del campo `cp`
                 * @type {Function}
                 */
        this.validarCP({ target: input })
      }

      if (selectCentros.selectedIndex === 0) {
        selectCentros.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
      } else {
        selectCentros.style.filter = 'none'
      }

      if (selectLocalidad.selectedIndex === 0) {
        selectLocalidad.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
      } else {
        selectLocalidad.style.filter = 'none'
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

    if (todosLosCamposLlenos && todosLosMensajesVacios && this.centro.selectedIndex !== 0 && this.localidad.selectedIndex !== 0) {
      statusSpan.textContent = ''
      form.style.animation = 'okAnimation 3s forwards'

      setTimeout(function () {
        form.style.animation = 'sendTop 1.8s forwards'
        form.parentElement.style.animation = 'hideBG 2s forwards'
      }, 3000)

      setTimeout(function () {
        form.parentElement.style.display = 'none'
      }, 4800)
    } else if (todosLosCamposLlenos && !todosLosMensajesVacios) {
      statusSpan.textContent = 'Algún campo es incorrecto'
    } else if (todosLosCamposVacios) {
      statusSpan.textContent = 'Todos los campos están vacíos'
    } else {
      statusSpan.textContent = 'Hay algún campo vacío'
    }
  }
}
