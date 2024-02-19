<script setup lang="ts">
const links = ref([
    { href: '/', label: 'Calendar' },
    { href: '/about', label: 'About' },
])

const route= useRoute();
const path = computed(() => route.path)

</script>

<template>
    <nav class="bg-gray-800 p-2">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <NuxtLink  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-center px-2 py-1" :class="{'bg-gray-900 text-white': path === link.href}"
                v-for="link in links" :to="link.href">
                {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
</template>