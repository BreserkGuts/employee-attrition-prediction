"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, User, AlertTriangle, CheckCircle } from "lucide-react"
import { useMLContext } from "@/contexts/ml-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PredictionInput {
  Age: number
  MonthlyIncome: number
  TotalWorkingYears: number
  YearsAtCompany: number
  JobSatisfaction: number
  WorkLifeBalance: number
  OverTime: string
  JobLevel: number
  EnvironmentSatisfaction: number
  StockOptionLevel: number
}

export default function Predictions() {
  const { isModelTrained } = useMLContext()
  const [prediction, setPrediction] = useState<{ result: string; probability: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<PredictionInput>({
    Age: 30,
    MonthlyIncome: 5000,
    TotalWorkingYears: 5,
    YearsAtCompany: 3,
    JobSatisfaction: 3,
    WorkLifeBalance: 3,
    OverTime: "No",
    JobLevel: 2,
    EnvironmentSatisfaction: 3,
    StockOptionLevel: 1,
  })

  const handleInputChange = (field: keyof PredictionInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const makePrediction = async () => {
    setIsLoading(true)

    // Simulate prediction calculation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock prediction logic (in real implementation, this would use the trained model)
    let riskScore = 0

    // Age factor
    if (formData.Age < 25 || formData.Age > 55) riskScore += 0.2

    // Income factor
    if (formData.MonthlyIncome < 3000) riskScore += 0.3

    // Overtime factor
    if (formData.OverTime === "Yes") riskScore += 0.25

    // Job satisfaction factor
    if (formData.JobSatisfaction <= 2) riskScore += 0.3

    // Work-life balance factor
    if (formData.WorkLifeBalance <= 2) riskScore += 0.25

    // Years at company factor
    if (formData.YearsAtCompany < 2) riskScore += 0.2

    // Environment satisfaction factor
    if (formData.EnvironmentSatisfaction <= 2) riskScore += 0.2

    // Stock options factor
    if (formData.StockOptionLevel === 0) riskScore += 0.15

    const probability = Math.min(riskScore, 0.95)
    const result = probability > 0.5 ? "Yes" : "No"

    setPrediction({ result, probability })
    setIsLoading(false)
  }

  if (!isModelTrained) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Employee Attrition Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Please train the model first before making predictions.</AlertDescription>
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
            <Calculator className="h-5 w-5" />
            Employee Attrition Prediction
          </CardTitle>
          <CardDescription>Enter employee details to predict likelihood of attrition</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.Age}
                onChange={(e) => handleInputChange("Age", Number.parseInt(e.target.value))}
                min="18"
                max="65"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income ($)</Label>
              <Input
                id="income"
                type="number"
                value={formData.MonthlyIncome}
                onChange={(e) => handleInputChange("MonthlyIncome", Number.parseInt(e.target.value))}
                min="1000"
                max="20000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalYears">Total Working Years</Label>
              <Input
                id="totalYears"
                type="number"
                value={formData.TotalWorkingYears}
                onChange={(e) => handleInputChange("TotalWorkingYears", Number.parseInt(e.target.value))}
                min="0"
                max="40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyYears">Years at Company</Label>
              <Input
                id="companyYears"
                type="number"
                value={formData.YearsAtCompany}
                onChange={(e) => handleInputChange("YearsAtCompany", Number.parseInt(e.target.value))}
                min="0"
                max="40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobSatisfaction">Job Satisfaction (1-4)</Label>
              <Select
                value={formData.JobSatisfaction.toString()}
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
                value={formData.WorkLifeBalance.toString()}
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
              <Label htmlFor="overtime">Overtime</Label>
              <Select value={formData.OverTime} onValueChange={(value) => handleInputChange("OverTime", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobLevel">Job Level (1-5)</Label>
              <Select
                value={formData.JobLevel.toString()}
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
          </div>

          <Button onClick={makePrediction} disabled={isLoading} className="w-full">
            <User className="h-4 w-4 mr-2" />
            {isLoading ? "Predicting..." : "Predict Attrition"}
          </Button>
        </CardContent>
      </Card>

      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {prediction.result === "Yes" ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              Prediction Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold">
                Attrition Likelihood:{" "}
                <Badge variant={prediction.result === "Yes" ? "destructive" : "default"} className="text-lg px-3 py-1">
                  {prediction.result}
                </Badge>
              </div>
              <div className="text-lg text-muted-foreground">
                Probability: {(prediction.probability * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h4 className="font-medium mb-2">Risk Factors:</h4>
              <ul className="text-sm space-y-1">
                {formData.OverTime === "Yes" && <li>• Works overtime regularly</li>}
                {formData.JobSatisfaction <= 2 && <li>• Low job satisfaction</li>}
                {formData.WorkLifeBalance <= 2 && <li>• Poor work-life balance</li>}
                {formData.MonthlyIncome < 3000 && <li>• Below average income</li>}
                {formData.YearsAtCompany < 2 && <li>• New to the company</li>}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
