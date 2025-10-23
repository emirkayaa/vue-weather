<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 p-4 sm:p-6 md:p-10"
    :class="backgroundClass"
  >
    <div class="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-3">
      <router-link
        class="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 shadow-lg transition-all duration-300"
        to="/profile"
        title="Profil"
      >
        <CircleUserRound class="text-white w-6 h-6 sm:w-8 sm:h-8" />
      </router-link>

      <router-link
        class="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 shadow-lg transition-all duration-300"
        to="/logout"
        title="Çıkış"
        @click="logout"
      >
        <LogOut class="text-red-500 w-6 h-6 sm:w-8 sm:h-8" />
      </router-link>
    </div>

    <div class="relative z-10 w-full max-w-2xl">
      <h1
        class="text-3xl sm:text-5xl md:text-6xl font-black text-white text-center mb-8 sm:mb-12 tracking-tight drop-shadow-2xl leading-tight"
      >
        Hava Durumu
      </h1>

      <CitySelect @citySelected="onCitySelected" />

      <transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 transform scale-95 translate-y-8"
        enter-to-class="opacity-100 transform scale-100 translate-y-0"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedCity && cityData"
          class="mt-6 sm:mt-8 bg-white/20 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 p-4 sm:p-6 md:p-8 hover:bg-white/25 transition-all duration-300"
        >
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4 sm:mb-6 drop-shadow-lg leading-snug"
          >
            {{ selectedCity.name }}
          </h2>

          <div class="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div class="animate-bounce-slow">
              <component
                :is="weatherIconComponent"
                :size="iconSize"
                :stroke-width="1.5"
                class="text-white drop-shadow-2xl"
              />
            </div>

            <div class="text-5xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-2xl">
              {{ cityData.current.temperature_2m }}{{ cityData.current_units.temperature_2m }}
            </div>

            <div class="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm rounded-full text-center">
              <span class="text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow">
                {{ weatherDescription }}
              </span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useWeatherStore } from "../store/weather";
import { useAuthStore } from "../store/auth";
import { Sun, CircleUserRound, LogOut } from "lucide-vue-next";
import CitySelect from "../components/CitySelect.vue";
import { getData, weatherDescriptions, weatherIcons } from "../../service/weatherService";
import router from "../router";

const selectedCity = ref(null);
const cityData = ref(null);
const weatherStore = useWeatherStore();
const auth = useAuthStore();
const windowWidth = ref(window.innerWidth);

const onCitySelected = async (city) => {
  selectedCity.value = city;
  cityData.value = await getData(selectedCity.value);
  weatherStore.setWeatherData(selectedCity, cityData);
};

const logout = () => {
  auth.logout();
  router.push("/login");
};

const iconSize = computed(() => {
  if (windowWidth.value < 480) return 56;
  if (windowWidth.value < 640) return 72;
  if (windowWidth.value < 768) return 84;
  return 100;
});

const weatherDescription = computed(() => {
  const code = cityData.value?.current?.weather_code;
  return weatherDescriptions[code] || "Bilinmiyor";
});

const weatherIconComponent = computed(() => {
  const code = cityData.value?.current?.weather_code;
  return weatherIcons[code] || Sun;
});

const backgroundClass = computed(() => {
  const code = cityData.value?.current?.weather_code;
  if (code === undefined) return "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600";
  if ([0, 1].includes(code)) return "bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500";
  if ([2, 3].includes(code)) return "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600";
  if ([45, 48].includes(code)) return "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    return "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "bg-gradient-to-br from-cyan-200 via-blue-300 to-indigo-400";
  if ([95, 96, 99].includes(code)) return "bg-gradient-to-br from-gray-800 via-purple-900 to-indigo-950";
  return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500";
});
</script>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
.bg-gradient-to-br {
  transition: background 0.7s ease-in-out;
}
</style>
