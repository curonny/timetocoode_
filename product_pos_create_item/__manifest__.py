{
    "name": "POS Product create",
    "summary": """
        Odoo POS custom.""",
    "author": "Time to coode",
    "category": "Sale",
    "version": "17.0.0.1.0",
    "depends": ["point_of_sale"],
    "price": 5,
    "currency": "EUR",
    'assets': {
        'point_of_sale._assets_pos': [
            'product_pos_create_item/static/src/**/*',
        ],
    },
}
