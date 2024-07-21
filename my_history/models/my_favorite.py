from odoo import fields, models, api


class MailFavorite(models.Model):
    _name = 'my.favorite'
    _description = 'Description'

    user_id = fields.Many2one('res.users', string='User')
    res_model = fields.Char('Resource Model', readonly=True)
    res_field = fields.Char('Resource Field', readonly=True)
    res_id = fields.Many2oneReference('Resource ID', model_field='res_model',
                                      readonly=True)
    company_id = fields.Many2one('res.company', string='Company', change_default=True,
                                 default=lambda self: self.env.company)
