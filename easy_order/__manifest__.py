# -*- coding: utf-8 -*-
{
    'name': "Create easy order",
    'summary': """""",
    'description': """ """,
    'author': "Time to coode",
    'category': 'Sale & Purchase',
    'version': '17.0.0.0.1',
    'license': 'LGPL-3',
    'depends': ['purchase', 'sale', 'sale_management'],
    'data': [
        "views/ir_actions_clients.xml",
    ],
    # Define assets backend because will use functions as internal user
    # We are importing 2 levels of static files
    'assets': {
        'web.assets_backend': ['easy_order/static/src/**/*'],
    },
    'application': True,
    'installable': True,
}
