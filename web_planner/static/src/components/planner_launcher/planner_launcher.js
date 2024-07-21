/* @odoo-module */


import { Component, useState,onWillStart,onWillRender,onRendered } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useBus,useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { PlannerDialog } from "../planner_dialog/planner_dialog";

export class PlannerLauncher extends Component {
static components = {Dropdown, DropdownItem};
    static props = [];
    static template = "web_planner.PlannerLauncher";
    setup() {
        this.ui = useService("ui");
        this.menuService = useService("menu");
        this.orm = useService("orm");
        this.router = useService("router");
        this.action = useService("action");
        this.rpc = useService("rpc");
        this.state = useState({
            exist_planner: false,
            planner_id: {},
            all_planners: [],
        })
        this.orm = useService("orm");
        this.action = useService("action");
        this.user = useService("user");
        this.dialogService = useService("dialog");

        useBus(this.env.bus,"ACTION_MANAGER:UI-UPDATED", ({ detail: mode }) => {
           this.state.planner_id = this.findPlannerByMenuId(this.router.current.hash.menu_id);
           this.state.exist_planner = this.state.planner_id ? true : false;
        });
         onWillStart(async () => {
            this.loadPlanners();
         });
         onWillRender( () => {
         console.log("onWillRender",this.state);
         });

         onRendered(() => {
         console.log("onRendered",this.state);
         });
    }

    getMenuId() {
        return new Promise((resolve, reject) => {
            try {
                const menuId = this.router.current.hash.menu_id;
                resolve(menuId);
            } catch (error) {
                reject(error);
            }
        });
    }
    async loadPlanners() {
        const planners = await this.orm.searchRead("web.planner", []);
        console.log(planners);
        this.state.all_planners = planners;
    }
    async get_planner_for_menu_id(menu_id) {

    }

     findPlannerByMenuId(menu_id) {
        console.log("findPlannerByMenuId",this.router.current.hash.menu_id);
        return this.state.all_planners.some(planner => planner.menu_id[0] === this.router.current.hash.menu_id);
    }

    onTogglePlanner() {
        this.dialogService.add(PlannerDialog, {

        })
    }
}

export const systrayLauncher = {
    Component: PlannerLauncher,
};

registry
    .category("systray")
    .add("web_planner.PlannerLauncher", systrayLauncher, { sequence: 101 });

