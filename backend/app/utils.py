from collections import defaultdict

def calculate_balances(group):
    balances = defaultdict(float)
    for expense in group.expenses:
        amount = expense.amount
        paid_by = expense.paid_by
        splits = expense.splits

        for user_id, share in splits.items():
            if expense.split_type == "equal":
                split_amount = amount / len(splits)
            else:  # percentage
                split_amount = (share / 100.0) * amount
            balances[int(user_id)] -= split_amount
        balances[paid_by] += amount
    return balances

