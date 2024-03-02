#!/usr/bin/env python

from odoo import _, api, fields, models


class AccountMove(models.Model):
    _inherit = "account.move"

    show_on_report = fields.Boolean(string="Show on Report", default=True)

    @api.model
    def get_invoice_data(self, data, search_criteria=None):
        return {
        }

    def validate_invoice_from_report(self):
        self.action_post()
