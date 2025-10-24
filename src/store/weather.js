import { defineStore } from "pinia";
import { ref } from "vue";

export const useWeatherStore = defineStore("weather", () => {
  const lastCity = ref(null);
  const lastWeatherData = ref({});

  const setWeatherData = (city, data) => {
    lastCity.value = city;
    lastWeatherData.value = data;

    try {
      localStorage.setItem(
        "weatherStore",
        JSON.stringify({
          lastCity: city,
          lastWeatherData: data,
        })
      );
    } catch (err) {
      console.error("weatherStore save error:", err);
    }
  };

  const loadWeatherData = () => {
    try {
      const saved = localStorage.getItem("weatherStore");
      if (saved) {
        const parsed = JSON.parse(saved);
        lastCity.value = parsed.lastCity;
        lastWeatherData.value = parsed.lastWeatherData;
      }
    } catch (err) {
      console.error("weatherStore load error:", err);
    }
  };

  loadWeatherData();

  return { lastCity, lastWeatherData, setWeatherData, loadWeatherData };
});
