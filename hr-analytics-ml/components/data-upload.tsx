"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, CheckCircle } from "lucide-react"
import { useMLContext } from "@/contexts/ml-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DataUpload() {
  const { data, setData } = useMLContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)

    try {
      const text = await file.text()
      const lines = text.split("\n")
      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

      const parsedData = lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line) => {
          const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
          const row: any = {}
          headers.forEach((header, index) => {
            const value = values[index]
            // Convert numeric fields
            if (
              [
                "Age",
                "DailyRate",
                "DistanceFromHome",
                "Education",
                "EmployeeCount",
                "EmployeeNumber",
                "EnvironmentSatisfaction",
                "HourlyRate",
                "JobInvolvement",
                "JobLevel",
                "JobSatisfaction",
                "MonthlyIncome",
                "MonthlyRate",
                "NumCompaniesWorked",
                "PercentSalaryHike",
                "PerformanceRating",
                "RelationshipSatisfaction",
                "StandardHours",
                "StockOptionLevel",
                "TotalWorkingYears",
                "TrainingTimesLastYear",
                "WorkLifeBalance",
                "YearsAtCompany",
                "YearsInCurrentRole",
                "YearsSinceLastPromotion",
                "YearsWithCurrManager",
              ].includes(header)
            ) {
              row[header] = Number.parseFloat(value) || 0
            } else {
              row[header] = value
            }
          })
          return row
        })

      setData(parsedData)
    } catch (err) {
      setError("Error parsing CSV file. Please ensure it's a valid CSV format.")
    } finally {
      setIsLoading(false)
    }
  }

  const loadSampleData = () => {
    setIsLoading(true)
    // Simulate loading sample IBM HR data
    setTimeout(() => {
      const sampleData = [
        {
          Age: 41,
          BusinessTravel: "Travel_Rarely",
          DailyRate: 1102,
          Department: "Sales",
          DistanceFromHome: 1,
          Education: 2,
          EducationField: "Life Sciences",
          EmployeeCount: 1,
          EmployeeNumber: 1,
          EnvironmentSatisfaction: 2,
          Gender: "Female",
          HourlyRate: 94,
          JobInvolvement: 3,
          JobLevel: 2,
          JobRole: "Sales Executive",
          JobSatisfaction: 4,
          MaritalStatus: "Single",
          MonthlyIncome: 5993,
          MonthlyRate: 19479,
          NumCompaniesWorked: 8,
          Over18: "Y",
          OverTime: "Yes",
          PercentSalaryHike: 11,
          PerformanceRating: 3,
          RelationshipSatisfaction: 1,
          StandardHours: 80,
          StockOptionLevel: 0,
          TotalWorkingYears: 8,
          TrainingTimesLastYear: 0,
          WorkLifeBalance: 1,
          YearsAtCompany: 6,
          YearsInCurrentRole: 4,
          YearsSinceLastPromotion: 0,
          YearsWithCurrManager: 5,
          Attrition: "Yes",
        },
        {
          Age: 49,
          BusinessTravel: "Travel_Frequently",
          DailyRate: 279,
          Department: "Research & Development",
          DistanceFromHome: 8,
          Education: 1,
          EducationField: "Life Sciences",
          EmployeeCount: 1,
          EmployeeNumber: 2,
          EnvironmentSatisfaction: 3,
          Gender: "Male",
          HourlyRate: 61,
          JobInvolvement: 2,
          JobLevel: 2,
          JobRole: "Research Scientist",
          JobSatisfaction: 2,
          MaritalStatus: "Married",
          MonthlyIncome: 5130,
          MonthlyRate: 24907,
          NumCompaniesWorked: 1,
          Over18: "Y",
          OverTime: "No",
          PercentSalaryHike: 23,
          PerformanceRating: 4,
          RelationshipSatisfaction: 4,
          StandardHours: 80,
          StockOptionLevel: 1,
          TotalWorkingYears: 10,
          TrainingTimesLastYear: 3,
          WorkLifeBalance: 3,
          YearsAtCompany: 10,
          YearsInCurrentRole: 7,
          YearsSinceLastPromotion: 1,
          YearsWithCurrManager: 7,
          Attrition: "No",
        },
      ]

      // Generate more sample data
      const expandedData = []
      for (let i = 0; i < 100; i++) {
        const baseRecord = sampleData[i % 2]
        expandedData.push({
          ...baseRecord,
          EmployeeNumber: i + 1,
          Age: Math.floor(Math.random() * 40) + 20,
          MonthlyIncome: Math.floor(Math.random() * 10000) + 2000,
          YearsAtCompany: Math.floor(Math.random() * 20),
          Attrition: Math.random() > 0.8 ? "Yes" : "No",
        })
      }

      setData(expandedData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Data Upload
          </CardTitle>
          <CardDescription>Upload your IBM HR Analytics CSV file or use sample data to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="csv-file">CSV File</Label>
            <Input id="csv-file" type="file" accept=".csv" onChange={handleFileUpload} disabled={isLoading} />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">or</span>
            <Button variant="outline" onClick={loadSampleData} disabled={isLoading}>
              {isLoading ? "Loading..." : "Load Sample Data"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Data Loaded Successfully
            </CardTitle>
            <CardDescription>{data.length} employee records loaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Records:</span> {data.length}
              </div>
              <div>
                <span className="font-medium">Attrition Rate:</span>{" "}
                {((data.filter((d) => d.Attrition === "Yes").length / data.length) * 100).toFixed(1)}%
              </div>
              <div>
                <span className="font-medium">Avg Age:</span>{" "}
                {(data.reduce((sum, d) => sum + d.Age, 0) / data.length).toFixed(1)}
              </div>
              <div>
                <span className="font-medium">Departments:</span> {new Set(data.map((d) => d.Department)).size}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
