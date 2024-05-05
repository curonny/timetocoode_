from odoo import fields, models, api


class AccountMove(models.Model):
    _name = 'account.move'
    _inherit = ['account.move', 'validation.mixin']
    _allowed_group = 'account.group_account_manager'
    _non_allowed_field = 'partner_id'
