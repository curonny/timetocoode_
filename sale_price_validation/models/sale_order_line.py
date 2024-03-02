from odoo import api, fields, models, SUPERUSER_ID, _
from odoo.exceptions import MissingError, ValidationError


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'

    @api.constrains('price_unit')
    def _constrains_price_unit(self):
        # Use for (If not use for, the pattern singlenton should be launched)
        # The price unit should greater than standard price + 15%

        #READY
        for line in self:
            print(line.product_id.standard_price * 1.15)
            if line.price_unit < (line.product_id.standard_price * 1.15):
                raise ValidationError(_("The price greater than standard price + 15%"))
