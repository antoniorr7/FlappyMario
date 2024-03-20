/**
 * @class
 * @classdesc Clase que representa el modelo de almacenamiento de nombres de personajes.
 * @author Nacho - Antonio - Mario
 * @license MIT
 */
export class ModeloNames {
  /**
     * Crea una instancia del modelo de almacenamiento de nombres de personajes.
     */
  constructor () {
    /**
         * @type {Map}
         * @description Mapa que guarda los nombres de los personajes.
         */
    this.mapa = new Map()
  }

  /**
     * @method
     * @description Guarda un nombre de personaje en el mapa.
     * @param {string} clave - La clave del nombre.
     * @param {any} valor - El nombre del personaje.
     */
  guardarName (clave, valor) {
    this.mapa.set(clave, valor)
  }

  /**
     * @method
     * @description Obtiene el nombre de un personaje del mapa.
     * @param {string} clave - La clave del nombre.
     * @returns {any} El nombre del personaje.
     */
  verName (clave) {
    return this.mapa.get(clave)
  }
}
