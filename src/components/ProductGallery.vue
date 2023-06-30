<template>
<div class="product-gallery">
    <div v-if="error" class="error-message">
        {{ error }}
    </div>
    <div v-for="product in products" :key="product.id" class="product-item">
        <img v-lazy="product.image" :alt="'Imagen del producto ' + product.name" class="product-image">
        <h2 class="product-title">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }}</p>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ProductGalleryComponent',
    props: ['apiUrl'],
    data() {
        return {
            products: [],
            error: null,
        };
    },
    async created() {
        try {
            const response = await axios.get(this.apiUrl);
            this.products = response.data;
        } catch (error) {
            console.error(error);
            this.error = 'Lo sentimos, ha ocurrido un error al cargar los productos :(';
        }
    },
};
</script>

<style lang="scss" scoped>
$product-item-background-color: #fff;
$product-item-border-color: #eee;
$product-item-text-color: rgb(0, 0, 0);

.product-gallery {
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
    margin-top: 2rem;
}

.error-message {
    background-color: #f8d7da;
    border-radius: 5px;
    border: 1px solid #f5c6cb;
    color: #721c24;
    margin-bottom: 20px;
    padding: 15px;
}

.product-item {
    background-color: $product-item-background-color;
    border-radius: 10px;
    border: 1px solid $product-item-border-color;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
    color: $product-item-text-color;
    flex: 0 0 80%;
    margin-bottom: 2em;
    padding: 1em;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    .product-image {
        border-radius: 10px;
        height: auto;
        margin-bottom: 1em;
        max-width: 100%;
    }

    .product-title {
        font-size: 1.5em;
        margin-bottom: 0.5em;
    }

    .product-description {
        font-size: 1em;
        margin-bottom: 1em;
    }

    .product-price {
        font-weight: bold;
    }

    @media screen and (min-width: 750px) {
        flex: 0 0 calc(25% - 0.75em);
    }
}
</style>
