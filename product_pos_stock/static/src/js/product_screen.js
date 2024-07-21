/** @odoo-module */

import { ProductCard } from "@point_of_sale/app/generic_components/product_card/product_card";
import { useService,useState,useBus } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { patch } from "@web/core/utils/patch";
import { PosBus } from "@point_of_sale/app/bus/pos_bus_service";
import { _t } from "@web/core/l10n/translation";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
patch(ProductScreen.prototype, {
 setup() {
        super.setup();
        this.pos = usePos();
        this.busService = this.env.services.bus_service;
        this.notification = useService("pos_notification");
//        this.busService.addEventListener("notification", this.onMessage.bind(this))
    },
    onMessage({ detail: notifications }) {
        notifications.forEach((notification) => {
        console.log(notification.type);
            if (notification.type === "POS-GLOBAL-NOTIFICATION-FROM-SALE-ORDER") {
                this.notification.add(_t("Estimado " + this.pos.user.name + ", la orden de venta "+ notification.payload.name + " ha sido confirmada"), 5000);
            }
        })
  }
});