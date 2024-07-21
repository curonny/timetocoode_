from odoo import fields, models, api


class SaleOrder(models.Model):
    _inherit = 'sale.order'

    def action_confirm(self):
        res = super(SaleOrder, self).action_confirm()
        pos_session = self.env['pos.session'].search([('state', '=', 'opened')], limit=1)
        self.env['bus.bus']._sendone(pos_session._get_bus_channel_name(), 'POS-GLOBAL-NOTIFICATION-FROM-SALE-ORDER',
                                     {"name": self.name})
        return res
