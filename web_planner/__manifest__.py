# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Planner',
    'category': 'Web',
    'summary': 'Help to configure application',
    'version': '17.0.0.1.0',
    'description': """Application Planner""",
    'depends': ['web', 'base', 'mail'],
    'data': [
        'security/ir.model.access.csv',
        'views/web_planner_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'web_planner/static/src/components/**/*',
            # 'web_planner/static/src/webclient.js',
        ],
    },
    'installable': True,
    'auto_install': True,
}
