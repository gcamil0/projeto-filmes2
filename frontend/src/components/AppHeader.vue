<template>
  <header class="header">
    <div class="header-inner">
      <h1 class="logo">🎬 CineBase</h1>

      <div class="search-wrap">
        <input
          :value="busca"
          @input="$emit('update:busca', $event.target.value)"
          placeholder="Buscar filmes..."
          class="search-input"
        />
      </div>

      <div class="header-actions">
        <template v-if="token">
          <button class="btn btn-primary" @click="$emit('novo-filme')">
            + Novo Filme
          </button>
          <button class="btn btn-ghost" @click="$emit('logout')">Sair</button>
        </template>
        <template v-else>
          <button class="btn btn-outline" @click="$emit('abrir-auth')">Entrar</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({ token: String, busca: String })
defineEmits(['update:busca', 'abrir-auth', 'logout', 'novo-filme'])
</script>

<style scoped>
.header {
  background: linear-gradient(180deg, #000 0%, rgba(0,0,0,0.85) 100%);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  height: 64px;
}
.logo {
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--red);
  letter-spacing: 2px;
  flex-shrink: 0;
}
.search-wrap {
  flex: 1;
  max-width: 400px;
}
.search-input {
  width: 100%;
  padding: 8px 16px;
  background: #1a1a1a;
  border: 1px solid var(--border-light);
  border-radius: 20px;
  color: var(--text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus {
  border-color: var(--red);
}
.header-actions {
  margin-left: auto;
  display: flex;
  gap: 10px;
  align-items: center;
}
.btn {
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  border: none;
  transition: opacity 0.15s, transform 0.15s;
}
.btn:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-primary { background: var(--red); color: #fff; }
.btn-ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--border-light); }
.btn-outline { background: transparent; color: var(--text); border: 1px solid #555; }
</style>
