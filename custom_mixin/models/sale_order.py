from odoo import fields, models, api


class SaleOrder(models.Model):
    _name = 'sale.order'
    _inherit = ['sale.order', 'validation.mixin']
    _allowed_group = 'sales_team.group_sale_manager'
    _non_allowed_field = 'partner_id'
