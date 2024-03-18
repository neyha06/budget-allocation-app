//import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import { Button, Stack } from 'react-bootstrap';

import BudgetCard from './Components/BudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpenseModal from './Components/AddExpenseModal';
import ViewExpensesModal from './Components/ViewExpensesModal';
import UncategorizedBudgetCard from './Components/UncategorizedBudgetCard';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';
import TotalBudgetCard from './Components/TotalBudgetCard';


function App() {
  const [showAddBudgetModal,setShowAddBudgetModal]= useState(false)
  const [showAddExpenseModal,setShowAddExpenseModal] = useState(false)
  const [ViewExpensesModalBudgetId,setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId,setAddExpenseModalBudgetId] = useState()
  const {budgets,getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)

  }
  return (
    <>
   <Container className='my-4'>
    <Stack direction="horizontal" gap="2"  classNam ="mb-4" >
    <h1 className ="me-auto">Budgets</h1>
    <Button varient="primary" onClick={()=> setShowAddBudgetModal(true)}>Add Budget</Button>
    <Button varient="outline-primary " onClick={openAddExpenseModal}>
      Add Expense
      </Button>
    </Stack>
    <div style={{
      display:'grid',
      gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
      gap:"1rem",
      alignItems:"flex-start"
    }}
    >
      {
        budgets.map(budget=>{
          const amount= getBudgetExpenses(budget.id).reduce(
            (total,expense)=> total + expense.amount,0)
         return( 
       <BudgetCard
       key={budget.id}
       name={budget.name} 
       amount={amount}
       max={budget.max}
       onAddExpenseClick ={()=> openAddExpenseModal(budget.id)}
       onViewExpenseClick ={()=> setViewExpensesModalBudgetId(budget.id)}
       />
         )
 } )
      }
      
      <UncategorizedBudgetCard   onAddExpenseClick ={ openAddExpenseModal}
      onViewExpenseClick ={ ()=> setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
      <TotalBudgetCard />
    </div>
   </Container>
   <AddBudgetModal
      show={showAddBudgetModal}
      defaultBudgetId={addExpenseModalBudgetId}
      handleClose= {()=> setShowAddBudgetModal(false)}
       />
   <AddExpenseModal 
   show={showAddExpenseModal} 
   defaultBudgetId={addExpenseModalBudgetId}
   handleClose= {()=> setShowAddExpenseModal(false)}
    />

   <ViewExpensesModal
      budgetId={ViewExpensesModalBudgetId} 
      handleClose= {()=> setViewExpensesModalBudgetId()}
    />
    
   </>
  );
}

export default App;
