/**
 *  @module clases/RegistroObjetos
 */

/**
 * @classdesc
 * Clase que permite guardar objetos de una forma controlada.
 */
export default class RegistroObjetos {
  /**
   * @property {Object} Objeto en el que se almacenarán los objetos registrados.
   */
  registros = {}

  /**
   *
   * @param {String} tipo de objetos que se registrarán en la instancia.
   */
  constructor(tipo) {
    this.tipoObjetos = tipo || 'objeto'
  }

  /**
   * Regresa true si el objeto está registrado.
   * @param {String} id del objeto que se desea consultar.
   * @returns {Boolean}
   */
  existe(id) {
    return Object.keys(this.registros).includes(id)
  }

  /**
   * Registra un objeto en los registros.
   * @param {String} id del objeto que se desea registrar.
   * @param {Object} valor valor que adquiere el objeto que se está registrando.
   */
  registrar(id, valor) {
    if (!this.existe(id)) {
      this.registros[id] = valor
      // console.log(`registro ${this.tipoObjetos}: ${id}`)
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} ya existe`)
    }
  }

  /**
   * Modifica el valor de un objeto.
   * @param {String} id del objeto que se desea modificar.
   * @param {Object} valor nuevo valor que adquiere el objeto.
   */
  asignar(id, valor) {
    if (this.existe(id)) {
      this.registros[id] = valor
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} no encontrado`)
    }
  }

  /**
   * Regresa el valor u objeto de un registro.
   * @param {String} id del objeto que se desea registrar.
   * @returns {Object}
   */
  objeto(id) {
    if (this.existe(id)) {
      return this.registros[id]
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} no encontrado`)
    }
  }

  /**
   * Regresa el valor u objeto de un registro como promesa, util cuando se trata de consultar un
   * objeo cuando este no ha sido registrado aún.
   * @param {String} id del objeto que se desea registrar.
   * @returns
   */
  objetoPromesa(id) {
    return new Promise(resolve => {
      const _this = this

      function revisar() {
        if (_this.existe(id)) {
          resolve(_this.registros[id])
        } else {
          setTimeout(revisar, 50)
        }
      }

      revisar()
    })
  }

  /**
   * Elimina un obbjeto del objeto registros.
   * @param {String} id del objeto que se desea borrar.
   */
  borrar(id) {
    if (this.existe(id)) {
      delete this.registros[id]
      // console.log(`borrado ${this.tipoObjetos}: ${id}`)
    }
  }
}
