import axios from "axios"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { StatType } from "../../types/transaction"
import { useEffect, useState } from "react"


const BACKEND_URL = "http://localhost:5000/api/statistics"
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']




export function Statistics() {
    const [loading, setLoading] = useState(false)
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(3)
    const [statData, setstatData] = useState<StatType>()

     
    const handleMonthChange = (value: string) => {
        const monthIndex = months.indexOf(value)
        setSelectedMonthIndex(monthIndex)
      }
  

    const fetchBarchartData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${BACKEND_URL}`, {
            params: {
              month: selectedMonthIndex === 0 ? null : selectedMonthIndex
            }
          });
          const responseData = response.data as StatType;
          setstatData(responseData)
        } catch (error) {
          console.error('Error fetching transactions:', error)
        } finally {
          setLoading(false)
        }
      }
      useEffect(() => {
        fetchBarchartData()
      }, [selectedMonthIndex])
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-between">
        <CardTitle>Statistics</CardTitle>
        <div>
              <Select  
                    value={months[selectedMonthIndex]}
                    onValueChange={handleMonthChange}>
                <SelectTrigger id="month">
                  <SelectValue placeholder="month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                 </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
        </div>
      </CardHeader>
     {!loading &&  <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex justify-between space-x-1.5">
              <Label htmlFor="name">total amount of sale: </Label>
              <div className="mr-10">{statData?.totalSaleAmount}</div>
            </div>
            <div className="flex justify-between space-x-1.5">
              <Label htmlFor="name">total sold items: </Label>
              <div className="mr-10">{statData?.soldItems}</div>
            </div>
            <div className="flex justify-between space-x-1.5">
              <Label htmlFor="name">total not sold items: </Label>
              <div className="mr-10">{statData?.notSoldItems}</div>
            </div>
          </div>
      </CardContent>}
    </Card>
  )
}
