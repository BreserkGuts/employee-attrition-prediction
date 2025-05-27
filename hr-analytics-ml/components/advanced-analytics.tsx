"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Tooltip,
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3, TrendingUp, Users, Brain, Download, RefreshCw } from "lucide-react"

export default function AdvancedAnalytics() {
  const [isLoading, setIsLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  // Sample analytics data
  const sampleData = {
    departmentAttrition: [
      { department: "Sales", attritionRate: 20.6, totalEmployees: 446, attritionCount: 92 },
      { department: "R&D", attritionRate: 13.8, totalEmployees: 961, attritionCount: 133 },
      { department: "HR", attritionRate: 19.0, totalEmployees: 63, attritionCount: 12 },
    ],
    ageGroupAnalysis: [
      { ageGroup: "18-25", attritionRate: 25.4, avgSalary: 3200, satisfaction: 2.8 },
      { ageGroup: "26-35", attritionRate: 18.2, avgSalary: 4800, satisfaction: 3.1 },
      { ageGroup: "36-45", attritionRate: 12.1, avgSalary: 6200, satisfaction: 3.4 },
      { ageGroup: "46-55", attritionRate: 8.9, avgSalary: 7100, satisfaction: 3.6 },
      { ageGroup: "55+", attritionRate: 6.2, avgSalary: 7800, satisfaction: 3.8 },
    ],
    salaryImpact: [
      { salaryRange: "Under $3K", attritionRate: 31.2, count: 298 },
      { salaryRange: "$3K-$5K", attritionRate: 18.7, count: 412 },
      { salaryRange: "$5K-$8K", attritionRate: 12.4, count: 456 },
      { salaryRange: "$8K-$12K", attritionRate: 8.1, count: 234 },
      { salaryRange: "Over $12K", attritionRate: 4.3, count: 70 },
    ],
    tenureAnalysis: [
      { tenure: "0-1 years", attritionRate: 35.8, count: 237 },
      { tenure: "1-3 years", attritionRate: 22.1, count: 398 },
      { tenure: "3-5 years", attritionRate: 15.6, count: 287 },
      { tenure: "5-10 years", attritionRate: 11.2, count: 342 },
      { tenure: "10+ years", attritionRate: 6.8, count: 206 },
    ],
    satisfactionCorrelation: [
      { satisfaction: 1, attritionRate: 42.3, workLifeBalance: 1.8 },
      { satisfaction: 2, attritionRate: 28.7, workLifeBalance: 2.4 },
      { satisfaction: 3, attritionRate: 12.1, workLifeBalance: 3.1 },
      { satisfaction: 4, attritionRate: 6.9, workLifeBalance: 3.7 },
    ],
    overtimeImpact: [
      { category: "No Overtime", attritionRate: 10.4, count: 1054 },
      { category: "Regular Overtime", attritionRate: 30.5, count: 416 },
    ],
    featureImportance: [
      { feature: "Monthly Income", importance: 0.156, impact: "High" },
      { feature: "Overtime", importance: 0.142, impact: "High" },
      { feature: "Age", importance: 0.098, impact: "Medium" },
      { feature: "Total Working Years", importance: 0.087, impact: "Medium" },
      { feature: "Years at Company", importance: 0.076, impact: "Medium" },
      { feature: "Job Satisfaction", importance: 0.065, impact: "Medium" },
      { feature: "Work Life Balance", importance: 0.058, impact: "Medium" },
      { feature: "Environment Satisfaction", importance: 0.052, impact: "Low" },
      { feature: "Job Level", importance: 0.048, impact: "Low" },
      { feature: "Stock Option Level", importance: 0.043, impact: "Low" },
    ],
    predictiveInsights: {
      highRiskEmployees: 127,
      mediumRiskEmployees: 234,
      lowRiskEmployees: 1109,
      averageAttritionRate: 16.1,
      predictedNextQuarter: 18.3,
      costOfAttrition: 2.4, // in millions
    },
  }

  const loadAnalytics = async () => {
    setIsLoading(true)
    // Simulate API call to Python backend for advanced analytics
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setAnalyticsData(sampleData)
    setIsLoading(false)
  }

  useEffect(() => {
    loadAnalytics()
  }, [])

  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"]

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Advanced Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500" />
            <p>Loading advanced analytics...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analyticsData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Advanced Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={loadAnalytics}>Load Analytics</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Insights Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Employees</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{analyticsData.predictiveInsights.highRiskEmployees}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {analyticsData.predictiveInsights.mediumRiskEmployees}
            </div>
            <p className="text-xs text-muted-foreground">Monitor closely</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analyticsData.predictiveInsights.lowRiskEmployees}</div>
            <p className="text-xs text-muted-foreground">Stable employees</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attrition Cost</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${analyticsData.predictiveInsights.costOfAttrition}M
            </div>
            <p className="text-xs text-muted-foreground">Annual estimated cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="department" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="department">Department</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="features">Feature Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="department" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attrition by Department</CardTitle>
              <CardDescription>Department-wise attrition rates and employee counts</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attritionRate: { label: "Attrition Rate (%)", color: "hsl(var(--chart-1))" },
                  totalEmployees: { label: "Total Employees", color: "hsl(var(--chart-2))" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.departmentAttrition}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="attritionRate" fill="var(--color-attritionRate)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overtime Impact on Attrition</CardTitle>
              <CardDescription>
                Comparison of attrition rates between employees with and without overtime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attritionRate: { label: "Attrition Rate (%)", color: "hsl(var(--chart-3))" },
                }}
                className="h-60"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.overtimeImpact}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, attritionRate }) => `${category}: ${attritionRate}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="attritionRate"
                    >
                      {analyticsData.overtimeImpact.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Age Group Analysis</CardTitle>
              <CardDescription>Attrition rates, salary, and satisfaction by age groups</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attritionRate: { label: "Attrition Rate (%)", color: "hsl(var(--chart-1))" },
                  avgSalary: { label: "Average Salary ($)", color: "hsl(var(--chart-2))" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData.ageGroupAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="attritionRate"
                      stackId="1"
                      stroke="var(--color-attritionRate)"
                      fill="var(--color-attritionRate)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tenure vs Attrition</CardTitle>
              <CardDescription>How employee tenure affects attrition likelihood</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attritionRate: { label: "Attrition Rate (%)", color: "hsl(var(--chart-4))" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.tenureAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tenure" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="attritionRate"
                      stroke="var(--color-attritionRate)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-attritionRate)", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compensation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary Impact on Attrition</CardTitle>
              <CardDescription>Attrition rates across different salary ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attritionRate: { label: "Attrition Rate (%)", color: "hsl(var(--chart-1))" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.salaryImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="salaryRange" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="attritionRate" fill="var(--color-attritionRate)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compensation Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">High earners (&gt;$12K)</span>
                  <Badge variant="default">4.3% attrition</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Low earners (&lt;$3K)</span>
                  <Badge variant="destructive">31.2% attrition</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Salary correlation</span>
                  <Badge variant="secondary">Strong negative</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>• Review compensation for employees earning &lt;$5K</p>
                  <p>• Implement retention bonuses for high performers</p>
                  <p>• Consider market rate adjustments</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Avg replacement cost</span>
                  <span className="font-semibold">$18,900</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Annual attrition cost</span>
                  <span className="font-semibold text-red-600">$2.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Potential savings</span>
                  <span className="font-semibold text-green-600">$1.2M</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Satisfaction vs Attrition</CardTitle>
              <CardDescription>Correlation between satisfaction levels and attrition rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attritionRate: { label: "Attrition Rate (%)", color: "hsl(var(--chart-2))" },
                  workLifeBalance: { label: "Work Life Balance", color: "hsl(var(--chart-3))" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.satisfactionCorrelation}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="satisfaction" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="attritionRate"
                      stroke="var(--color-attritionRate)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-attritionRate)", strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="workLifeBalance"
                      stroke="var(--color-workLifeBalance)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Job Satisfaction (Avg)</span>
                    <Badge variant="secondary">2.73/4</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Work-Life Balance (Avg)</span>
                    <Badge variant="secondary">2.76/4</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Environment Satisfaction</span>
                    <Badge variant="secondary">2.72/4</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Relationship Satisfaction</span>
                    <Badge variant="secondary">2.71/4</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Action Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>• Focus on improving work-life balance initiatives</p>
                  <p>• Implement regular satisfaction surveys</p>
                  <p>• Address low satisfaction scores immediately</p>
                  <p>• Create employee wellness programs</p>
                  <p>• Enhance workplace environment</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Importance Analysis</CardTitle>
              <CardDescription>Machine learning model feature importance for attrition prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  importance: { label: "Importance Score", color: "hsl(var(--chart-1))" },
                }}
                className="h-96"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.featureImportance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="feature" type="category" width={150} fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="importance" fill="var(--color-importance)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">High Impact Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {analyticsData.featureImportance
                  .filter((f: any) => f.impact === "High")
                  .map((feature: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{feature.feature}</span>
                      <Badge variant="destructive">{(feature.importance * 100).toFixed(1)}%</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medium Impact Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {analyticsData.featureImportance
                  .filter((f: any) => f.impact === "Medium")
                  .map((feature: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{feature.feature}</span>
                      <Badge variant="secondary">{(feature.importance * 100).toFixed(1)}%</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Low Impact Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {analyticsData.featureImportance
                  .filter((f: any) => f.impact === "Low")
                  .map((feature: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{feature.feature}</span>
                      <Badge variant="outline">{(feature.importance * 100).toFixed(1)}%</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Actions</CardTitle>
          <CardDescription>Download reports and take action based on insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Analytics Report
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download High-Risk Employee List
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analytics
            </Button>
            <Button>
              <Brain className="h-4 w-4 mr-2" />
              Generate Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
