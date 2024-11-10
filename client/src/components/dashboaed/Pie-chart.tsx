"use client"


import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import axios from "axios"
import { useEffect, useState } from "react"
import { PieChartType } from "../../types/transaction"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


const chartConfig = {
  visitors: {
    label: "count",
  },
  womensClothing: {
    label: "women's clothing",
    color: "hsl(var(--chart-1))",
  },
  electronics: {
    label: "electronics",
    color: "hsl(var(--chart-2))",
  },
  jewelery: {
    label: "jewelery",
    color: "hsl(var(--chart-3))",
  },
  mensClothing: {
    label: "men's clothing",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const BACKEND_URL = "http://localhost:5000/api/pie-chart"
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function PieChartComponent() {
    const [loading, setLoading] = useState(false)
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(3)
    const [chartData, setChartData] = useState<PieChartType[]>()

     
    const handleMonthChange = (value: string) => {
        const monthIndex = months.indexOf(value)
        setSelectedMonthIndex(monthIndex)
      }
  

    const fetchPiechartData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${BACKEND_URL}`, {
            params: {
              month: selectedMonthIndex === 0 ? null : selectedMonthIndex
            }
          });
          const responseData = response.data as PieChartType[];
           const modifiedData = responseData.map((data)=>{
            return {...data, fill: `var(--color-${data.category})`}
           })
          setChartData(modifiedData)
        } catch (error) {
          console.error('Error fetching transactions:', error)
        } finally {
          setLoading(false)
        }
      }
      useEffect(() => {
        fetchPiechartData()
      }, [selectedMonthIndex])
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>
            <div className="flex justify-between">
            <div className="">
            <Select 
            value={months[selectedMonthIndex]}
            onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[150px] h-[25px]">
            <SelectValue placeholder="Month" />
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
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
           {!loading&& <Pie data={chartData} dataKey="count" nameKey="category" />}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
