"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Calculator, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

interface SingleEmployeePredictionProps {
  modelStatus: {
    isLoaded: boolean
    accuracy: number
    lastTrained: Date | null
  }
}

interface EmployeeData {
  Age: number
  BusinessTravel: string
  DailyRate: number
  Department: string
  DistanceFromHome: number
  Education: number
  EducationField: string
  EnvironmentSatisfaction: number
  Gender: string
  HourlyRate: number
  JobInvolvement: number
  JobLevel: number
  JobRole: string
  JobSatisfaction: number
  MaritalStatus: string
  MonthlyIncome: number
  MonthlyRate: number
  NumCompaniesWorked: number
  OverTime: string
  PercentSalaryHike: number
  PerformanceRating: number
  RelationshipSatisfaction: number
  StockOptionLevel: number
  TotalWorkingYears: number
  TrainingTimesLastYear: number
  WorkLifeBalance: number
  YearsAtCompany: number
  YearsInCurrentRole: number
  YearsSinceLastPromotion: number
  YearsWithCurrManager: number
}

export default function SingleEmployeePrediction({ modelStatus }: SingleEmployeePredictionProps) {
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    Age: 30,
    BusinessTravel: "Travel_Rarely",
    DailyRate: 800,
    Department: "Research & Development",
    DistanceFromHome: 5,
    Education: 3,
    EducationField: "Life Sciences",
    EnvironmentSatisfaction: 3,
    Gender: "Male",
    HourlyRate: 65,
    JobInvolvement: 3,
    JobLevel: 2,
    JobRole: "Research Scientist",
    JobSatisfaction: 3,
    MaritalStatus: "Single",
    MonthlyIncome: 5000,
    MonthlyRate: 15000,
    NumCompaniesWorked: 2,
    OverTime: "No",
    PercentSalaryHike: 15,
    PerformanceRating: 3,
    RelationshipSatisfaction: 3,
    StockOptionLevel: 1,
    TotalWorkingYears: 8,
    TrainingTimesLastYear: 2,
    WorkLifeBalance: 3,
    YearsAtCompany: 3,
    YearsInCurrentRole: 2,
    YearsSinceLastPromotion: 1,
    YearsWithCurrManager: 2,
  })

  const [prediction, setPrediction] = useState<{
    attrition: string
    probability: number
    riskFactors: string[]
    confidence: number
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof EmployeeData, value: string | number) => {
    setEmployeeData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const makePrediction = async () => {
    setIsLoading(true)

    // Simulate API call to Python backend
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Advanced prediction logic based on multiple factors
    let riskScore = 0
    const riskFactors: string[] = []

    // Age factor
    if (employeeData.Age < 25) {
      riskScore += 0.15
      riskFactors.push("Young age (higher mobility)")
    } else if (employeeData.Age > 55) {
      riskScore += 0.1
      riskFactors.push("Near retirement age")
    }

    // Income factor
    if (employeeData.MonthlyIncome < 3000) {
      riskScore += 0.25
      riskFactors.push("Below market salary")
    }

    // Overtime factor
    if (employeeData.OverTime === "Yes") {
      riskScore += 0.2
      riskFactors.push("Regular overtime work")
    }

    // Job satisfaction factors
    if (employeeData.JobSatisfaction <= 2) {
      riskScore += 0.3
      riskFactors.push("Low job satisfaction")
    }

    if (employeeData.EnvironmentSatisfaction <= 2) {
      riskScore += 0.2
      riskFactors.push("Poor work environment satisfaction")
    }

    if (employeeData.WorkLifeBalance <= 2) {
      riskScore += 0.25
      riskFactors.push("Poor work-life balance")
    }

    // Career progression factors
    if (employeeData.YearsSinceLastPromotion > 5) {
      riskScore += 0.15
      riskFactors.push("Long time since last promotion")
    }

    if (employeeData.NumCompaniesWorked > 4) {
      riskScore += 0.1
      riskFactors.push("High job mobility history")
    }

    // Distance factor
    if (employeeData.DistanceFromHome > 20) {
      riskScore += 0.1
      riskFactors.push("Long commute distance")
    }

    // Stock options factor
    if (employeeData.StockOptionLevel === 0) {
      riskScore += 0.1
      riskFactors.push("No stock options")
    }

    // Training factor
    if (employeeData.TrainingTimesLastYear === 0) {
      riskScore += 0.1
      riskFactors.push("No recent training")
    }

    // Performance factor
    if (employeeData.PerformanceRating <= 2) {
      riskScore += 0.15
      riskFactors.push("Below average performance")
    }

    const probability = Math.min(riskScore, 0.95)
    const attrition = probability > 0.5 ? "Yes" : "No"
    const confidence = probability > 0.5 ? probability : 1 - probability

    setPrediction({
      attrition,
      probability,
      riskFactors,
      confidence,
    })

    setIsLoading(false)
  }

  if (!modelStatus.isLoaded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Single Employee Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please train the model first by uploading a dataset in the "Dataset Upload & Training" tab.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Employee Information
          </CardTitle>
          <CardDescription>Enter employee details to predict attrition likelihood</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={employeeData.Age}
                  onChange={(e) => handleInputChange("Age", Number.parseInt(e.target.value))}
                  min="18"
                  max="65"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={employeeData.Gender} onValueChange={(value) => handleInputChange("Gender", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select
                  value={employeeData.MaritalStatus}
                  onValueChange={(value) => handleInputChange("MaritalStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Job Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={employeeData.Department}
                  onValueChange={(value) => handleInputChange("Department", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Research & Development">Research & Development</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobRole">Job Role</Label>
                <Select value={employeeData.JobRole} onValueChange={(value) => handleInputChange("JobRole", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Research Scientist">Research Scientist</SelectItem>
                    <SelectItem value="Laboratory Technician">Laboratory Technician</SelectItem>
                    <SelectItem value="Sales Executive">Sales Executive</SelectItem>
                    <SelectItem value="Sales Representative">Sales Representative</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobLevel">Job Level (1-5)</Label>
                <Select
                  value={employeeData.JobLevel.toString()}
                  onValueChange={(value) => handleInputChange("JobLevel", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtime">Overtime</Label>
                <Select value={employeeData.OverTime} onValueChange={(value) => handleInputChange("OverTime", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Compensation & Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={employeeData.MonthlyIncome}
                  onChange={(e) => handleInputChange("MonthlyIncome", Number.parseInt(e.target.value))}
                  min="1000"
                  max="20000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockOptions">Stock Option Level (0-3)</Label>
                <Select
                  value={employeeData.StockOptionLevel.toString()}
                  onValueChange={(value) => handleInputChange("StockOptionLevel", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryHike">Percent Salary Hike (%)</Label>
                <Input
                  id="salaryHike"
                  type="number"
                  value={employeeData.PercentSalaryHike}
                  onChange={(e) => handleInputChange("PercentSalaryHike", Number.parseInt(e.target.value))}
                  min="0"
                  max="50"
                />
              </div>
            </div>
          </div>

          {/* Satisfaction Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Satisfaction & Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobSatisfaction">Job Satisfaction (1-4)</Label>
                <Select
                  value={employeeData.JobSatisfaction.toString()}
                  onValueChange={(value) => handleInputChange("JobSatisfaction", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Low</SelectItem>
                    <SelectItem value="2">2 - Medium</SelectItem>
                    <SelectItem value="3">3 - High</SelectItem>
                    <SelectItem value="4">4 - Very High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workLifeBalance">Work Life Balance (1-4)</Label>
                <Select
                  value={employeeData.WorkLifeBalance.toString()}
                  onValueChange={(value) => handleInputChange("WorkLifeBalance", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Bad</SelectItem>
                    <SelectItem value="2">2 - Good</SelectItem>
                    <SelectItem value="3">3 - Better</SelectItem>
                    <SelectItem value="4">4 - Best</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="environmentSatisfaction">Environment Satisfaction (1-4)</Label>
                <Select
                  value={employeeData.EnvironmentSatisfaction.toString()}
                  onValueChange={(value) => handleInputChange("EnvironmentSatisfaction", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Low</SelectItem>
                    <SelectItem value="2">2 - Medium</SelectItem>
                    <SelectItem value="3">3 - High</SelectItem>
                    <SelectItem value="4">4 - Very High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="performanceRating">Performance Rating (1-4)</Label>
                <Select
                  value={employeeData.PerformanceRating.toString()}
                  onValueChange={(value) => handleInputChange("PerformanceRating", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Low</SelectItem>
                    <SelectItem value="2">2 - Good</SelectItem>
                    <SelectItem value="3">3 - Excellent</SelectItem>
                    <SelectItem value="4">4 - Outstanding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Experience & Tenure</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalWorkingYears">Total Working Years</Label>
                <Input
                  id="totalWorkingYears"
                  type="number"
                  value={employeeData.TotalWorkingYears}
                  onChange={(e) => handleInputChange("TotalWorkingYears", Number.parseInt(e.target.value))}
                  min="0"
                  max="40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsAtCompany">Years at Company</Label>
                <Input
                  id="yearsAtCompany"
                  type="number"
                  value={employeeData.YearsAtCompany}
                  onChange={(e) => handleInputChange("YearsAtCompany", Number.parseInt(e.target.value))}
                  min="0"
                  max="40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsSincePromotion">Years Since Last Promotion</Label>
                <Input
                  id="yearsSincePromotion"
                  type="number"
                  value={employeeData.YearsSinceLastPromotion}
                  onChange={(e) => handleInputChange("YearsSinceLastPromotion", Number.parseInt(e.target.value))}
                  min="0"
                  max="20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingTimes">Training Times Last Year</Label>
                <Input
                  id="trainingTimes"
                  type="number"
                  value={employeeData.TrainingTimesLastYear}
                  onChange={(e) => handleInputChange("TrainingTimesLastYear", Number.parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>
            </div>
          </div>

          <Button onClick={makePrediction} disabled={isLoading} className="w-full" size="lg">
            <Calculator className="h-4 w-4 mr-2" />
            {isLoading ? "Analyzing..." : "Predict Attrition Risk"}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {prediction.attrition === "Yes" ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              Prediction Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Result */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  Attrition Risk:{" "}
                  <Badge
                    variant={prediction.attrition === "Yes" ? "destructive" : "default"}
                    className="text-xl px-4 py-2"
                  >
                    {prediction.attrition === "Yes" ? "HIGH" : "LOW"}
                  </Badge>
                </div>
                <div className="text-lg text-muted-foreground">
                  Probability: {(prediction.probability * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            {prediction.riskFactors.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Identified Risk Factors:</h4>
                <div className="grid gap-2">
                  {prediction.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Recommendations:</h4>
              <div className="grid gap-2">
                {prediction.attrition === "Yes" ? (
                  <>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">Schedule a retention conversation with this employee</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">Review compensation and career development opportunities</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">Address work-life balance and job satisfaction concerns</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Employee shows low attrition risk - continue current engagement</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Consider this employee for mentoring or leadership opportunities</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
