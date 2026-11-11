const { createApp, ref, onMounted } = Vue

const App = {
  setup() {
    const API = 'http://localhost:8000/api'
    const items = ref([])
    const estado = ref('Cargando...')
    const actualizado = ref(null)
    
    // Estado de red y foto (Paso 9)
    const enLinea = ref(navigator.onLine)
    const foto = ref(null)
    const fileInput = ref(null)

    // Detectar cambios en la conexión a internet
    window.addEventListener('online', () => { enLinea.value = true })
    window.addEventListener('offline', () => { enLinea.value = false })

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

    // Función para activar la cámara o selector de archivos
    function tomarFoto() {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    // Manejar la selección o captura de imagen
    function seleccionarFoto(event) {
      const file = event.target.files[0]
      if (file) {
        foto.value = URL.createObjectURL(file)
      }
    }

    onMounted(cargar)

    return { 
      items, 
      estado, 
      actualizado, 
      enLinea, 
      foto, 
      fileInput, 
      tomarFoto, 
      seleccionarFoto 
    }
  },
  template: `
    <main style="padding: 20px; font-family: sans-serif;">
      <h1>Mi app</h1>
      
      <!-- Aviso Sin Conexión (Paso 9) -->
      <p v-if="!enLinea" style="color: red; font-weight: bold;">
        Sin conexión. Se muestran los últimos datos guardados.
      </p>

      <!-- Botón de Cámara y Selector Oculto (Paso 9) -->
      <div style="margin-bottom: 15px;">
        <button @click="tomarFoto">Tomar foto</button>
        <input 
          type="file" 
          ref="fileInput" 
          accept="image/*" 
          capture="environment" 
          style="display: none;" 
          @change="seleccionarFoto" 
        />
      </div>

      <div v-if="foto" style="margin-bottom: 15px;">
        <img :src="foto" width="240" alt="Foto tomada" style="border-radius: 6px;" />
      </div>

      <p v-if="estado">{{ estado }}</p>

      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.nombre }} - S/. {{ item.precio }}
        </li>
      </ul>

      <small v-if="actualizado">Actualizado: {{ actualizado }}</small>
    </main>
  `
}

createApp(App).mount('#app')