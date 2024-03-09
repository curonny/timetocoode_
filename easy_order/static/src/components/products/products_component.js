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

// Easy Order will be a actions client to create purchase order and sale order more easy and quick
// just like point of sale

//EasyOrderProducts is the component name, when export is used the component is published to all modules that required it
export class EasyOrderProducts extends Component {
//In setup, load config..
// will start creating a user welcome notification
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });

  }

}

EasyOrderProducts.template = "owl.EasyOrderProducts";