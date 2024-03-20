/**
 * @class
 * @classdesc Clase que representa un servicio para realizar llamadas AJAX utilizando los métodos GET y POST.
 * @author Nacho - Antonio - Mario
 * @license MIT
 */
export class Rest {
  /**
   * Realiza una petición GET a la URL especificada con los parámetros proporcionados.
   * @static
   * @param {string} url - La URL a la que se realizará la petición.
   * @param {Object} params - Los parámetros de la petición.
   * @param {function} callback - La función de retorno para manejar la respuesta de la petición.
   */
  static get (url, params, callback) {
    let paramsGET = '?'
    for (const param in params) {
      paramsGET += param + '='
      paramsGET += params[param] + '&'
    }

    fetch(url + paramsGET.substring(0, paramsGET.length - 1))
      .then(response => {
        const status = response.status
        return { responseStatus: status, responseText: response.text(), method: 'GET' }
      })
      .then(data => {
        if (callback) {
          data.responseText.then(texto => {
            callback(data.responseStatus, texto, data.method)
          }
          )
        }
      })
  }

  /**
     * Realiza una petición POST a la URL especificada con los parámetros proporcionados.
     * @static
     * @param {string} url - La URL a la que se realizará la petición.
     * @param {Object} params - Los parámetros de la petición.
     * @param {function} callback - La función de retorno para manejar la respuesta de la petición.
     */
  static post (url, params, callback) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(url, requestOptions)
      .then(response => {
        const status = response.status
        return { responseStatus: status, response: response.json(), method: 'POST' }
      })
      .then(data => {
        if (callback) {
          return data.response.then(jsonData => {
            callback(data.responseStatus, jsonData, data.method)
          })
        }
      })
      .catch(error => console.error('Error:', error))
  }

  static getJSON (url, params, callback) {
    const queryParams = new URLSearchParams(params).toString()
    const fullUrl = url + (queryParams ? `?${queryParams}` : '')

    fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const status = response.status
        return { responseStatus: status, response: response.json(), method: 'GET' }
      })
      .then(data => {
        if (callback) {
          return data.response.then(jsonData => {
            callback(data.responseStatus, jsonData, data.method)
          })
        }
      })
      .catch(error => console.error('Error:', error))
  }

  static getJSON (url, params, callback) {
    const queryParams = new URLSearchParams(params).toString()
    const fullUrl = url + (queryParams ? `?${queryParams}` : '')

    fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const status = response.status
        return { responseStatus: status, response: response.json(), method: 'GET' }
      })
      .then(data => {
        if (callback) {
          return data.response.then(jsonData => {
            callback(data.responseStatus, jsonData, data.method)
          })
        }
      })
      .catch(error => console.error('Error:', error))
  }
}
