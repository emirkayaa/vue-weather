<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Sayfa Bulunamadı</h2>
    <router-link to="/home" class="home-link">Ana Sayfaya Dön</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

.not-found h1 {
  font-size: 6rem;
  margin: 0;
  color: #e74c3c;
}

.not-found h2 {
  font-size: 2rem;
  margin: 1rem 0;
}

.home-link {
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #2980b9;
}
</style>