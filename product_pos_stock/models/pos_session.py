from odoo import fields, models, api


class PosSession(models.Model):
    _inherit = 'pos.session'

    def _loader_params_product_product(self):
        res = super()._loader_params_product_product()
        res['search_params']['fields'].append('qty_available')
        res['search_params']['fields'].append('virtual_available')
        return res
