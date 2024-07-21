from odoo import fields, models, api


class QuickAssist(models.Model):
    _name = 'quick.assist'
    _description = 'Description'

    res_model = fields.Many2one('ir.model', string='Resource Model')
    model = fields.Char('Model', related='res_model.model')
    title = fields.Char('Title')
    resume = fields.Text('Resume')
