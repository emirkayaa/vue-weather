<template>
  <div class="py-4">
    <div class="flex flex-col gap-2 relative">
      <span class="font-semibold text-white">Şehir Ara</span>
      <input
        v-model="query"
        type="text"
        placeholder="Şehir ismini yazın..."
        @input="onInput"
        class="w-full px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />
      <div v-if="loading" class="text-sm text-white mt-1">Yükleniyor...</div>
      <ul
        v-if="cities.length > 0"
        class="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto z-50"
      >
        <li
          v-for="city in cities"
          :key="city.id"
          class="px-3 py-2 cursor-pointer hover:bg-gray-100"
          @click="selectCity(city)"
        >
          {{ city.name }}, {{ city.country }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { searchCity } from "../../service/weatherService";
import { useWeatherStore } from "../store/weather";

const emit = defineEmits(["citySelected"]);
const store = useWeatherStore();
const query = ref(store.lastCity?.name || "");
const cities = ref([]);
const selectedCity = ref(null);
const loading = ref(false);
const toast = useToast();
let timeout = null;

const selectCity = (city) => {
  selectedCity.value = city;
  query.value = city.name;
  cities.value = [];
  emit("citySelected", city);
};

const onInput = () => {
  clearTimeout(timeout);
  if (query.value.trim().length < 2) {
    cities.value = [];
    return;
  }

  timeout = setTimeout(() => {
    searchCity(query.value, loading.value).then((results) => {
      cities.value = results || [];
      if (cities.value.length === 0) {
        toast.error("Şehir bulunamadı. Lütfen başka bir isim deneyin.");
      }
    });
  }, 300);
};
</script>

<style scoped>
ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
</style>
