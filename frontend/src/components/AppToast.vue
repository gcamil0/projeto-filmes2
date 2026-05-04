<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="msg" class="toast" :class="type">
        {{ msg }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
const props = defineProps({ msg: String, type: { type: String, default: 'success' } })
const emit = defineEmits(['done'])

watch(() => props.msg, (v) => {
  if (v) setTimeout(() => emit('done'), 3000)
})
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
.toast.success { background: var(--green); }
.toast.error { background: #c0392b; }

.toast-enter-active,
.toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from { opacity: 0; transform: translateX(20px); }
.toast-leave-to { opacity: 0; transform: translateX(20px); }
</style>
