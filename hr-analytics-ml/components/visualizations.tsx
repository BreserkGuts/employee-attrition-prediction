"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMLContext } from "@/contexts/ml-context"
import { BarChart3, PieChartIcon, TrendingUp } from "lucide-react"

export default function Visualizations() {
  const { data, featureImportance, modelMetrics } = useMLContext()

  // Prepare data for visualizations
  const attritionByDepartment = data.reduce(
    (acc, emp) => {
      const dept = emp.Department
      if (!acc[dept]) {
        acc[dept] = { department: dept, total: 0, attrition: 0 }
      }
      acc[dept].total++
      if (emp.Attrition === "Yes") {
        acc[dept].attrition++
      }
      return acc
    },
    {} as Record<string, any>,
  )

  const departmentData = Object.values(attritionByDepartment).map((item: any) => ({
    ...item,
    rate: ((item.attrition / item.total) * 100).toFixed(1),
  }))

  const ageGroups = data.reduce(
    (acc, emp) => {
      const ageGroup = emp.Age < 30 ? "Under 30" : emp.Age < 40 ? "30-39" : emp.Age < 50 ? "40-49" : "50+"
      if (!acc[ageGroup]) {
        acc[ageGroup] = { ageGroup, total: 0, attrition: 0 }
      }
      acc[ageGroup].total++
      if (emp.Attrition === "Yes") {
        acc[ageGroup].attrition++
      }
      return acc
    },
    {} as Record<string, any>,
  )

  const ageData = Object.values(ageGroups).map((item: any) => ({
    ...item,
    rate: ((item.attrition / item.total) * 100).toFixed(1),
  }))

  const overallAttrition = [
    { name: "Stayed", value: data.filter((d) => d.Attrition === "No").length, color: "#22c55e" },
    { name: "Left", value: data.filter((d) => d.Attrition === "Yes").length, color: "#ef4444" },
  ]

  const salaryRanges = data.reduce(
    (acc, emp) => {
      const range =
        emp.MonthlyIncome < 3000
          ? "Under $3K"
          : emp.MonthlyIncome < 6000
            ? "$3K-$6K"
            : emp.MonthlyIncome < 10000
              ? "$6K-$10K"
              : "Over $10K"
      if (!acc[range]) {
        acc[range] = { range, total: 0, attrition: 0 }
      }
      acc[range].total++
      if (emp.Attrition === "Yes") {
        acc[range].attrition++
      }
      return acc
    },
    {} as Record<string, any>,
  )

  const salaryData = Object.values(salaryRanges).map((item: any) => ({
    ...item,
    rate: Number.parseFloat(((item.attrition / item.total) * 100).toFixed(1)),
  }))

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Visualizations</CardTitle>
          <CardDescription>Upload data to see interactive visualizations and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">No data available for visualization</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Feature Importance */}
      {featureImportance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Feature Importance
            </CardTitle>
            <CardDescription>Top 10 features that influence employee attrition prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                importance: {
                  label: "Importance",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="feature" type="category" width={120} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="importance" fill="var(--color-importance)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Overall Attrition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Overall Attrition Distribution
          </CardTitle>
          <CardDescription>Breakdown of employees who stayed vs. left the company</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              stayed: { label: "Stayed", color: "#22c55e" },
              left: { label: "Left", color: "#ef4444" },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallAttrition}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {overallAttrition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Attrition by Department */}
      <Card>
        <CardHeader>
          <CardTitle>Attrition Rate by Department</CardTitle>
          <CardDescription>Percentage of employees who left by department</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              rate: {
                label: "Attrition Rate (%)",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rate" fill="var(--color-rate)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Attrition by Age Group */}
      <Card>
        <CardHeader>
          <CardTitle>Attrition Rate by Age Group</CardTitle>
          <CardDescription>How attrition varies across different age groups</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              rate: {
                label: "Attrition Rate (%)",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rate" fill="var(--color-rate)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Attrition by Salary Range */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Attrition Rate by Salary Range
          </CardTitle>
          <CardDescription>Relationship between compensation and employee retention</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              rate: {
                label: "Attrition Rate (%)",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--color-rate)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-rate)", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Model Performance Metrics */}
      {modelMetrics && (
        <Card>
          <CardHeader>
            <CardTitle>Model Performance Metrics</CardTitle>
            <CardDescription>Evaluation metrics for the trained classification model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{(modelMetrics.accuracy * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{(modelMetrics.precision * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Precision</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{(modelMetrics.recall * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Recall</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{(modelMetrics.f1Score * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">F1 Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
