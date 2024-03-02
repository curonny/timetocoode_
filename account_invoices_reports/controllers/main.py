# Part of Odoo. See LICENSE file for full copyright and licensing details.
# dict(self._fields['type'].selection).get(self.type)
from odoo import http
from odoo.http import request


class AccountMoveReportController(http.Controller):
    @http.route("/invoice_data", type="json", auth="user", website=True)
    def invoice_data_initial_data(self):
        invoices_data = []
        # Get customer invoices
        account_move = request.env["account.move"]
        invoices = request.env["account.move"].search([])
        [invoices_data.append(
            {"id": invoice.id, "name": invoice.name, "partner_id": invoice.partner_id.name,
             "ref": invoice.payment_reference,
             "show_on_report": invoice.show_on_report,
             "amount_total": invoice.amount_total_signed,
             "state": dict(account_move._fields['state'].selection).get(invoice.state)}) for invoice in invoices]
        return {
            "invoices": invoices_data,
        }
