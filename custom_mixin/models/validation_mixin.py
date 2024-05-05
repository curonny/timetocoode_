from odoo import fields, models, api
from odoo.exceptions import ValidationError


class ModelName(models.AbstractModel):
    _name = 'validation.mixin'
    _description = 'Use mixin to restrict model modification'
    _allowed_group = ''
    _non_allowed_field = ''

    def write(self, vals):
        if not self.env.user.has_group(self._allowed_group) and self._non_allowed_field in vals:
            raise ValidationError(f'You are not allowed to modify {self._non_allowed_field} in this model')
        return super(ModelName, self).write(vals)
