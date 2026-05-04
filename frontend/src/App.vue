<template>
  <div>
    <!-- Header -->
    <AppHeader
      :token="token"
      v-model:busca="busca"
      @abrir-auth="modal = 'auth'"
      @logout="logout"
      @novo-filme="modal = 'novo'"
    />

    <!-- Filter bar by estilo -->
    <div v-if="estilos.length" class="filter-bar">
      <div class="filter-inner">
        <button
          class="filter-btn"
          :class="{ active: !filtroEstilo }"
          @click="filtroEstilo = ''"
        >Todos</button>
        <button
          v-for="est in estilos"
          :key="est.estilo"
          class="filter-btn"
          :class="{ active: filtroEstilo === est.estilo }"
          @click="filtroEstilo = est.estilo"
        >{{ est.nome }}</button>
      </div>
    </div>

    <!-- Main grid -->
    <main class="main">
      <!-- Loading -->
      <div v-if="loading" class="center">
        <div class="spinner" />
      </div>

      <!-- Empty -->
      <div v-else-if="!filmesFiltrados.length" class="empty">
        <div class="empty-icon">🎭</div>
        <p>Nenhum filme encontrado</p>
        <button v-if="token" class="btn-add-empty" @click="modal = 'novo'">
          Adicionar Filme
        </button>
        <p v-else class="hint">
          A API pode estar offline. Certifique-se que o backend está rodando em
          <code>http://localhost:3000</code>
        </p>
      </div>

      <!-- Grid -->
      <template v-else>
        <p class="count">
          {{ filmesFiltrados.length }} filme{{ filmesFiltrados.length !== 1 ? 's' : '' }} encontrado{{ filmesFiltrados.length !== 1 ? 's' : '' }}
        </p>
        <div class="grid">
          <FilmeCard
            v-for="filme in filmesFiltrados"
            :key="filme.filme"
            :filme="filme"
            :estilos="estilos"
            @click="abrirDetalhe"
          />
        </div>
      </template>
    </main>

    <!-- Modals -->
    <AuthModal
      v-if="modal === 'auth'"
      @close="modal = null"
      @login="handleLogin"
    />

    <FilmeForm
      v-if="modal === 'novo'"
      :estilos="estilos"
      :token="token"
      @close="modal = null"
      @salvo="onFilmeSalvo('Filme adicionado!')"
    />

    <FilmeForm
      v-if="editando"
      :inicial="editando"
      :estilos="estilos"
      :token="token"
      @close="editando = null"
      @salvo="onFilmeEditado"
    />

    <FilmeDetail
      v-if="detalheFilme"
      :filme="detalheFilme"
      :estilos="estilos"
      :token="token"
      @close="detalheFilme = null"
      @editar="iniciarEdicao"
      @excluir="excluirFilme"
    />

    <!-- Toast -->
    <AppToast :msg="toast.msg" :type="toast.type" @done="toast.msg = ''" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { api } from './api'
import AppHeader from './components/AppHeader.vue'
import FilmeCard from './components/FilmeCard.vue'
import AuthModal from './components/AuthModal.vue'
import FilmeForm from './components/FilmeForm.vue'
import FilmeDetail from './components/FilmeDetail.vue'
import AppToast from './components/AppToast.vue'

// ── State ──────────────────────────────────────────────────────────────
const filmes = ref([])
const estilos = ref([])
const loading = ref(true)
const token = ref(localStorage.getItem('token') || '')
const busca = ref('')
const filtroEstilo = ref('')
const modal = ref(null)        // 'auth' | 'novo' | null
const editando = ref(null)     // filme object or null
const detalheFilme = ref(null) // filme object or null
const toast = ref({ msg: '', type: 'success' })

// ── Computed ────────────────────────────────────────────────────────────
const filmesFiltrados = computed(() => {
  if (!filtroEstilo.value) return filmes.value
  return filmes.value.filter(f => f.estilo === filtroEstilo.value)
})

// ── API calls ───────────────────────────────────────────────────────────
async function loadFilmes() {
  loading.value = true
  try {
    const q = busca.value ? `?nome=${encodeURIComponent(busca.value)}` : ''
    const data = await api.get(`/filmes${q}`)
    filmes.value = Array.isArray(data) ? data : []
  } catch {
    showToast('Não foi possível carregar filmes. Verifique se a API está rodando.', 'error')
    filmes.value = []
  } finally {
    loading.value = false
  }
}

async function loadEstilos() {
  try {
    const data = await api.get('/estilos')
    estilos.value = Array.isArray(data) ? data : []
  } catch {/* estilos não-críticos */}
}

// ── Auth ────────────────────────────────────────────────────────────────
function handleLogin(tk, email) {
  token.value = tk
  localStorage.setItem('token', tk)
  localStorage.setItem('userEmail', email)
  modal.value = null
  showToast(`Bem-vindo, ${email}!`)
}

function logout() {
  token.value = ''
  localStorage.removeItem('token')
  localStorage.removeItem('userEmail')
  showToast('Sessão encerrada')
}

// ── Filmes CRUD ─────────────────────────────────────────────────────────
function abrirDetalhe(filme) {
  detalheFilme.value = filme
}

function iniciarEdicao(filme) {
  editando.value = filme
}

function onFilmeSalvo(msg = 'Filme salvo!') {
  modal.value = null
  loadFilmes()
  showToast(msg)
}

function onFilmeEditado() {
  editando.value = null
  detalheFilme.value = null
  loadFilmes()
  showToast('Filme atualizado!')
}

async function excluirFilme(filme) {
  if (!confirm(`Excluir "${filme.nome}"?`)) return
  try {
    await api.delete(`/filmes/${filme.filme}`, token.value)
    detalheFilme.value = null
    loadFilmes()
    showToast('Filme excluído!')
  } catch (ex) {
    showToast(ex.message || 'Erro ao excluir', 'error')
  }
}

// ── Toast ───────────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  toast.value = { msg, type }
}

// ── Watchers & lifecycle ────────────────────────────────────────────────
let buscaTimer
watch(busca, () => {
  clearTimeout(buscaTimer)
  buscaTimer = setTimeout(loadFilmes, 400)
})

onMounted(() => {
  loadFilmes()
  loadEstilos()
})
</script>

<style scoped>
.filter-bar {
  background: #111;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}
.filter-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  gap: 8px;
}
.filter-btn {
  padding: 5px 16px;
  border-radius: 16px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  background: #222;
  color: var(--text-muted);
  transition: background 0.15s, color 0.15s;
}
.filter-btn.active {
  background: var(--red);
  color: #fff;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 20px;
  min-height: calc(100vh - 130px);
}

.center {
  display: flex;
  justify-content: center;
  padding: 80px 0;
}
.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #2a2a2a;
  border-top-color: var(--red);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.empty {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-dim);
}
.empty-icon { font-size: 56px; margin-bottom: 16px; }
.empty p { font-size: 18px; color: #555; }
.btn-add-empty {
  margin-top: 16px;
  padding: 10px 28px;
  background: var(--red);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}
.hint {
  margin-top: 12px;
  font-size: 13px !important;
  color: var(--text-dim) !important;
}
.hint code {
  background: #1a1a1a;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.count {
  color: var(--text-dim);
  font-size: 13px;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}
</style>
