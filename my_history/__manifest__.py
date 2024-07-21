{
    "name": "Add item to favorite and recent list",
    "summary": """
        Add item to favorite and recent list.""",
    "author": "Time to coode",
    "category": "POS",
    "version": "17.0.0.1.0",
    "depends": ["web"],
    "data": [
        "security/ir.model.access.csv",
    ],
    'assets': {
        'web.assets_backend': [
            'my_history/static/src/**/*',
        ],
    }

}
