/** @odoo-module */

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import publicWidget from "@web/legacy/js/public/public_widget";
import { onWillStart, useState, onWillUpdateProps, Component } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";

var PortalGantt = publicWidget.Widget.extend({
    template: 'portal_project_gantt.PortalGantt',

    init: function (parent, options) {
        this._super.apply(this, arguments);
    },
});
export default {
    PortalGantt: PortalGantt,
};
