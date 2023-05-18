import usarRegistroCapas from '@/composables/usarRegistroCapas'
import { computed } from 'vue'

export default function (idCapa) {
  const capa = usarRegistroCapas().capa(idCapa)

  const nombre = computed(() => capa?.Nombre)
  const guardarNombre = _Nombre => (capa.Nombre = _Nombre)

  return {
    nombre,
    guardarNombre,
  }
}
