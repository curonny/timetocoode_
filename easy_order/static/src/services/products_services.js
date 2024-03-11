//** @odoo-module */

import { registry } from "@web/core/registry";

export const getOrmProducts = {
  dependencies: ["orm"],
  async start(env, { rpc, orm }) {
    const data = await orm.searchRead(
      "product.template",
      [],
      [ "name", "list_price","standard_price" ]
    );
    return data;
  },
};

//ADD DOMAIN TO GET PRODUCTS != 'service'
//Service indetifier
registry.category("services").add("easy_order.getProducts", getOrmProducts);