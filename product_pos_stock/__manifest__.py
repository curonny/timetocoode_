{
    "name": "Show product stock in POS",
    "summary": """
        Odoo POS custom.""",
    "author": "Time to coode",
    "category": "POS",
    "version": "17.0.0.1.0",
    "depends": ["point_of_sale","web","bus"],
    'assets': {
        'point_of_sale._assets_pos': [
            'product_pos_stock/static/src/**/product_card.js',
            'product_pos_stock/static/src/**/product_screen.js',
            # 'product_pos_stock/static/src/js/pos_bus.js',
        ],
    },
}
