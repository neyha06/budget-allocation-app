import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  )
  if (amount === 0) return null

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
}

// Overall, this component calculates the total amount of uncategorized expenses
// using the getBudgetExpenses function and renders a BudgetCard component representing 
// the uncategorized expenses. If there are no uncategorized expenses, nothing is rendered.