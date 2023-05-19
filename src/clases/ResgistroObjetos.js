/**
 *
 */

export default class RegistroObjetos {
  registros = {}

  constructor(tipo) {
    this.tipoObjetos = tipo || 'objeto'
  }

  existe(id) {
    return Object.keys(this.registros).includes(id)
  }

  registrar(id, valor) {
    if (!this.existe(id)) {
      this.registros[id] = valor
      console.log(`registro ${this.tipoObjetos}: ${id}`)
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} ya existe`)
    }
  }

  asignar(id, valor) {
    if (this.existe(id)) {
      this.registros[id] = valor
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} no encontrado`)
    }
  }

  borrar(id) {
    if (this.existe(id)) {
      delete this.registros[id]
      console.log(`borrado ${this.tipoObjetos}: ${id}`)
    }
  }

  objeto(id) {
    if (this.existe(id)) {
      return this.registros[id]
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} no encontrado`)
    }
  }

  objetoAsync(id) {
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
}
