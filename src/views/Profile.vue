<template>
  <div class="min-h-screen from-blue-50 via-white to-blue-100 flex flex-col items-center py-8 px-4">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100 transition hover:shadow-xl">
      <div class="flex flex-col items-center mb-6">
        <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3">
          <span class="text-3xl font-semibold text-blue-600">
            {{ user?.name?.charAt(0).toUpperCase() || '' }}
          </span>
        </div>
        <h2 class="text-2xl font-bold text-gray-700">{{ user?.name }}</h2>
        <p class="text-gray-500 text-sm">{{ user?.email }}</p>
      </div>
      <div class="mt-6 border-t border-gray-200 pt-4 text-left space-y-2">
        <p v-if="lastCity">
          <span class="font-semibold text-gray-700">Şehir:</span>
          <span class="ml-1 text-gray-800">{{ lastCity?.name }}</span>
        </p>
        <p v-if="lastWeatherData?.current">
          <span class="font-semibold text-gray-700">Sıcaklık:</span>
          <span class="ml-1 text-gray-800">
            {{ lastWeatherData.current.temperature_2m }}
            {{ lastWeatherData.current_units.temperature_2m }}
          </span>
        </p>
        <p v-else class="italic text-gray-500">Son hava durumu verisi bulunamadı.
        <RouterLink
        to="/home"
        class="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <span class="font-medium">Geri</span>
      </RouterLink></p>
      </div>
      <div v-if="lastCity" class="mt-6 text-blue-600 font-medium text-center flex flex-col justify-end">
       <span>
        Merhaba {{ user?.name }}, bugün {{ lastCity?.name }} şehrinde hava durumu {{ lastWeatherData?.current?.temperature_2m }}
            {{ lastWeatherData?.current_units?.temperature_2m }} olarak ölçüldü.
       </span> 
        <div class="flex justify-between mt-3">
            <RouterLink
        to="/home"
        class="flex justify-end items-center gap-2 text-gray-600 hover:text-gray-800 transition border border-gray-500 bg-gray-100 w-fit p-2 rounded"
      >
        <span class="font-medium">Geri dön</span>
      </RouterLink>
      <RouterLink
        to="/login"
        @click="logout"
        class="flex justify-end items-center gap-2 text-red-600 hover:text-red-800 transition border border-red-500 bg-red-100 w-fit p-2 rounded"
      >
        <span class="font-medium">Çıkış Yap</span>
      </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '../store/weather.js'
import { useAuthStore } from '../store/auth.js';
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import router from '../router/index.js';

const user = JSON.parse(localStorage.getItem('user'))
const store = useWeatherStore();
const auth = useAuthStore();
const { lastCity, lastWeatherData } = storeToRefs(store);
store.loadWeatherData()
const logout = () => {
    auth.logout();
    router.push('/login')
}
</script>
