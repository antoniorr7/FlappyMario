// Obtener el div blanco
const whiteDiv = document.getElementById('whiteDiv')
whiteDiv.style.position = 'relative'
const redDiv = document.createElement('div')

redDiv.id = 'redDiv'
redDiv.style.width = '2%' // Ajusta el tamaño según tus necesidades
redDiv.style.height = '2%' // Ajusta el tamaño según tus necesidades
redDiv.style.background = 'red'
redDiv.style.position = 'absolute'
redDiv.style.display = 'none' // Comienza oculto

// Función para obtener las coordenadas del ratón
const obtenerCoordenadasRaton = (evento) => {
  // Obtener las dimensiones y la posición del rectángulo del elemento whiteDiv
  const rect = whiteDiv.getBoundingClientRect()

  // Calcular la posición del ratón en el eje X relativa a whiteDiv en porcentaje
  const xPorcentaje = Math.round(((evento.clientX - rect.left) / whiteDiv.offsetWidth) * 100)

  // Calcular la posición del ratón en el eje Y relativa a whiteDiv en porcentaje
  const yPorcentaje = Math.round(((evento.clientY - rect.top) / whiteDiv.offsetHeight) * 100)

  // Devolver un objeto con las coordenadas X e Y en porcentaje
  return { x: xPorcentaje, y: yPorcentaje }
}

// Función para crear el div rojo
const inicio = () => {
  const nombreConflicto = document.getElementById('nombreConflicto')
  const ejeX = document.getElementById('ejeX')
  const ejeY = document.getElementById('ejeY')
  const estadoConflicto = document.getElementById('estadoconflicto') // Agregado para obtener el estado del conflicto

  const send = document.getElementById('send')
  const whiteDiv = document.getElementById('whiteDiv')
  const statusMessage = document.getElementById('status-message')

  nombreConflicto.onblur = () => validarNombreConflicto(nombreConflicto)
  ejeX.onblur = () => validarEjeX(ejeX.value)
  ejeY.onblur = () => validarEjeY(ejeY.value)
  estadoConflicto.onblur = () => validarEstadoConflicto(estadoConflicto) // Agregado para validar el estado del conflicto

  // Asignar las coordenadas del clic al div
  const redDiv = document.createElement('div')
  whiteDiv.appendChild(redDiv)
  whiteDiv.addEventListener('click', (evento) => {
    const coordenadas = obtenerCoordenadasRaton(evento)
    const rojoBorrar = document.getElementById('divrojo')
    if (rojoBorrar) rojoBorrar.remove()

    redDiv.className = 'redDiv' // Asigna una clase para el estilo CSS

    redDiv.style.position = 'absolute'
    redDiv.style.display = 'block'
    redDiv.style.left = coordenadas.x + '%'
    redDiv.style.top = coordenadas.y + '%'
    redDiv.style.transition = 'left 0.3s, top 0.3s' // Agregar transición
    redDiv.style.zIndex = '1'
    redDiv.style.width = '20px'
    redDiv.style.height = '20px'
    redDiv.style.backgroundColor = 'red'

    validarEjeX(coordenadas.x)
    validarEjeY(coordenadas.y)
  })

  send.onclick = validarForm
}

const aplicarEstilo = (elemento, esValido) => {
  if (esValido) {
    elemento.style.filter = 'drop-shadow(0 0 0.2em lightgreen)'
  } else {
    elemento.style.filter = 'drop-shadow(0 0 0.4em #FF4562)'
  }
}

const validarNombreConflicto = (input) => {
  const errorSpan = document.getElementById('nombreConflicto-error')
  const regex = /^[A-Za-záéíóúñ\s]{3,40}$/

  if (input.value.length >= 40) {
    aplicarEstilo(input, false)
    errorSpan.textContent = 'El nombre del conflicto no puede exceder los 40 caracteres.'
  } else if (!regex.test(input.value)) {
    aplicarEstilo(input, false)
    errorSpan.textContent = 'El nombre del conflicto solo puede contener letras.'
  } else {
    aplicarEstilo(input, true)
    errorSpan.textContent = ''
  }
}

const validarEjeX = (valor) => {
  const ejeX = document.getElementById('ejeX');
  const errorSpan = document.getElementById('ejeX-error');

  // Verificar si es un número entre 0 y 100
  const numero = parseFloat(valor);
  if (isNaN(numero) || numero < 0 || numero > 100) {
    aplicarEstilo(ejeX, false);
    errorSpan.textContent = 'Eje X debe ser un número entre 0 y 100.';
  } else {
    ejeX.value = numero;
    aplicarEstilo(ejeX, true);
    errorSpan.textContent = '';
  }
};

const validarEjeY = (valor) => {
  const ejeY = document.getElementById('ejeY');
  const errorSpan = document.getElementById('ejeY-error');

  // Verificar si es un número entre 0 y 100
  const numero = parseFloat(valor);
  if (isNaN(numero) || numero < 0 || numero > 100) {
    aplicarEstilo(ejeY, false);
    errorSpan.textContent = 'Eje Y debe ser un número entre 0 y 100.';
  } else {
    ejeY.value = numero;
    aplicarEstilo(ejeY, true);
    errorSpan.textContent = '';
  }
};

// Agregada función para validar el estado del conflicto
const validarEstadoConflicto = (input) => {
  const errorSpan = document.getElementById('estadoConflicto-error')
  const regex = /^[A-Za-záéíóúñ\s]{3,20}$/

  if (!regex.test(input.value)) {
    aplicarEstilo(input, false)
    errorSpan.textContent = 'El estado del conflicto solo puede contener letras y debe tener entre 3 y 20 caracteres.'
  } else {
    aplicarEstilo(input, true)
    errorSpan.textContent = ''
  }
}

const validarForm = (e) => {
  e.preventDefault()
  let todosLosCamposLlenos = true
  let todosLosCamposVacios = true

  // Obtener los elementos del formulario
  const nombreConflicto = document.getElementById('nombreConflicto')
  const estadoConflicto = document.getElementById('estadoconflicto')
  const ejeX = document.getElementById('ejeX')
  const ejeY = document.getElementById('ejeY')
  const statusMessage = document.getElementById('status-message')
  const whiteDiv = document.getElementById('whiteDiv') // Asegúrate de que esté presente en tu HTML

  // Validar el nombre del conflicto
  validarNombreConflicto(nombreConflicto)

  // Validar las coordenadas ejeX y ejeY
  validarEjeX(ejeX.value)
  validarEjeY(ejeY.value)

  // Validar el estado del conflicto
  validarEstadoConflicto(estadoConflicto)

  // Validar que ejeX y ejeY sean números
  const ejeXValue = parseFloat(ejeX.value)
  const ejeYValue = parseFloat(ejeY.value)

  if (isNaN(ejeXValue) || isNaN(ejeYValue)) {
    statusMessage.textContent = 'Formulario no válido. Verifique los campos.'
    statusMessage.style.color = 'red'
    e.preventDefault() // Evitar que se envíe el formulario
    return
  }

  // Validar campos vacíos
  const inputs = [nombreConflicto, estadoConflicto, ejeX, ejeY]
  inputs.forEach((input) => {
    if (input.value !== '') {
      todosLosCamposVacios = false
    } else {
      todosLosCamposLlenos = false
    }
  })

  // Validar que todos los mensajes de error estén vacíos
  const errorMessages = document.getElementsByClassName('error-message')
  const todosLosMensajesVacios = Array.from(errorMessages).every((errorMessage) => errorMessage.textContent === '')

  if (todosLosCamposLlenos && todosLosMensajesVacios) {
    statusMessage.textContent = ''
    whiteDiv.style.animation = 'okAnimation 0.8s forwards'
    document.forms[0].style.animation = 'okAnimation 0.8s forwards'
    setTimeout(function () {
      // Otras acciones después de enviar el formulario
      statusMessage.textContent = 'Formulario enviado correctamente.'
      statusMessage.style.color = 'green'
    }, 1000)
    setTimeout(function () {
      document.forms[0].submit()
    }, 1000)
  } else if (todosLosCamposLlenos && !todosLosMensajesVacios) {
    statusMessage.textContent = 'Algún campo es incorrecto'
  } else if (todosLosCamposVacios) {
    statusMessage.textContent = 'Todos los campos están vacíos'
  } else {
    statusMessage.textContent = 'Hay algún campo vacío'
  }
}

window.onload = inicio
