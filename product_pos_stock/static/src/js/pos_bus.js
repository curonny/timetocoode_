/** @odoo-module */
import { useComponent } from "@odoo/owl";
import { patch } from "@web/core/utils/patch";
import { PosBus } from "@point_of_sale/app/bus/pos_bus_service";
import { useService } from "@web/core/utils/hooks";

patch(PosBus.prototype, {
    dispatch(message) {
        super.dispatch(...arguments);
        if (message.type === "POS-GLOBAL-NOTIFICATION-FROM-SALE-ORDER") {
           console.log("RECIBIDO EN MI METODO:",message);
        }
    },
});