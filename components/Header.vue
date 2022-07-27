<script setup lang="ts">
import { Link } from 'aleph/vue'
</script>

<template>
  <header>
    <div>
      <h1>
        <Link to="/">Do</Link>
      </h1>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
}

header > div {
  margin: 0 auto;
  width: 90%;
  max-width: 900px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 a {
  color: #333;
}

h1 a svg {
  width: auto;
  height: 16px;
}

nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

nav a {
  color: #454545;
}

nav a svg {
  width: 20px;
  height: 20px;
}

a svg {
  display: inline-flex;
}

a:hover {
  color: #000 !important;
}
</style>
