import { Vista } from './vista.js'
/**
 * Clase que representa la vista principal del juego, que extiende de la clase `Vista`.
 * @extends Vista
 * @author Nacho - Antonio - Mario
 * @license MIT
 * @param {Object} controlador - El controlador asociado a la vista.
 * @param {HTMLElement} base - El elemento base de la vista.
 */
export class VistaPrincipal extends Vista {
  /**
   * Constructor de la clase VistaPrincipal.
   * @constructor
   * @param {Object} controlador - El controlador asociado a la vista.
   * @param {HTMLElement} base - El elemento base de la vista.
   */
  constructor (controlador, base) {
    super(controlador, base)

    this.personajes
    this.cargarPersonajes()
    this.cargarNiveles()

    const btnRestart = document.getElementById('restart')
    const btnRanking = this.base.querySelectorAll('button')[3]
    const btnSettings = this.base.querySelectorAll('button')[4]
    const btnFacil = document.getElementById('facil')
    const btnMedio = document.getElementById('medio')
    const btnDificil = document.getElementById('dificil')

    this.hora = document.getElementById('hora')
    this.puntuacion = document.getElementById('puntuacion')
    this.btnTheme = this.base.querySelector('#theme')
    this.tablero = document.getElementById('divtablero')
    this.divIzq = document.getElementById('divizquierda')
    this.gameStarted = false
    this.clickerMode = false
    
    this.divPersonajes = document.getElementById('divderecha')
    this.divImagenesPersonjanes = document.getElementById('divpersonajes')
    this.titulo = document.getElementById('titulo')
    this.info = this.base.querySelector('#info')
    this.end = this.base.querySelector('#end')
    this.form = document.getElementById('form-end')
    this.logo = this.base.querySelector('#logo')
    this.showForm = false
    this.nombreapp = document.getElementById('nombreapp')

    //Dificultades
    this.velocidadFacil = 40
    this.velocidadMedio = 30
    this.velocidadDificil =20
    this.cantidadPersonasFacil=5
    this.cantidadPersonasMedio=50
    this.cantidadPersonasDificil=20
    this.dificultad = this.velocidadFacil
    this.cantidadPersonasNivel=this.cantidadPersonasFacil

    this.tablero.style.position = 'relative'
    this.tablero.style.backgroundRepeat ='no-repeat'
    this.tablero.style.backgroundSize ='cover'

    this.score = 0
    this.puntuacion.textContent = '0' + this.score

    //Gestión Niveles
    this.nivelActual = 0
    this.personasRecogidas=0

    //Gestion Banderas
    this.banderasGeneradas=0
    this.banderasRecogidas=0
    this.cantidadBanderas=0
    this.conflictoActual=1

    this.puntuacion = document.getElementById('puntuacion')
    this.posX
    this.posY
    this.dir = null
    this.distanciapaso = 1
    this.temp = 0
    this.reload = this.dificultad
    this.part = []
    this.fila = 0
    this.score = 0
    this.personita
    this.tiempo


    // Agregar eventos de arrastrar y soltar al tablero
    this.tablero.addEventListener('dragover', this.dragOver)
    this.tablero.addEventListener('dragenter', this.dragEnter)
    this.tablero.addEventListener('dragleave', this.dragLeave)
    this.tablero.addEventListener('drop', this.drop)

    //Eventos de los botones de dificultad
    btnFacil.onclick = () => this.cambioDificultad(this.velocidadFacil);
    btnMedio.onclick = () => this.cambioDificultad(this.velocidadMedio);
    btnDificil.onclick = () => this.cambioDificultad(this.velocidadDificil);
    btnRanking.onclick = this.irRanking
    btnSettings.onclick = this.irSettings
    this.btnTheme.onclick = this.changeTheme
    btnRestart.onclick = this.restartGame
    this.logo.onclick = this.clickerButtonActions
    window.onkeydown = this.mostrarFormulario

    window.getComputedStyle(this.hora).display === 'none' ? this.clickerMode = false : this.clickerMode = true
    this.setConfetti(this.clickerMode)
    setInterval(this.mostrarHora, 1000)
  }
  asignarNames () {
    const figcaptions = document.querySelectorAll('figcaption')

    const names = this.controlador.devolverNames()
    for (let i = 0; i < figcaptions.length; i++) {
      if (i < names.length) {
        figcaptions[i].innerText = names[i]
      } else {
        figcaptions[i].innerText = ''
      }
    }
  }

  setConfetti = (clicker) => {
    if (clicker) {
      const confetti = new Confetti('logo')
      confetti.setCount(100)
      confetti.setSize(1)
      confetti.setPower(5)
      confetti.setFade(true)
      confetti.destroyTarget(false)
    } else {
      const confetti = new Confetti('logo')
      confetti.setCount(1200)
      confetti.setSize(1.6)
      confetti.setPower(50)
      confetti.setFade(false)
      confetti.destroyTarget(true)
    }
  }

  /**
   * Realiza la navegación a la vista de configuración.
   * @method
  */
  irSettings = () => {
    this.controlador.irAVista(this.controlador.vistaSettings)
    this.divIzq.style.animation = 'none'
    this.divPersonajes.style.animation = 'none'
    this.info.style.animation = 'none'
    this.titulo.style.animation = 'none'
  }

  /**
   * Realiza la navegación al ranking.
   * @method
  */
  irRanking = () => {
    this.controlador.irAVista(this.controlador.vistaRanking)
    this.divIzq.style.animation = 'none'
    this.divPersonajes.style.animation = 'none'
    this.info.style.animation = 'none'
    this.titulo.style.animation = 'none'
  }

  /**
   * Controla la visualización del formulario cuando se presiona la tecla Enter.
   * @method
   * @param {Event} evento - El evento del teclado que activa la acción.
  */
  mostrarFormulario = evento => {
    if (evento.keyCode === 13 && !this.showForm && this.partidaTerminada) {
      this.controlador.overlayForm(this.form)
      this.showForm = false
    }
  }

  mostrarHora () {
    const fecha = new Date()
    let hora = fecha.getHours()
    let minutos = fecha.getMinutes()

    // Asegúrate de que los números siempre tengan dos dígitos
    if (hora < 10) hora = '0' + hora
    if (minutos < 10) minutos = '0' + minutos

    const horaActual = hora + ':' + minutos

    // Actualiza el contenido del elemento HTML con la hora actual
    this.hora.innerHTML = horaActual
  }

  clickerButtonActions = (e) => {
    const target = e.target
    if (!this.clickerMode) {
      // Aplicar transición de opacidad
      target.style.transition = 'opacity 2s ease'
      target.style.opacity = 0

      setTimeout(() => {
        target.style.visibility = ''
        target.style.opacity = 1
      }, 5000)
    } else {
      clearTimeout(this.timeout)

      target.style.animation = 'clickerOpacityIn 1s forwards'
      this.score += 10
      this.puntuacion.textContent = this.score.toString().padStart(2, '0')

      this.timeout = setTimeout(() => {
        target.style.animation = 'clickerOpacityOut 4s forwards'
        this.score = 0
        this.puntuacion.textContent = '00'
      }, 3000)
    }
  }

  /**
   * Reinicia el juego, eliminando todos los personajes del tablero y restableciendo los elementos de animación y visualización.
   * @method
  */
  restartGame = () => {
    // Remove all the characters from the tablero
    if (this.gameStarted) {
      const personajes = this.tablero.querySelectorAll('.personaje')
      this.tablero.style.backgroundImage= "none"
      personajes.forEach(personaje => {
        personaje.remove()
      })
      while (this.tablero.firstChild) {
        this.tablero.removeChild(this.tablero.firstChild)
      }
      while (this.part[0].firstChild) {
        this.part[0].removeChild(this.part[0].firstChild)
      }
      
      if(this.reflexion)
        this.tablero.appendChild(this.reflexion)
      

      // Reset the animations and display elements
      this.divIzq.style.animation = 'shortBoard 1s forwards'
      this.divPersonajes.style.animation = 'appearRight 1s forwards'
      this.info.style.animation = 'mostrarTexto 1s forwards'
      this.titulo.style.animation = 'mostrarTexto 1s forwards'
      this.end.style.animation = 'none'
      this.form.style.animation = 'none'
      this.tablero.style.filter = 'none'
      this.divPersonajes.style.pointerEvents = 'auto'

      // Reset the showForm variable
      this.showForm = false
      this.gameStarted = false
      this.posX
      this.posY
      this.dir = -1
      this.distanciapaso = 1
      this.temp = 1
      this.reload = this.dificultad

      //Reniciar el nombre de la app
      this.nombreapp.textContent = 'CULTURAL CHAIN'

      //Reinicio del nivel
      this.nivelActual = 0
      this.personasRecogidas=0
      this.banderasGeneradas=0
      this.banderasRecogidas=0
      this.fila = 0
      this.conflictoActual=1
      this.score = 0
      this.puntuacion.textContent = '0' + this.score
      clearInterval(this.intervalo)

      this.gameStarted = false
    } else {
      const restartImg = document.querySelector('#restart > img')
      restartImg.style.animation = 'shakeAnimation 0.3s ease-in-out'
      setTimeout(() => {
        restartImg.style.animation = 'none'
      }, 300)
    }
  }

  /**
     * Gestiona el evento dragStart para el personaje: cambia la opacidad y el filtro, y establece los datos de transferencia.
     * @method
     * @param {DragEvent} e - El evento de arrastre (dragStart).
     */
  dragStart (e) {
    this.style.opacity = '0.6'
    this.style.filter = 'drop-shadow(0px 0px 15px #000)'
    e.dataTransfer.setData('text/plain', e.target.id)
  }

  /**
     * Gestiona el evento dragEnd para el personaje: restablece la opacidad y el filtro.
     * @method
     * @param {DragEvent} e - El evento de arrastre (dragEnd).
     */
  dragEnd (e) {
    this.style.opacity = '1'
    this.style.filter = 'none'
  }

  /**
     * Gestiona el evento dragOver para el tablero: previene el comportamiento predeterminado y aplica un filtro de sombra.
     * @method
     * @param {DragEvent} e - El evento de arrastre (dragOver).
     */
  dragOver (e) {
    e.preventDefault()
    this.style.filter = 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.5))'
  }

  /**
     * Gestiona el evento dragEnter para el tablero: previene el comportamiento predeterminado y aplica un filtro de sombra.
     * @method
     * @param {DragEvent} e - El evento de arrastre (dragEnter).
     */
  dragEnter (e) {
    e.preventDefault()
    this.style.filter = 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.5))'
  }

  /**
     * Gestiona el evento dragLeave para el tab ```javascript
     * Gestiona el evento dragLeave para el tablero: elimina el filtro de sombra.
     * @method
     */
  dragLeave () {
    this.style.filter = 'none'
  }

  /**
     * Gestiona el evento drop para el tablero: previene el comportamiento predeterminado, obtiene el ID del personaje arrastrado y clonado, establece las coordenadas de posición y agrega el personaje al tablero.
     * @method
     * @param {DragEvent} e - El evento de arrastre (drop).
     */
  drop = (e) => {
    e.preventDefault()
    this.part = []
    const personajeId = e.dataTransfer.getData('text/plain')
    const personaje = document.getElementById(personajeId)

    const personajeSelected = personaje.cloneNode(true)

    //Establecer el nombre del nivel
    this.nombreapp.textContent = this.niveles[this.nivelActual].nombre.toUpperCase()

    // Obtener las coordenadas del evento de soltar en relación con el tablero

    const boardRect = this.tablero.getBoundingClientRect()
    this.posX = ((e.clientX - boardRect.left) / boardRect.width) * 100
    this.posY = ((e.clientY - boardRect.top) / boardRect.height) * 100

    // Establecer las coordenadas de posición del personaje
    this.part.push(personajeSelected)
    this.tablero.appendChild(this.part[0])
    this.part[0].style.position = 'absolute'
    // Establecer las coordenadas de posición del personaje
    this.part[0].style.left = this.posX + '%'
    this.part[0].style.top = this.posY + '%'

    // Agregar el personaje al tablero
    this.showForm = true
    this.tablero.style.filter = 'none' // Restaurar el fondo a su estado original
    this.divPersonajes.style.animation = 'disappearRight 1s forwards'
    this.divIzq.style.animation = 'enlargeBoard 1.5s forwards'
    this.titulo.style.animation = 'ocultarTexto 0.5s forwards'
    personajeSelected.style.pointerEvents = 'none'
    personajeSelected.style.opacity = '1'
    personajeSelected.style.width = '2.3%'
    this.divPersonajes.style.pointerEvents = 'none'
    this.info.style.animation = 'ocultarTexto 1.5s forwards'
    this.end.style.animation = 'mostrarTexto 4s forwards'
    this.gameStarted = true

    let info = document.getElementById("info")
    if(info)
      this.tablero.removeChild(info)
      

    //Cargar niveles y conflictos
    this.cargarFondo(this.niveles[this.nivelActual].imagen)
    this.generarConflictos()

    window.addEventListener('keydown', this.direccion)
    window.addEventListener('touchstart', this.direccion)
    this.intervalo = setInterval(() => this.update(), this.reload)
    this.temp = 1
  }

  /**
   * Mueve el objeto (imagen) en el juego hacia adelante según la dirección actual.
   * @method
   */
  avanzar = () => {
    if (this.dir === 1) {
      this.part[0].style.top = this.posY - this.distanciapaso + '%'
      this.posY = this.posY - this.distanciapaso
    }
    if (this.dir === 2) {
      this.part[0].style.left = this.posX + this.distanciapaso + '%'
      this.posX = this.posX + this.distanciapaso
    }
    if (this.dir === 3) {
      this.part[0].style.top = this.posY + this.distanciapaso + '%'
      this.posY = this.posY + this.distanciapaso
    }
    if (this.dir === 4) {
      this.part[0].style.left = this.posX - this.distanciapaso + '%'
      this.posX = this.posX - this.distanciapaso
    }
    this.part[0].style.animation = 'personaAndando 0.2s infinite'
  }

  /**
   * Maneja la dirección del objeto (imagen) en el juego en función de la entrada del usuario.
   * @method
   * @param {Event} event - El evento de teclado o táctil que activa la acción.
   */
  direccion = (event) => {
    if (event.key == 'w' && this.dir != 3) this.dir = 1
    if (event.key == 'd' && this.dir != 4) this.dir = 2
    if (event.key == 's' && this.dir != 1) this.dir = 3
    if (event.key == 'a' && this.dir != 2) this.dir = 4

    // Verifica si el evento es táctil
    if(event.touches && !this.showForm && this.partidaTerminada) {
      this.controlador.overlayForm(this.form)
      this.showForm = false
    }
    if (event.touches && event.touches.length > 0) {
    // Obtén las coordenadas x del toque
      const touchX = event.touches[0].clientX

      // Obtiene el ancho total de la pantalla
      const screenWidth = window.innerWidth

      // Si el toque fue en la mitad izquierda, resta 1 a dir; si fue en la mitad derecha, suma 1 a dir
      this.dir = touchX < screenWidth / 2 ? (this.dir === 1 ? 4 : this.dir - 1) : this.dir === 4 ? 1 : this.dir + 1

      // Asegura que dir esté en el rango de 1 a 4
      if (this.dir > 4) {
        this.dir = 1
      } else if (this.dir < 1) {
        this.dir = 4
      }
    }
  }

  /**
   * Mueve el objeto (imagen) en el juego y realiza diversas acciones según el estado del juego.
   * @method
   */
  update = () => {
    if(this.dir>0){
      for (let i = this.fila; i > 0; i--) {
        // Mover cada parte de la serpiente a la posición de la parte anterior
        this.part[i].style.left = this.part[i - 1].style.left
        this.part[i].style.top = this.part[i - 1].style.top
      }
      //Detectar colision con uno mismo
      for (let i = 1; i < this.fila; i++) {
        if (this.part[0].style.left == this.part[i + 1].style.left && this.part[0].style.top == this.part[i + 1].style.top) { this.terminarPartida() }
      }
      this.gestionNivel()
      this.avanzar() // Mover la this.part[0]
      this.limites()
      this.generacionPersonas()
      this.hueco()
      this.recoger()
      this.generacionBanderas()
      this.temp++
    }
  }
  /**
   * Aplica límites al objeto (imagen) en el juego para que no salga del tablero.
   * @method
   */
  limites = () => {
    // Obtener las dimensiones reales del tablero
    const tableroAncho = this.tablero.clientWidth
    const tableroAlto = this.tablero.clientHeight

    // Convertir porcentaje a píxeles
    const posXPixels = (this.posX / 100) * tableroAncho
    const posYPixels = (this.posY / 100) * tableroAlto

    // Establecer límite derecho
    if (posXPixels > tableroAncho - 15) {
      this.posX = 0
    }
    if (posXPixels < 0) {
      this.posX = 99
    }

    // Establecer límite inferior
    if (posYPixels > tableroAlto - 40) {
      this.posY = 0
    }

    // Establecer límite superior
    if (posYPixels < 0) {
      this.posY = 95
    }
  }

  /**
 * Genera personas de manera aleatoria en el tablero.
 */
  generacionPersonas = () => {
    if (this.temp % 50-this.reload === 0) {
      const tableroAncho = this.tablero.clientWidth-this.part[0].offsetWidth*2
      const tableroAlto = this.tablero.clientHeight-this.part[0].offsetHeight*2

       // Obtén todos los elementos img dentro del div
      var imagenes = this.divImagenesPersonjanes.getElementsByTagName('img');

      // Convierte la colección de imágenes en un array
      var arrayDeImagenes = Array.from(imagenes);

      // Crear un nuevo elemento img en lugar de div
      const nuevaImagen = document.createElement('img')
      nuevaImagen.style.width = '2.3%'
      nuevaImagen.style.animation = 'personaQuieta 3s infinite'

      const numeroAleatorio = Math.floor(Math.random() * arrayDeImagenes.length)

      // Crear la URL de la imagen utilizando el número formateado

      nuevaImagen.src = arrayDeImagenes[numeroAleatorio].src

      // Establecer el estilo del borde de la nueva imagen

      // Calcular posiciones aleatorias dentro del tablero
      const posX = Math.floor(Math.random() * tableroAncho - 10)
      const posY = Math.floor(Math.random() * tableroAlto - 10)

      // Establecer la posición absoluta de la nueva imagen dentro del tablero
      nuevaImagen.style.position = 'absolute'
      nuevaImagen.style.left = posX+this.part[0].offsetWidth + 'px'
      nuevaImagen.style.top = posY+this.part[0].offsetHeight+ 'px'
      nuevaImagen.classList.add('generado')

      // Añadir la nueva imagen al elemento con el id 'tablero'
      this.tablero.appendChild(nuevaImagen)
    }
  }

  /**
 * Genera banderas de manera aleatoria en el tablero.
 */
  generacionBanderas = () => {
    if(this.banderasGeneradas<this.cantidadBanderas){
      let numero = (50-this.reload)*20
      if (this.temp % numero === 0) {
        let tableroAncho = this.tablero.clientWidth-this.part[0].offsetWidth*2
        let tableroAlto = this.tablero.clientHeight-this.part[0].offsetHeight*2
    
        // Crear un nuevo elemento img en lugar de div
        let nuevaBandera = document.createElement('img')
    
        // Crear la URL de la imagen utilizando el número formateado
        nuevaBandera.src = 'img/objetos/bandera.png'
    
        // Calcular posiciones aleatorias como porcentaje del tamaño del tablero
        let posX = Math.floor(Math.random() * tableroAncho - 10)
        let posY = Math.floor(Math.random() * tableroAlto - 10)
    
        // Establecer la posición y tamaño de la nueva bandera en porcentajes
        nuevaBandera.style.position = 'absolute'
        nuevaBandera.style.height = '4%' // Cambia este valor según tus preferencias
        nuevaBandera.style.width = '4%'  // Cambia este valor según tus preferencias
        nuevaBandera.style.left = posX+this.part[0].offsetWidth + 'px'
        nuevaBandera.style.top = posY+this.part[0].offsetHeight + 'px'
        nuevaBandera.classList.add('bandera')
    
        // Añadir la nueva bandera al elemento con el id 'tablero'
        this.tablero.appendChild(nuevaBandera)
        this.banderasGeneradas++
      }
    }
}

  /**
 * Recoge la persona en la posición actual y actualiza la puntuación.
 */
  recoger = () => {
    // Detectar el objeto (imagen) en las coordenadas actuales del this.part[0]
    const objetoEnPunto = this.detectarColision();
  
    if (objetoEnPunto && objetoEnPunto.className === 'generado') {
      this.score = this.score + 10;
      this.puntuacion.textContent = '' + this.score;
      const imagenRecogida = new Image();
      imagenRecogida.style.width = '2.3%';
  
      imagenRecogida.src = objetoEnPunto.src;
      this.personita = imagenRecogida;
      this.tiempo = this.temp;
  
      // Almacenamos una referencia a "this" para usar dentro de la función de temporización
      const self = this;
  
      // Animación al recoger a una persona
      this.tablero.style.animation = 'recogerPersona 0.3s';
  
      // Luego, después de un breve momento, eliminamos la animación
      setTimeout(function() {
        // Usamos la referencia almacenada ("self") para acceder a "this.tablero"
        self.tablero.style.animation = 'none';
      }, 30);
  
      // Remove de la imagen cogida
      objetoEnPunto.remove();
      this.personasRecogidas++;
  
      // Añadir la imagen recogida al final de la cola de la serpiente
    }
  
    if (objetoEnPunto && objetoEnPunto.className === 'bandera') {
      let conflictos = this.tablero.querySelectorAll('.conflictos');
      let conflicto=conflictos[this.conflictoActual]
      this.conflictoActual++
      this.score += 50
      this.puntuacion.textContent = '' + this.score;
    
      // Obtén las coordenadas x e y del conflicto en porcentaje
      let xConflict = parseFloat(conflicto.style.left);
      let yConflict = parseFloat(conflicto.style.top);
    
      // Verifica si las coordenadas son números válidos
      if (!isNaN(xConflict) && !isNaN(yConflict)) {
        // Mueve el objetoEnPunto hacia las coordenadas del conflicto con animación
        this.moverElementoConAnimacion(objetoEnPunto, xConflict, yConflict, 1000);
      } else {
        console.error('Las coordenadas del conflicto no son válidas.');
      }
    }
  };
  /**
 * Une una imagen al final de la fila en el tablero.
 * @param {Image} imagen - La imagen que se va a unir.
 */
  unir = (imagen) => {
    this.fila++
    this.part.push(imagen)
    this.tablero.appendChild(this.part[this.fila])
    // Calcular la posición con un espacio entre cada imagen (ajusta el valor según sea necesario)
    const nuevaPosicionLeft = parseInt(this.part[this.fila - 1].style.left, 10) + this.part[0].offsetWidth

    // Ajustar la posición de la nueva imagen en relación con la imagen anterior
    this.part[this.fila].style.position = 'absolute'
    this.part[this.fila].style.left = nuevaPosicionLeft + 'px'
    this.part[this.fila].style.top = this.part[0].style.top
    this.part[this.fila].style.animation = 'personaAndando 0.2s infinite'

    this.tablero.appendChild(this.part[this.fila])
  }

  /**
 * Crea un hueco en la fila después de un tiempo determinado.
 */
  hueco = () => {
    if (this.temp == this.tiempo + 1) {
      this.unir(new Image())
    }
    if (this.temp == this.tiempo + 2) {
      this.unir(this.personita)
    }
  }
  cargarNiveles() {
    var arrayResultado = []; // Array para almacenar la información estructurada
    $.ajax({
        url: "http://localhost/2324_2DAW_CULTURAL_CHAIN/src/php/ajaxniveles.php",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: (data) => {
            // Iterar sobre los datos recibidos
            for (var i = 0; i < data.length; i++) {
                var otherData = data[i].otherData;

                // Parsear el campo imagen con JSON.parse
                var imagenDecodificada = otherData.imagen;

                // Estructurar los datos
                var elemento = {
                    nombre: otherData.nombrepais,
                    imagen: imagenDecodificada,
                    conflictos: otherData.conflictos,
                    reflexiones: otherData.reflexiones,
                };

                // Agregar el elemento al arrayResultado
                arrayResultado.push(elemento);
            }
            // Ahora, arrayResultado contiene la estructura deseada
            this.niveles = arrayResultado;
            this.cantidadBanderas = this.niveles[this.nivelActual].conflictos.length;
            this.listapersonajes.forEach(personaje => {
              personaje.addEventListener('dragstart', this.dragStart)
              personaje.addEventListener('dragend', this.dragEnd)
            })
        },
        error: function (status, error) {
            console.error("Error en la solicitud AJAX: " + status + " - " + error);
        }
    });
  }
  cargarPersonajes(){
    var arrayResultado = []; // Array para almacenar la información estructurada
    $.ajax({
        url: "http://localhost/2324_2DAW_CULTURAL_CHAIN/src/php/ajaxpersonajes.php",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: (data) => {
            // Iterar sobre los datos recibidos
            for (var i = 0; i < data.length; i++) {
                var otherData = data[i].otherData;

                // Estructurar los datos
                var elemento = {
                    nombre: otherData.nombre,
                    imagen: otherData.imagen,
                };

                // Agregar el elemento al arrayResultado
                arrayResultado.push(elemento);
            }
            // Ahora, arrayResultado contiene la estructura deseada
            this.personajes = arrayResultado;
            this.controlador.almacenarNames(this.cargarNombres())
            this.aniadirPersonajes()

            this.listapersonajes = this.base.querySelectorAll('.personaje')
            
            this.asignarNames()
        },
        error: function (status, error) {
            console.error("Error en la solicitud AJAX: " + status + " - " + error);
        }
    });
  }
  aniadirPersonajes() {
    this.personajes.forEach((personaje,i) => {
        var figure = document.createElement("figure");
        var img = document.createElement("img");
        var figcaption = document.createElement("figcaption");
        
        img.src = "data:image/png;base64," + personaje.imagen;
        img.className = "personaje";
        img.id = this.personajes[i].nombre
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        
        this.divImagenesPersonjanes.appendChild(figure);
    });
}
  cargarNombres(){
    let resultado = []
    for(let i = 0 ;i<this.personajes.length;i++)
    {
      resultado.push(this.personajes[i].nombre)
    }
    return resultado
  }

  cargarFondo(imagen){
    this.tablero.style.backgroundImage = "url('data:image/png;base64,"+imagen+"')"
  }
  cambioDificultad(valor) {
    this.dificultad = valor
    this.reload=this.dificultad
    this.cantidadPersonasRecoger()
  }
  cantidadPersonasRecoger(){
    if(this.dificultad==this.velocidadFacil)
      this.cantidadPersonasNivel=this.cantidadPersonasFacil
    if(this.dificultad==this.velocidadMedio)
    this.cantidadPersonasNivel=this.cantidadPersonasMedio
    if(this.dificultad==this.velocidadDificil)
    this.cantidadPersonasNivel=this.cantidadPersonasDificil
  }
  detectarColision = () => {
    let punto = [];

    punto[0] = document.elementFromPoint(
        this.part[0].getBoundingClientRect().left + this.part[0].offsetWidth,
        this.part[0].getBoundingClientRect().top + this.part[0].offsetHeight
    );
    punto[1] = document.elementFromPoint(
        this.part[0].getBoundingClientRect().left + this.part[0].offsetWidth,
        this.part[0].getBoundingClientRect().top
    );
    punto[2] = document.elementFromPoint(
        this.part[0].getBoundingClientRect().left,
        this.part[0].getBoundingClientRect().top + this.part[0].offsetHeight
    );
    punto[3] = document.elementFromPoint(
        this.part[0].getBoundingClientRect().left,
        this.part[0].getBoundingClientRect().top
    );
    punto[4] = document.elementFromPoint(
      this.part[0].getBoundingClientRect().left + this.part[0].offsetWidth/2,
        this.part[0].getBoundingClientRect().top + this.part[0].offsetHeight/2
  );

    for (let i = 0; i < 5; i++) {
        if (punto[i] && punto[i].classList.contains('generado') || punto[i].classList.contains('bandera')) {
            return punto[i];
        }
    }

    return false;
}
moverElementoConAnimacion(objeto, destinoX, destinoY, duracion) {
    let inicioX = parseFloat(objeto.style.left) || 0;
    let inicioY = parseFloat(objeto.style.top) || 0;
    let startTime;

    // Convierte destinoX y destinoY de porcentajes a píxeles
    let contenedorAncho = objeto.parentElement.clientWidth;
    let contenedorAlto = objeto.parentElement.clientHeight;
    let destinoXEnPixeles = (destinoX / 100) * contenedorAncho;
    let destinoYEnPixeles = (destinoY / 100) * contenedorAlto;

    objeto.classList.remove('bandera');

    const animar = (timestamp) => {
      if (!startTime) startTime = timestamp;

      let tiempoTranscurrido = timestamp - startTime;
      let progreso = tiempoTranscurrido / duracion;

      if (progreso < 1) {
        let nuevaX = inicioX + (destinoXEnPixeles - inicioX) * progreso;
        let nuevaY = inicioY + (destinoYEnPixeles - inicioY) * progreso;

        objeto.style.left = nuevaX + 'px';
        objeto.style.top = nuevaY + 'px';

        requestAnimationFrame(animar);
      } else {
        objeto.style.left = destinoXEnPixeles + 'px';
        objeto.style.top = destinoYEnPixeles + 'px';

        objeto.classList.add('nobandera');

        // Aumenta this.banderasrecogidas al finalizar la animación
        this.banderasRecogidas++;
        // Puedes hacer más acciones aquí después de recoger la bandera
      }
    };

    requestAnimationFrame(animar);
  }
terminarPartida(){
  let numReflexiones = this.niveles[this.nivelActual].reflexiones.length
  let numRandom = Math.floor(Math.random() * numReflexiones)
  let titulo
  let contenido
  var parrafo = document.createElement("p")

  if(numReflexiones)
  {
    titulo=this.niveles[this.nivelActual].reflexiones[numRandom].titulo
    contenido=this.niveles[this.nivelActual].reflexiones[numRandom].contenido
    parrafo.id ="info"
    parrafo.innerHTML= titulo+"<br>"+contenido
    this.reflexion = parrafo
  }

  this.partidaTerminada = true
  this.restartGame()
}
gestionNivel(){
  if(this.personasRecogidas>=this.cantidadPersonasNivel && this.banderasRecogidas>=this.cantidadBanderas)
    this.pasarnivel()
}
pasarnivel(){
  if(this.nivelActual===this.niveles.length-1)
    this.nivelActual=-1
  this.nivelActual++
  this.nombreapp.textContent = this.niveles[this.nivelActual].nombre.toUpperCase()
  this.cargarFondo(this.niveles[this.nivelActual].imagen)

  let elementosGenerados = this.tablero.querySelectorAll('.generado');
  elementosGenerados.forEach(elemento => {
    this.tablero.removeChild(elemento);
  });
  elementosGenerados = this.tablero.querySelectorAll('.nobandera');
  elementosGenerados.forEach(elemento => {
    this.tablero.removeChild(elemento);
  });
  elementosGenerados = this.tablero.querySelectorAll('.conflictos');
  elementosGenerados.forEach(elemento => {
    this.tablero.removeChild(elemento);
  });

  this.banderasGeneradas=0
  this.banderasRecogidas=0
  this.conflictoActual=1
  this.cantidadBanderas=this.niveles[this.nivelActual].conflictos.length
  this.personasRecogidas=0
  this.generarConflictos()
}
generarConflictos(){
  for(let i =0;i<this.niveles[this.nivelActual].conflictos.length;i++)
  {
    let x=this.niveles[this.nivelActual].conflictos[i].x
    let y=this.niveles[this.nivelActual].conflictos[i].y
    let conflicto = document.createElement('div')
    let nombre= document.createElement('p')
    
    conflicto.className = "conflictos"
    conflicto.style.width='6%'
    conflicto.style.height='6%'
    conflicto.style.position='absolute'
    conflicto.style.left=x+'%'
    conflicto.style.top=y+'%'
    conflicto.style.backgroundImage='url("../src/img/nivel/conflicto.jpg")'
    conflicto.style.backgroundSize='cover'
    nombre.className = "conflictos"
    nombre.style.left=x-1+'%'
    nombre.style.top=(parseFloat(y) + 3)+'%'
    nombre.style.color='black'
    nombre.style.position='absolute'
    var nombreConflicto = this.niveles[this.nivelActual].conflictos[i].nombre
    nombre.textContent= nombreConflicto

    this.tablero.appendChild(nombre)
    this.tablero.appendChild(conflicto)
  }
}
}