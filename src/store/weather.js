import { defineStore } from "pinia";
import { ref } from "vue";

export const useWeatherStore = defineStore(
  "weather",
  () => {
    const lastCity = ref(null);
    const lastWeatherData = ref({});

    const setWeatherData = (city, data) => {
      lastCity.value = city;
      lastWeatherData.value = data;
    };

    return {
      lastCity,
      lastWeatherData,
      setWeatherData,
    };
  },
  {
    persist: true
  }
);
