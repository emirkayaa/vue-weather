<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
    <h1 class="text-8xl font-extrabold text-red-500">404</h1>
    <h2 class="text-2xl font-semibold mt-4 text-gray-800">Sayfa Bulunamadı</h2>
    <RouterLink
      to="/home"
      class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
    >
      Ana Sayfaya Dön
    </RouterLink>
  </div>
</template>
