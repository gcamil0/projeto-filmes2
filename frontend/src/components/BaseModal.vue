<template>
  <Teleport to="body">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button class="close-btn" @click="$emit('close')">✕</button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
defineProps({ title: String })
defineEmits(['close'])

function onKey(e) { if (e.key === 'Escape') { /* parent handles */ } }
onMounted(() => { document.body.style.overflow = 'hidden'; window.addEventListener('keydown', onKey) })
onUnmounted(() => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) })
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: fadeIn 0.2s ease;
}
.modal {
  background: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
  animation: slideUp 0.25s ease;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}
.modal-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--text);
  letter-spacing: 1px;
}
.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
}
.close-btn:hover { color: var(--text); }
</style>
