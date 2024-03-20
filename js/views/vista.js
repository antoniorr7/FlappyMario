/**
 * @class
 * @classdesc Clase que representa la gestión general para mostrar y ocultar vistas.
 * @author Nacho - Antonio - Mario
 * @license MIT
 * @param {Object} controlador - El controlador asociado a la vista.
 * @param {HTMLElement} base - El elemento base de la vista.
 */
export class Vista {
  constructor (controlador, base) {
    /**
         * @member {Object}
         * @description El controlador asociado a la vista.
         */
    this.controlador = controlador

    /**
         * @member {HTMLElement}
         * @description El elemento base de la vista.
         */
    this.base = base
  }

  /**
     * Muestra u oculta la vista según el valor especificado.
     * @param {boolean} ver - Indica si se debe mostrar (`true`) u ocultar (`false`) la vista.
     */
  mostrar (ver) {
    if (ver) {
      this.base.style.display = 'block'
    } else {
      this.base.style.display = 'none'
    }
  }

  changeTheme = () => {
    const element = this.controlador.vistaPrincipal.tablero
    const rootElement = document.documentElement
    const backgroundColor = window.getComputedStyle(element).getPropertyValue('background-color')
    // Si el color de fondo es '#171726' (el modo oscuro)
    if (backgroundColor === 'rgb(23, 23, 38)') {
      rootElement.style.setProperty('--primary', '#FFF5DD', 'important')
      rootElement.style.setProperty('--secondary', '#FCC34D', 'important')
      rootElement.style.setProperty('--terciary', '#CCAC92', 'important')
      rootElement.style.setProperty('--personajes', '#3E0900', 'important')
      rootElement.style.setProperty('--contrast', '#42547A', 'important')
      rootElement.style.setProperty('--shadow', '#ffffff40', 'important')
      rootElement.style.setProperty('--theme-img', 'url(../img/iconos/sol.png)', 'important')
      rootElement.style.setProperty('--theme-color', '#fff', 'important')
    } else {
      rootElement.style.setProperty('--primary', '#252638', 'important')
      rootElement.style.setProperty('--secondary', '#171726', 'important')
      rootElement.style.setProperty('--terciary', '#6F7789', 'important')
      rootElement.style.setProperty('--personajes', '#414467', 'important')
      rootElement.style.setProperty('--contrast', '#F5C505', 'important')
      rootElement.style.setProperty('--shadow', '#000000e0', 'important')
      rootElement.style.setProperty('--theme-img', 'url(../img/iconos/luna.png)', 'important')
      rootElement.style.setProperty('--theme-color', '#000', 'important')
    }
  }
}
