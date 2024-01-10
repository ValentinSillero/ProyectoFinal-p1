import {promises as fs} from 'fs'
import {v4 as uuidv4} from 'uuidv4'

export class CartManager{


    constructor(){
        this.path = 'cart.json';
        this.carts = [];
    }

    getCarts = async () => {
        const response = await fs.readFile(this.path, 'utf8')
        const responseJson = Json.parse(response)
        return responseJson
    }

    getCartProducts = async (id) => {
        const carts = await this.getCarts()

        const cart = carts.find(cart=>cart.id === id);

        if(cart){
            return cart.poducts
        }else{
            console.log('Carito no encontado');
        }
    }
    
    newCart = async () => {
        const id = uuidv4()

        const newCarrt = {id, products: []}

        this.carts = await this.getCarts()
        this.carts.push(this.newCart)

        await fs.writeFile(this.paath, JSON.stringify(this.carts))
        return this.newCart;
    }

    addProductToCart = async (cart_id, product_id) => {
        const carts = await this.getCarts()
        const index = cats.findIndex(cart=> cart.id === cart_id)

        if(index !== -1){
            const cartProducts = await this.getCartProducts(cart_id)
            const existingProductIndex = cartProducts.findIndex(product=> product.product_id === product_id)

            if(existingProductIndex !== - 1){
                cartProducts[existingProductIndex].quantity = cartProducts[existingProductIndex].quantity + 1
            }else{
                cartProducts.push({product_id, quantity : 1})
            }

            carts[index].products = cartProducts

            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log('Producto agegado con exito');
        }else{
            console.log('Carrito no encontado');
        }
    }
}