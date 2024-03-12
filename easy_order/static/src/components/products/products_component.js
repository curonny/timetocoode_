/** @odoo-module **/

//A component is defined by js xml and scss files

//Registry: All registries in database, fields, actions, services
import { registry } from "@web/core/registry";
// getDefaultConfig Defines the default config
import { getDefaultConfig } from "@web/views/view";
// UseService is a hook, defined by owl and used by components
import { useService } from "@web/core/utils/hooks";

//UseState is a hook, defined to add reactivity to components
import { Component, useSubEnv, useState } from "@odoo/owl";

export class EasyOrderProducts extends Component {
static props = {
    product:{
        type: Object,
        shape: {
            id:Number,name:String,list_price:Number,standard_price:Number
        },
    },
    addToCard: Function,

};

addToCard(){
    this.props.addToCard(this.props.product.id);
}

}

EasyOrderProducts.template = "owl.EasyOrderProducts";