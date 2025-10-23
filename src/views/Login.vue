
<template>
  <div class="min-h-screen  from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full animate-fade-in">
      
      <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h1
        class="text-3xl sm:text-5xl md:text-6xl font-black text-black text-center mb-8 sm:mb-12 "
      >
        Giriş Yap
      </h1>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="Email adresinizi girin"
              required
              @blur="validateEmail"
              @input="emailError = ''"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              :class="{ 'border-red-500 focus:ring-red-500': emailError }"
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-600">
              {{ emailError }}
            </p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Şifrenizi girin"
                required
                @blur="validatePassword"
                @input="passwordError = ''"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none pr-12"
                :class="{ 'border-red-500 focus:ring-red-500': passwordError }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Eye v-if="!showPassword" />
                <EyeOff v-else/>
              </button>
            </div>
            <p v-if="passwordError" class="mt-1 text-sm text-red-600">
              {{ passwordError }}
            </p>
          </div>
          <div
            v-if="error"
            class="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2 animate-slide-up"
          >
            <p class="text-sm text-red-700 flex-1">{{ error }}</p>
          </div>

         
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span v-if="isLoading">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            <span>{{ isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap' }}</span>
          </button>
        </form>

    
      </div>
    </div>
  </div>
</template>


<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useToast } from 'vue-toastification'
import {Eye, EyeOff} from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')
const toast = useToast()

const emailError = ref('')
const passwordError = ref('')


const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'Email zorunludur.'
  } else if (!emailPattern.test(email.value)) {
    emailError.value = 'Email adresiniz geçersiz.'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Şifre zorunludur.'
  } else if (password.value.length < 7) {
    passwordError.value = 'Şifre en az 7 karakter olmalıdır.'
  } else {
    passwordError.value = ''
  }
}

const handleLogin = async () => {
    error.value = ''

    const emailValidate = validateEmail()
    const passwordValidate = validatePassword()

    if (emailValidate || passwordValidate) {
        toast.error('Lütfen formdaki hataları düzeltin.')
      return
    }
    const succes = await authStore.login(email.value, password.value)
    isLoading.value = true
   if (succes) {
      toast.success('Başarıyla giriş yapıldı!')
      router.push({ name: 'Home' })
    } else {
      error.value = 'Geçersiz email veya şifre.'
      toast.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
    }
    isLoading.value = false

}


</script>

<style scoped>
</style>