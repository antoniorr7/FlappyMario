/**
 * @class
 * @classdesc Clase que representa el modelo de configuración del juego.
 * @author Nacho - Antonio - Mario
 * @license MIT
 */
export class ModeloConfig {
  /**
     * Crea una instancia del modelo de configuración del juego.
     */
  constructor () {
    /**
         * @type {Map}
         * @description Mapa que guarda la configuración del juego.
         */
    this.mapa = new Map()
  }

  /**
     * @method
     * @description Guarda una configuración en el mapa.
     * @param {string} clave - La clave de la configuración.
     * @param {any} valor - El valor de la configuración.
     */
  guardarConfig (clave, valor) {
    this.mapa.set(clave, valor)
  }

  /**
     * @method
     * @description Obtiene el valor de una configuración del mapa.
     * @param {string} clave - La clave de la configuración.
     * @returns {any} El valor de la configuración.
     */
  verConfig (clave) {
    return this.mapa.get(clave)
  }
}
