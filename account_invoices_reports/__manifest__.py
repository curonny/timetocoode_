{
    "name": "Odoo Move Report",
    "summary": """
        Odoo Move Report.""",
    "author": "Ronny Montano <<rmontano1992@gmail.com>>",
    "category": "Account",
    "version": "14.0.0.1.0",
    "depends": ["base", "account", "web"],
    "data": [
        "views/account_move_views.xml",
        "views/assets.xml",
    ],
    "qweb": [
        "static/src/xml/account_move_report.xml",
    ],
}
