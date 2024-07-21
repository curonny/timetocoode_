/** @odoo-module */

import { ProductCard } from "@point_of_sale/app/generic_components/product_card/product_card";
import { useService,useState,useBus } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { patch } from "@web/core/utils/patch";
import { PosBus } from "@point_of_sale/app/bus/pos_bus_service";
import { _t } from "@web/core/l10n/translation";

patch(ProductCard.prototype, {
 setup() {
        super.setup();
        this.pos = usePos();
    },
    getStockByProduct(productId){
        const  { qty_available, virtual_available }  =this.pos.db.product_by_id[productId];
        return { qty_available, virtual_available };
    }
});