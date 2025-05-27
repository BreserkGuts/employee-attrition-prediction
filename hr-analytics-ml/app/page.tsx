"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, User, BarChart3 } from "lucide-react"
import DatasetUpload from "@/components/dataset-upload"
import SingleEmployeePrediction from "@/components/single-employee-prediction"
import AdvancedAnalytics from "@/components/advanced-analytics"
import ModelStatus from "@/components/model-status"

export default function HomePage() {
  const [modelStatus, setModelStatus] = useState({
    isLoaded: false,
    accuracy: 0,
    lastTrained: null as Date | null,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            HR Analytics Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Advanced Machine Learning Platform for Employee Attrition Prediction and HR Analytics
          </p>
        </div>

        {/* Model Status Dashboard */}
        <ModelStatus modelStatus={modelStatus} setModelStatus={setModelStatus} />

        {/* Main Content */}
        <Tabs defaultValue="dataset" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dataset" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Dataset Upload & Training
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Single Employee Prediction
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Advanced Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dataset" className="space-y-6">
            <DatasetUpload modelStatus={modelStatus} setModelStatus={setModelStatus} />
          </TabsContent>

          <TabsContent value="prediction" className="space-y-6">
            <SingleEmployeePrediction modelStatus={modelStatus} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
