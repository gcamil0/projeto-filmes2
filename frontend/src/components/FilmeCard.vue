<template>
  <div class="card" @click="$emit('click', filme)">
    <div class="card-poster">
      <img
        v-if="filme.foto && !imgError"
        :src="filme.foto"
        :alt="filme.nome"
        @error="imgError = true"
        class="poster-img"
      />
      <div v-else class="poster-placeholder">🎬</div>
      <span v-if="estilo" class="badge badge-blue">{{ estilo.nome }}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ filme.nome }}</h3>
      <div class="card-meta">
        <span>{{ filme.ano }}</span>
        <span class="dot">·</span>
        <span>{{ filme.duracao }}</span>
      </div>
      <p v-if="filme.sinopse" class="card-sinopse">{{ filme.sinopse }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  filme: Object,
  estilos: Array,
})
defineEmits(['click'])

const imgError = ref(false)
const estilo = computed(() => props.estilos.find(e => e.estilo === props.filme.estilo))
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--border);
  transition: transform 0.2s, box-shadow 0.2s;
  animation: fadeIn 0.3s ease both;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
  border-color: var(--border-light);
}
.card-poster {
  position: relative;
  padding-top: 145%;
  background: #111;
}
.poster-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.poster-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #333;
}
.badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #fff;
}
.badge-blue { background: var(--blue); }
.badge-gray { background: #555; }
.card-body { padding: 12px 14px 14px; }
.card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}
.card-meta {
  display: flex;
  gap: 6px;
  color: var(--text-muted);
  font-size: 12px;
  align-items: center;
}
.dot { color: var(--text-dim); }
.card-sinopse {
  margin-top: 8px;
  color: #999;
  font-size: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
