import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import flushPromises from 'flush-promises'
import ProductGallery from '../ProductGallery.vue'

describe('ProductGallery', () => {
    let mock

    beforeEach(() => {
        mock = new MockAdapter(axios)
    })

    afterEach(() => {
        mock.restore()
    })

    it('renders properly', async () => {
        const mockData = [
        {
            id: 1,
            name: 'Product 1',
            description: 'Description 1',
            price: 100,
            image: 'image1.png',
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            price: 200,
            image: 'image2.png',
        },
        ]

        mock.onGet('https://test-api.example.com/products').reply(200, mockData)

        const wrapper = mount(ProductGallery, { props: { apiUrl: 'https://test-api.example.com/products' } })

        await flushPromises()

        expect(wrapper.text()).toContain('Product 1')
        expect(wrapper.text()).toContain('Description 1')
        expect(wrapper.text()).toContain(100)
        expect(wrapper.text()).toContain('Product 2')
        expect(wrapper.text()).toContain('Description 2')
        expect(wrapper.text()).toContain(200)
    })

    it('renders error message on failed request', async () => {
        mock.onGet('https://test-api.example.com/products').reply(500)

        const wrapper = mount(ProductGallery, { props: { apiUrl: 'https://test-api.example.com/products' } })

        await flushPromises()

        expect(wrapper.text()).toContain('Lo sentimos, ha ocurrido un error al cargar los productos :(')
    })

    it('renders each product with all details', async () => {
        const mockData = [
            {
                id: 1,
                name: 'Product 1',
                description: 'Description 1',
                price: 100,
                image: 'image1.png',
            },
            {
                id: 2,
                name: 'Product 2',
                description: 'Description 2',
                price: 200,
                image: 'image2.png',
            },
        ]

        mock.onGet('https://test-api.example.com/products').reply(200, mockData)

        const wrapper = mount(ProductGallery, {
            props: { apiUrl: 'https://test-api.example.com/products' },
            global: {
                directives: {
                    lazy: {
                        mounted(el, binding) {
                        el.src = binding.value
                        },
                    },
                },
            },
        })

        await flushPromises()

        const productItems = wrapper.findAll('.product-item')
        expect(productItems.length).toBe(2)

        for (let i = 0; i < productItems.length; i++) {
        const productItem = productItems[i]

        expect(productItem.find('.product-title').text()).toBe(mockData[i].name)
        expect(productItem.find('.product-description').text()).toBe(mockData[i].description)
        expect(productItem.find('.product-price').text()).toBe(mockData[i].price.toString())

        const productImage = productItem.find('.product-image')
        expect(productImage.exists()).toBe(true)
        expect(productImage.attributes().src).toBe(mockData[i].image)
        }
    })
})
