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
    const notificationService = useService("notification");

    notificationService.add("Hello, welcome to order easy creator");
    this.state = useState({
        products:[],
    })
    this.productModel = 'product.template'
    this.orm = useService("orm");
    this.searchInput = useRef('search-input');
    onWillStart(async () => {
        await this.getAllProducts()
    })

  }
    async getAllProducts(){
        this.state.products = await this.orm.searchRead(this.productModel, [["detailed_type", "!=", "service"]], ["name", "list_price","standard_price"])
    }
    async searchProducts(){
        const textProduct = this.searchInput.el.value;
        this.state.products = await this.orm.searchRead(this.productModel, [["name", "ilike", textProduct]], ["name", "list_price","standard_price"])
    }
}

// In this case, we are assigning a xml template to js component
EasyOrder.template = "owl.EasyOrder";
EasyOrder.components = {EasyOrderProducts};

// With registry, and actions, yo can add ir.actions.client

//owl.EasyOrder is the actions identifier, because registry is a object pair att/value
registry.category("actions").add("owl.EasyOrder", EasyOrder);

//its time to define a products component