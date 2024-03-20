import { VistaPrincipal } from './views/vistaprincipal.js'
import { VistaSettings } from './views/vistasettings.js'
import { VistaRanking } from './views/vistaranking.js'
import { VistaForm } from './views/vistaform.js'
import { ModeloNames } from './models/modelonames.js'
import { ModeloConfig } from './models/modeloconfig.js'

/**
* Clase controlador que gestiona las vistas y la lógica del juego.
* @class
*/
class Game {
  /**
     * Constructor de la clase.
     * Crea instancias de los modelos y vistas, y almacena configuraciones iniciales.
     */
  constructor () {
    /**
       * Elementos DIV contenedores para cada vista.
       * @type {HTMLElement}
       */
    const div1 = document.getElementById('vistaPrincipal')
    const divForm = document.getElementById('vistaForm')
    const div2 = document.getElementById('vistaSettings')
    const div3 = document.getElementById('vistaRanking')

    this.modelNames = new ModeloNames()
    this.ModelConfig = new ModeloConfig()


    // Almacenar configuraciones iniciales
    const configs = ['fácil', 'muted']
    this.almacenarConfig(configs)

    this.vistaPrincipal = new VistaPrincipal(this, div1)
    this.vistaSettings = new VistaSettings(this, div2)
    this.vistaRanking = new VistaRanking(this, div3)
    this.vistaForm = new VistaForm(this, divForm)
    this.vistas = [this.vistaPrincipal, this.vistaSettings, this.vistaRanking]

    // Mostrar vista principal inicialmente
    this.irAVista(this.vistaPrincipal)
  }

  /**
     * Oculta todas las vistas.
     * @method
     */
  ocultarVistas () {
    this.vistas.forEach(vista => {
      vista.mostrar(false)
    })
  }

  /**
     * Muestra una vista específica.
     * @method
     * @param {Object} vista - La vista a mostrar.
     */
  irAVista (vista) {
    this.ocultarVistas()
    vista.mostrar(true)
  }

  /**
     * Almacena los nombres en el modelo de nombres.
     * @method
     * @param {string[]} nombres - Los nombres a almacenar.
     */
  almacenarNames (nombres) {
    nombres.forEach(nombre => {
      this.modelNames.guardarName(nombre, nombre)
    })
  }

  /**
     * Almacena las configuraciones en el modelo de configuración.
     * @method
     * @param {string[]} configs - Las configuraciones a almacenar.
     */
  almacenarConfig (configs) {
    configs.forEach(config => {
      this.ModelConfig.guardarConfig(config, config)
    })
  }

  /**
     * Devuelve los nombres almacenados en el modelo de nombres.
     * @method
     * @returns {string[]} - Los nombres almacenados.
     */
  devolverNames () {
    const result = []

    this.modelNames.mapa.forEach((value, key) => {
      const name = this.modelNames.verName(key)
      result.push(name)
    })

    return result
  }

  /**
     * Muestra un formulario en la vista actual.
     * @method
     * @param {HTMLElement} form - El formulario a mostrar.
     */
  overlayForm (form) {
    this.vistaForm.base.style.animation = 'blurBG 1s forwards'
    form.style.animation = 'mostrarForm 2s forwards'
  }
}

/**
 * Crea una instancia de la clase Game cuando se carga la ventana.
 * @function
 */
window.onload = () => new Game()
