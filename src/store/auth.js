import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const userData = ref({
    email: "test@demo.com",
    password: "Test1234",
    name: "Emirhan",
  });

  const userName = computed(() => {
    return user.value ? user.value.name : "";
  });
  const userEmail = computed(() => {
    return user.value ? user.value.email : "";
  });

  const login = (email, password) => {
    try {
      if (email === userData.value.email && password === userData.value.password) {
        user.value = {
          name: userData.value.name,
          email: userData.value.email,
        };
        isAuthenticated.value = true;
        localStorage.setItem("user", JSON.stringify(user.value));
        localStorage.setItem("isAuthenticated", "true");

        return true;
      } else {
        user.value = null;
        isAuthenticated.value = false;
      }
    } catch (error) {}

    return false;
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  const initializeAuth = () => {
    const localUser = localStorage.getItem("user");
    const localAuth = localStorage.getItem("isAuthenticated");

    if (localUser && localAuth === "true") {
      user.value = JSON.parse(localUser);
      isAuthenticated.value = true;
      return true;
    }
    return false;
  };

  initializeAuth();

  return {
    user,
    isAuthenticated,
    userName,
    userEmail,
    login,
    logout,
    initializeAuth,
  };
});
