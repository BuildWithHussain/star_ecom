import frappe


@frappe.whitelist()
def place_order(products):
	if not products:
		frappe.throw("Can't place order with no items")

	current_user = frappe.session.user
	new_order = frappe.new_doc("Order")
	new_order.customer = current_user
	new_order.set("items", products)

	new_order.insert(ignore_permissions=True)
	return new_order
