import { BarCharts } from "./components/dashboaed/Bar-chart"
import { PieChartComponent } from "./components/dashboaed/Pie-chart"
import { Statistics } from "./components/dashboaed/Statistics"
import TransactionTable from "./components/dashboaed/TransationTabel"



function App() {


  return (
    <div >
      <div className="w-full flex justify-center items-center">
      <div className="w-3/4 mt-10">
      <TransactionTable/>
     </div>
    </div>
    <div className="w-full mt-5 flex justify-center gap-x-10">
      <div className="w-1/3">
        <BarCharts/>
      </div>
      <div>
        <Statistics/>
      </div>
      <div>
         <PieChartComponent/>
      </div>
    </div>
    </div>
  )
}

export default App
