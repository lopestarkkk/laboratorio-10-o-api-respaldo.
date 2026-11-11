<script setup>
import { ref, onMounted } from 'vue'

const API = import.meta.env.VITE_API_URL
const items = ref([])
const estado = ref('Cargando...')
const actualizado = ref(null)

async function cargar() {
  try {
    const res = await fetch(`${API}/productos`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    items.value = json.data ?? json
    actualizado.value = new Date().toLocaleString()
    estado.value = ''
  } catch (e) {
    estado.value = 'No se pudo conectar con la API'
  }
}

onMounted(cargar)
</script>

<template>
  <main>
    <h1>Mi app</h1>
    <p v-if="estado">{{ estado }}</p>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.nombre }}</li>
    </ul>
    <small v-if="actualizado">Actualizado: {{ actualizado }}</small>
  </main>
</template>