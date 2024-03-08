import xmlrpc.client
from datetime import datetime

url = 'http://localhost:8017'
db = "youtube17"
username = 'admin'
password = "e2a48d6929acd8e8d19dea43294ccbaa9fb814a7"

# You can use password o token created
common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))
common.version()

print(common.version())

# How to use ODOO API xmlrpc

# Lets go to create TOKEN

# Login

uid = common.authenticate(db, username, password, {})

print(f"User id: {uid}")

# We can create a new user or read contacts ..
# Couting contacts

# We need to get models to use orm functions

models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(url))

# search over res.partner model with is_company = True
partners = models.execute_kw(db, uid, password, 'res.partner', 'search', [[['is_company', '=', True]]])
print(f"Partners id: {partners}")

# Now lets go to create CONTACT

partner_id = models.execute_kw(db, uid, password, 'res.partner', 'create',
                               [{'name': "Partner testing", "email": "usermail@mail.com"}])

# CREATING INVOICES

move_id = models.execute_kw(db, uid, password, 'account.move', 'create', [{
    'name': "/",
    'partner_id': 14,
    "invoice_date": datetime.now().strftime("%Y-%m-%d"),
    "move_type": "out_invoice",
    "ref": "test",
    "invoice_line_ids": [
        (0, 0, {'product_id': 28, 'quantity': 1, 'price_unit': 115}),
    ]
}])

# Lets go to validate invoice


models.execute_kw(db, uid, password, 'account.move', 'action_post', [[move_id]])
