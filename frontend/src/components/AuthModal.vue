<template>
  <BaseModal :title="tab === 'login' ? 'Entrar' : 'Criar Conta'" @close="$emit('close')">
    <div class="tabs">
      <button
        v-for="t in ['login', 'registro']"
        :key="t"
        class="tab-btn"
        :class="{ active: tab === t }"
        @click="tab = t; erro = ''"
      >
        {{ t === 'login' ? 'Login' : 'Registro' }}
      </button>
    </div>

    <form @submit.prevent="submit" class="form">
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="seu@email.com" required />
      </div>
      <div class="field">
        <label>Senha</label>
        <input v-model="senha" type="password" placeholder="••••••••" required />
      </div>
      <p v-if="erro" class="erro">{{ erro }}</p>
      <button type="submit" class="btn-submit" :disabled="loading">
        {{ loading ? 'Aguarde...' : tab === 'login' ? 'Entrar' : 'Cadastrar' }}
      </button>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { api } from '../api'

const emit = defineEmits(['close', 'login'])
const tab = ref('login')
const email = ref('')
const senha = ref('')
const loading = ref(false)
const erro = ref('')

async function submit() {
  loading.value = true
  erro.value = ''
  try {
    const path = tab.value === 'login' ? '/auth/login' : '/auth/registro'
    const data = await api.post(path, { email: email.value, senha: senha.value })
    if (tab.value === 'login') {
      emit('login', data.access_token, email.value)
    } else {
      tab.value = 'login'
      erro.value = ''
      alert('Cadastro realizado! Faça login.')
    }
  } catch (ex) {
    erro.value = ex.message || 'Erro ao conectar com a API'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 22px;
}
.tab-btn {
  flex: 1;
  padding: 9px;
  border-radius: 6px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  font-size: 13px;
  background: #222;
  color: var(--text-muted);
  transition: background 0.15s, color 0.15s;
  text-transform: capitalize;
}
.tab-btn.active {
  background: var(--red);
  color: #fff;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.field input {
  padding: 10px 14px;
  background: #1e1e1e;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  color: var(--text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.field input:focus { border-color: var(--red); }
.erro {
  color: var(--red);
  font-size: 13px;
}
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
