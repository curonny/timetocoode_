/** @odoo-module **/

import { registry } from "@web/core/registry";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";

import { Component, useSubEnv, useState } from "@odoo/owl";

export class EasyOrderProductsShoppingCart extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });

  }

}

EasyOrderProductsShoppingCart.template = "owl.EasyOrderProductsShoppingCart";