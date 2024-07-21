/* @odoo-module */


import { Component, useState,onWillStart } from "@odoo/owl";
import { useBus,useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { Dialog } from "@web/core/dialog/dialog";

export class PlannerDialog extends Component {
    static components = { Dialog };
    static props = [];
    static template = "web_planner.PlannerDialog";
    setup() {
        this.rpc = useService("rpc");
        this.orm = useService("orm");
    }
}