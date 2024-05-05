/** @odoo-module */

import { Navbar } from "@point_of_sale/app/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import { CreateProductPopup } from "./create_product_popup";

patch(Navbar.prototype, {
components: {
        ...Navbar.prototype.components,
        CreateProductPopup,
    },
    onProductCreateButtonClick() {
        this.hardwareProxy.openCashbox(_t("Create product"));
        this.popup.add(CreateProductPopup);
    }
});

