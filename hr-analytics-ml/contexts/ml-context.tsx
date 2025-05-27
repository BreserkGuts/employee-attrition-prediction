"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Employee {
  Age: number
  BusinessTravel: string
  DailyRate: number
  Department: string
  DistanceFromHome: number
  Education: number
  EducationField: string
  EmployeeCount: number
  EmployeeNumber: number
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
  Over18: string
  OverTime: string
  PercentSalaryHike: number
  PerformanceRating: number
  RelationshipSatisfaction: number
  StandardHours: number
  StockOptionLevel: number
  TotalWorkingYears: number
  TrainingTimesLastYear: number
  WorkLifeBalance: number
  YearsAtCompany: number
  YearsInCurrentRole: number
  YearsSinceLastPromotion: number
  YearsWithCurrManager: number
  Attrition: string
}

interface ModelMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
}

interface FeatureImportance {
  feature: string
  importance: number
}

interface MLContextType {
  data: Employee[]
  setData: (data: Employee[]) => void
  isModelTrained: boolean
  setIsModelTrained: (trained: boolean) => void
  modelMetrics: ModelMetrics | null
  setModelMetrics: (metrics: ModelMetrics) => void
  featureImportance: FeatureImportance[]
  setFeatureImportance: (importance: FeatureImportance[]) => void
  trainedModel: any
  setTrainedModel: (model: any) => void
}

const MLContext = createContext<MLContextType | undefined>(undefined)

export function MLProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Employee[]>([])
  const [isModelTrained, setIsModelTrained] = useState(false)
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics | null>(null)
  const [featureImportance, setFeatureImportance] = useState<FeatureImportance[]>([])
  const [trainedModel, setTrainedModel] = useState<any>(null)

  return (
    <MLContext.Provider
      value={{
        data,
        setData,
        isModelTrained,
        setIsModelTrained,
        modelMetrics,
        setModelMetrics,
        featureImportance,
        setFeatureImportance,
        trainedModel,
        setTrainedModel,
      }}
    >
      {children}
    </MLContext.Provider>
  )
}

export function useMLContext() {
  const context = useContext(MLContext)
  if (context === undefined) {
    throw new Error("useMLContext must be used within an MLProvider")
  }
  return context
}
