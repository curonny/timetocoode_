/** @odoo-module **/

//A component is defined by js xml and scss files

//Registry: All registries in database, fields, actions, services
import { registry } from "@web/core/registry";
// getDefaultConfig Defines the default config
import { getDefaultConfig } from "@web/views/view";
// UseService is a hook, defined by owl and used by components
import { useService } from "@web/core/utils/hooks";

//UseState is a hook, defined to add reactivity to components
import { Component, useSubEnv, useState,useRef,onWillStart } from "@odoo/owl";
import { EasyOrderProducts } from "../products/products_component";
import { EasyOrderProductsShoppingCart } from "../car/car_component";

// Easy Order will be a actions client to create purchase order and sale order more easy and quick
// just like point of sale
export class EasyOrder extends Component {
//In setup, load config..
// will start creating a user welcome notification
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });
    this.notificationService = useService("notification");

    this.notificationService.add("Hello, welcome to order easy creator");
    this.state = useState({
        amount_total:0,
        products:[],
        shoppingCart:[],
    })
    this.productModel = 'product.template'
    this.orm = useService("orm");
    this.searchInput = useRef('search-input');
    onWillStart(async () => {
        await this.getAllProducts()
    })

  }
    async getAllProducts(){
        this.state.products = await this.orm.searchRead(this.productModel, [["detailed_type", "!=", "service"]], ["name", "list_price","standard_price","image_128"])
    }
    async searchProducts(){
        const textProduct = this.searchInput.el.value;
        this.state.products = await this.orm.searchRead(this.productModel, [["name", "ilike", textProduct]], ["name", "list_price","standard_price"])
    }

    addToCard(productId){

        const productIndex = this.state.products.findIndex(product => product.id === productId);
        const productInCartIndex = this.state.shoppingCart.findIndex(product => product.id === productId);

        if(productInCartIndex === -1){
            this.state.shoppingCart.push({
            "id":productId,
            "name":this.state.products[productIndex].name,
            "list_price":this.state.products[productIndex].list_price,
            "standard_price":this.state.products[productIndex].standard_price,
            "quantity":1,
            "price_subtotal":this.state.products[productIndex].list_price*1
            })
        }
        else{
            this.state.shoppingCart[productInCartIndex].quantity += 1;
            this.state.shoppingCart[productInCartIndex].price_subtotal = this.state.shoppingCart[productInCartIndex].list_price * this.state.shoppingCart[productInCartIndex].quantity;
        }
        this.state.amount_total = this.state.shoppingCart.reduce((total, product) => total + (product.price_subtotal), 0);
        this.notificationService.add("Product "+ this.state.products[productIndex].name + " added to card");
    }
}

// In this case, we are assigning a xml template to js component
EasyOrder.template = "owl.EasyOrder";
EasyOrder.components = {EasyOrderProducts,EasyOrderProductsShoppingCart};

// With registry, and actions, yo can add ir.actions.client

//owl.EasyOrder is the actions identifier, because registry is a object pair att/value
registry.category("actions").add("owl.EasyOrder", EasyOrder);

//its time to define a products component