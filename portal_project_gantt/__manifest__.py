{
    "name": "Portal project gantt",
    "summary": """
        Portal project gantt.""",
    "author": "Time to coode",
    "category": "Project",
    "version": "17.0.0.1.0",
    "depends": ["portal", "project", "web"],
    'assets': {
        'web.assets_frontend': [
            'portal_project_gantt/static/src/**/*',
        ],
    },
    'data': [
        "views/project_portal_project_task_templates.xml",
    ],
}
