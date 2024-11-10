"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react"
import { BarChartType } from "../../types/transaction"
import axios from "axios"






const BACKEND_URL = "http://localhost:5000/api/bar-chart"
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const chartConfig = {
  desktop: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BarCharts() {
    const [loading, setLoading] = useState(false)
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(3)
    const [chartData, setChartData] = useState<BarChartType[]>()

     
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
          const responseData = response.data as BarChartType[];
          setChartData(responseData)
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
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
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
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="range"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {!loading&&<Bar dataKey="count" fill="var(--color-desktop)" radius={8} />}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
