/* @odoo-module */


import { Component, useState,onWillStart } from "@odoo/owl";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { deserializeDateTime } from "@web/core/l10n/dates";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
const { DateTime } = luxon;
import { _t } from "@web/core/l10n/translation";

export class HistoryMenu extends Component {
    static components = {Dropdown, DropdownItem};
    static props = [];
    static template = "my_history.Menu";

    setup() {
        this.rpc = useService("rpc");
        this.orm = useService("orm");
         this.action = useService("action");
        this.user = useService("user");
        this.date_formatter = registry.category("formatters").get("float_time");
        this.state = useState({
            favorites: [],
        }),
         onWillStart(async () => {
        await this.getInitialData()
    });
    }
    async getInitialData() {
        let favorite_list = [];
        const favorites =await this.orm.searchRead("my.favorite", [["user_id","=",this.user.userId]]);
        for (const favorite of favorites) {
            const record = await this.orm.read(favorite.res_model, [favorite.res_id], ['id','name']);
            favorite_list.push({"name":record[0].name,"res_id":favorite.res_id,"res_model":favorite.res_model,"favorite_id":favorite.id});
        }
        this.state.favorites = favorite_list;
        console.log(this.state.favorites);
    }
    onToggleFavorite(favorite) {
        console.log(favorite.name);
        console.log(favorite.res_id);
        console.log(favorite.res_model);
        console.log("favorite" + favorite);
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: _t(favorite.name),
            target: 'new',
            res_id: favorite.res_id,
            res_model: favorite.res_model,
            views: [[false, 'form']],
        });
    }
}

export const systrayHistory = {
    Component: HistoryMenu,
};

registry
    .category("systray")
    .add("my_history.Menu", systrayHistory, { sequence: 101 });
