import axios from "axios";
import { useToast } from "vue-toastification";
import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudFog, CloudLightning } from "lucide-vue-next";

export const searchCity = async (text, loading) => {
  const toast = useToast();
  loading = true;
  try {
    const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=10`);
    /* const filteredData = res.data.results.filter(
      (city) => city.country_code === 'TR') */
    if (res.data.results === undefined) {
      return [];
    }
    return res.data.results;
  } catch (error) {
    toast.error("Şehir bulunamadı. Lütfen tekrar deneyin.");
  } finally {
    loading = false;
  }
};

export const getData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const weatherIcons = {
  0: Sun,
  1: Sun,
  2: Cloud,
  3: Cloud,
  45: CloudFog,
  48: CloudFog,
  51: CloudDrizzle,
  53: CloudDrizzle,
  55: CloudDrizzle,
  56: CloudDrizzle,
  57: CloudDrizzle,
  61: CloudRain,
  63: CloudRain,
  65: CloudRain,
  66: CloudRain,
  67: CloudRain,
  71: CloudSnow,
  73: CloudSnow,
  75: CloudSnow,
  77: CloudSnow,
  80: CloudRain,
  81: CloudRain,
  82: CloudRain,
  85: CloudSnow,
  86: CloudSnow,
  95: CloudLightning,
  96: CloudLightning,
  99: CloudLightning,
};

export const weatherDescriptions = {
  0: "Açık Hava",
  1: "Az Bulutlu",
  2: "Parçalı Bulutlu",
  3: "Kapalı",
  45: "Sisli",
  48: "Yoğun Sis",
  51: "Hafif Çiseleme",
  53: "Orta Çiseleme",
  55: "Yoğun Çiseleme",
  56: "Hafif Donan Yağmur",
  57: "Yoğun Donan Yağmur",
  61: "Hafif Yağmur",
  63: "Orta Yağmur",
  65: "Şiddetli Yağmur",
  66: "Hafif Dondurucu Yağmur",
  67: "Yoğun Dondurucu Yağmur",
  71: "Hafif Kar",
  73: "Orta Kar",
  75: "Yoğun Kar",
  77: "Kar Taneleri",
  80: "Hafif Sağanak",
  81: "Orta Sağanak",
  82: "Şiddetli Sağanak",
  85: "Hafif Kar Sağanağı",
  86: "Yoğun Kar Sağanağı",
  95: "Gökgürültülü Fırtına",
  96: "Dolu ile Fırtına",
  99: "Şiddetli Dolulu Fırtına",
};
