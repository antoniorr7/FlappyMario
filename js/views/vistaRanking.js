import { Vista } from './vista.js'
/**
 * Clase que representa la vista del ranking, que extiende de la clase `Vista`.
 * @extends Vista
 * @author Nacho - Antonio - Mario
 * @license MIT
 * @param {Object} controlador - El controlador asociado a la vista.
 * @param {HTMLElement} base - El elemento base de la vista.
 */
export class VistaRanking extends Vista {
  constructor (controlador, base) {
    super(controlador, base)

    /**
         * Elemento de botón para volver atrás.
         * @type {HTMLButtonElement}
         */
    const btnBack = this.base.querySelectorAll('button')[1]
    const btnTheme = this.base.querySelector('#vistaRanking #theme')

    // Asignar evento para ir a la vista principal al hacer clic en el botón de volver atrás
    btnBack.onclick = this.irMain
    btnTheme.onclick = this.changeTheme
  }
  /**
         * Realiza la navegación de vuelta a la vista principal.
         * @method
         */

  irMain = () => this.controlador.irAVista(this.controlador.vistaPrincipal)
}
