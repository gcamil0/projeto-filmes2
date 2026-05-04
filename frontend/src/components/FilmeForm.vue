<template>
  <BaseModal :title="inicial ? 'Editar Filme' : 'Novo Filme'" @close="$emit('close')">
    <form @submit.prevent="submit" class="form">
      <div class="field">
        <label>Nome *</label>
        <input v-model="form.nome" placeholder="Título do filme" required />
      </div>

      <div class="row">
        <div class="field">
          <label>Ano *</label>
          <input v-model="form.ano" placeholder="2024" required />
        </div>
        <div class="field">
          <label>Duração *</label>
          <input v-model="form.duracao" placeholder="2h 10min" required />
        </div>
      </div>

      <div class="field">
        <label>Estilo *</label>
        <select v-model="form.estilo" required>
          <option value="">Selecione...</option>
          <option v-for="est in estilos" :key="est.estilo" :value="est.estilo">
            {{ est.nome }}
          </option>
        </select>
      </div>

      <div class="field">
        <label>URL da Foto</label>
        <input v-model="form.foto" placeholder="https://..." />
        <img v-if="form.foto" :src="form.foto" class="preview" @error="$event.target.style.display='none'" />
      </div>

      <div class="field">
        <label>URL do Vídeo (YouTube)</label>
        <input v-model="form.video" placeholder="https://youtube.com/watch?v=..." />
      </div>

      <div class="field">
        <label>Sinopse</label>
        <textarea v-model="form.sinopse" placeholder="Descrição do filme..." rows="3" />
      </div>

      <p v-if="erro" class="erro">{{ erro }}</p>

      <button type="submit" class="btn-submit" :disabled="loading">
        {{ loading ? 'Salvando...' : inicial ? 'Salvar Alterações' : 'Adicionar Filme' }}
      </button>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { api } from '../api'

const props = defineProps({
  inicial: Object,
  estilos: Array,
  token: String,
})
const emit = defineEmits(['close', 'salvo'])

const form = ref(
  props.inicial
    ? { ...props.inicial }
    : { nome: '', ano: '', duracao: '', foto: '', sinopse: '', video: '', estilo: '' }
)
const loading = ref(false)
const erro = ref('')

async function submit() {
  loading.value = true
  erro.value = ''
  try {
    if (props.inicial?.filme) {
      await api.put(`/filmes/${props.inicial.filme}`, form.value, props.token)
    } else {
      await api.post('/filmes', form.value, props.token)
    }
    emit('salvo')
  } catch (ex) {
    erro.value = ex.message || 'Erro ao salvar'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form { display: flex; flex-direction: column; gap: 14px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.field input,
.field select,
.field textarea {
  padding: 10px 12px;
  background: #1e1e1e;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  color: var(--text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
}
.field input:focus,
.field select:focus,
.field textarea:focus { border-color: var(--red); }
.preview {
  width: 100%;
  max-height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-top: 4px;
}
.erro { color: var(--red); font-size: 13px; }
.btn-submit {
  padding: 12px;
  background: var(--red);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: opacity 0.15s;
  margin-top: 4px;
}
.btn-submit:disabled { opacity: 0.6; cursor: default; }
</style>
