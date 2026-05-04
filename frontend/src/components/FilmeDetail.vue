<template>
  <BaseModal :title="filme.nome" @close="$emit('close')">
    <div class="detail">
      <img
        v-if="filme.foto"
        :src="filme.foto"
        :alt="filme.nome"
        class="detail-img"
        @error="$event.target.style.display='none'"
      />

      <div class="badges">
        <span v-if="estilo" class="badge blue">{{ estilo.nome }}</span>
        <span class="badge gray">{{ filme.ano }}</span>
        <span class="badge gray">⏱ {{ filme.duracao }}</span>
      </div>

      <p v-if="filme.sinopse" class="sinopse">{{ filme.sinopse }}</p>

      <div v-if="videoId" class="video-wrap">
        <iframe
          :src="`https://www.youtube.com/embed/${videoId}`"
          allowfullscreen
          title="Trailer"
        />
      </div>

      <div v-if="token" class="actions">
        <button class="btn-edit" @click="$emit('editar', filme)">✏️ Editar</button>
        <button class="btn-delete" @click="$emit('excluir', filme)">🗑 Excluir</button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  filme: Object,
  estilos: Array,
  token: String,
})
defineEmits(['close', 'editar', 'excluir'])

const estilo = computed(() => props.estilos.find(e => e.estilo === props.filme.estilo))

const videoId = computed(() => {
  const v = props.filme.video
  if (!v) return null
  const match = v.match(/(?:v=|youtu\.be\/)([^&?/]+)/)
  return match ? match[1] : v
})
</script>

<style scoped>
.detail { display: flex; flex-direction: column; gap: 16px; }
.detail-img {
  width: 100%;
  max-height: 280px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.badges { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #fff;
}
.blue { background: var(--blue); }
.gray { background: #444; }
.sinopse { color: #bbb; line-height: 1.7; font-size: 14px; }
.video-wrap {
  border-radius: 8px;
  overflow: hidden;
}
.video-wrap iframe {
  width: 100%;
  height: 220px;
  border: none;
  display: block;
}
.actions { display: flex; gap: 10px; margin-top: 4px; }
.btn-edit, .btn-delete {
  flex: 1;
  padding: 11px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.15s;
}
.btn-edit:hover, .btn-delete:hover { opacity: 0.85; }
.btn-edit { background: var(--blue); color: #fff; }
.btn-delete { background: #c0392b; color: #fff; }
</style>
