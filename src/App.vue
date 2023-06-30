<script setup>
import ProductGallery from './components/ProductGallery.vue';
</script>

<template>
  <main>
    <ProductGallery :apiUrl="'https://64766fef9233e82dd53a050e.mockapi.io/api/products'"/>
  </main>
</template>