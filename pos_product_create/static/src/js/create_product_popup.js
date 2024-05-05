/** @odoo-module */

import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { parseFloat } from "@web/views/fields/parsers";
import { useState,useRef } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { useAsyncLockedMethod } from "@point_of_sale/app/utils/hooks";
import { Input } from "@point_of_sale/app/generic_components/inputs/input/input";

export class CreateProductPopup extends AbstractAwaitablePopup {
    static template = "pos_product_create.CreateProductPopup";
    static components = { Input };
    setup() {
        super.setup();
        this.notification = useService("pos_notification");
        this.popup = useService("popup");
        this.orm = useService("orm");
        this.typeProduct = useRef('type_product');
        this.state = useState({
            detailed_type: "",
            name: "",
            price: 1.0,
            barcode: "",
        });
    }

    async confirm() {
         const price = parseFloat(this.state.price);
        const detailed_type = this.typeProduct.el.value;
        const formattedAmount = this.env.utils.formatCurrency(price);
        const name = this.state.name;
        const barcode = this.state.barcode;
         await this.orm.call("product.product", "create", [{
            "name": name,
            "list_price":price,
            'barcode':barcode,
            'detailed_type':detailed_type,
            'default_code':barcode,
            'available_in_pos':true,
        }]);
        this.props.close();
        this.notification.add(
            _t("Successfully product  %s created", name),
            3000
        );
    }
   }