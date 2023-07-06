# Documentacion del componente ProductGallery
## Descripcion:
Este componente  es una galería de productos que consume datos de una API externa. Esta diseñado para renderizar una lista de productos con sus respectivas imágenes, nombres, descripciones y precios. 

## Tecnologias usadas
A continuación se enlistan las tecnologías y librerías utilizadas en el desarrollo de este componente:
* Vue 3
* Axios
* VueLazyload
* Preprocesador SCSS
* Vue Test Utils
* Vitest

## Caracteristicas del componente
### Props
El componente ProductGallery tiene una propiedad:
* **apiUrl**: La URL de la API desde la que se obtendrán los datos de los productos. Debe ser una cadena de texto.

### Data
Este componente define 2 datos: 
* **products**: Guarda la respuesta de la petición a la API proporcionada.
* **error**: Se actualiza con un mensaje de error, si ocurre un error durante la petición a la API. 

### CSS
* Los estilos están definidos en la seccion de <style> y usan la extencion .scss.
* Los estilos están "scoped", lo que significa que solo se aplicarán a este componente y no afectarán a otros componentes de la aplicación donde se reutilice.
* Se pueden modificar las variables $product-item-background-color, $product-item-border-color y $product-item-text-color, para cambiar el color del fondo, borde y texto del item de cada producto. 
* Los productos se muestran en una cuadrícula con un diseño responsivo. 
* Se usa una animación de transformación al pasar el mouse sobre cada producto para indicar la interactividad.

### Notas
* El componente depende de:
-    **axios**: Para hacer solicitudes HTTP a la API.
-    **vue-lazyload**: Para cargar las imágenes de los productos de manera perezosa.

### Recomendaciones sobre VueLazyLoad
La carga perezosa puede mejorar significativamente el rendimiento al reducir la cantidad de datos que necesitan ser cargados cuando la página se carga inicialmente. 

En este componente Vue, se utiliza la biblioteca vue-lazyload para implementar la carga perezosa de las imágenes de los productos:

```vue
<img v-lazy="product.image" :alt="'Imagen del producto ' + product.name" class="product-image">
```

De esta manera las imágenes que no están en la vista del usuario no se cargarán hasta que el usuario se desplace hasta ellas.

Es importante configuarar vue-lazyload en el archivo main.js:

```js
import VueLazyload from 'vue-lazyload';
import errorImage from './assets/error-image.png';
import loadingImage from './assets/loading-image.gif';

const app = createApp(App);

app.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImage,
  loading: loadingImage,
  attempt: 1
});

```

## Uso del componente
Para utilizar este componente, primero se debe descargar el archivo *ProductGallery.vue* que se encuentra dentro de *src/components* y agregarlo al proyecto donde se reutilizara. 
Posteriormeente se debe importar en el archivo donde se utilizara, luego, puedes utilizarlo como un elemento HTML personalizado, proporcionando la URL de la API como un atributo:  

A continuacion un ejemplo:

```vue 
<template>
  <main>
    <ProductGallery :apiUrl="'https://64766fef9233e82dd53a050e.mockapi.io/api/products'"/>
  </main>
</template>

<script setup>
import ProductGallery from './components/ProductGallery.vue';
</script>

```

## Demostracion
El ejemplo anterior se encuentra en el archivo *App.vue*, este componente utiliza [MockAPI](https://mockapi.io/) para crear una API de prueba que retorna datos de productos. 
La implementación de este componente se puede ver de la siguiente forma:

**Visualización de la galeria de productos**

![gallery product](https://github.com/MileydyMtz/vue-product-gallery-component/assets/85470047/4a7ee697-81ea-4c4b-ac85-5a8fcb3bd0e4)


**Vista Mobile **

![gallery product mobile](https://github.com/MileydyMtz/vue-product-gallery-component/assets/85470047/96f1e7d2-5e50-42bb-a932-4c092eb71df8)


**Carga de las imagenes**

![gallery product loading](https://github.com/MileydyMtz/vue-product-gallery-component/assets/85470047/0172924c-0d5a-43bc-b032-8de4427ffc5f)


**Mensaje al usuario si ocurre un error**

![gallery product error](https://github.com/MileydyMtz/vue-product-gallery-component/assets/85470047/b81b2f04-31ed-44b6-8f13-4cc9f6bd278d)


## Pruebas
Las pruebas se han implementado utilizando la biblioteca vitest para correr las pruebas y @vue/test-utils para montar el componente. Además, se usa flush-promises para asegurar que todas las promesas pendientes se hayan resuelto antes de proceder y axios-mock-adapter para simular las respuestas de la API. 
A continuacion se muestran las pruebas implementadas:
* **renders properly**: Esta prueba verifica que el componente se renderiza correctamente cuando recibe una respuesta exitosa de la API. Se proporciona una respuesta ficticia que incluye dos productos. Se espera que los detalles de ambos productos aparezcan en el texto renderizado del componente.
* **renders error message on failed request**: Esta prueba verifica que el componente muestra un mensaje de error cuando la petición a la API falla. Se configura el MockAdapter para responder con un error 500. Se espera que el mensaje de error aparezca en el texto renderizado del componente.
* **renders each product with all details**: Esta prueba verifica que el componente renderiza correctamente cada producto con todos sus detalles. Al igual que en la primera prueba, se proporciona una respuesta ficticia que incluye dos productos. Sin embargo, en lugar de simplemente buscar los detalles de los productos en el texto renderizado del componente, esta prueba verifica que cada producto se renderiza como un elemento con la clase .product-item y que cada uno de estos elementos contiene los detalles correctos.
