import usarRegistroCapas from '@/composables/usarRegistroCapas'
import { computed } from 'vue'

export default function (idCapa) {
  const capa = usarRegistroCapas().capa(idCapa)

  const nombre = computed(() => capa?.nombre)
  const guardarNombre = _nombre => (capa.Nombre = _nombre)

  return {
    nombre,
    guardarNombre,
  }
}
