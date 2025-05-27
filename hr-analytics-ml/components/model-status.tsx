"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, TrendingUp, Database } from "lucide-react"

interface ModelStatusProps {
  modelStatus: {
    isLoaded: boolean
    accuracy: number
    lastTrained: Date | null
  }
  setModelStatus: (status: any) => void
}

export default function ModelStatus({ modelStatus }: ModelStatusProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Model Status</CardTitle>
          <Brain className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Badge variant={modelStatus.isLoaded ? "default" : "secondary"} className="text-sm">
              {modelStatus.isLoaded ? "Ready" : "Not Loaded"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {modelStatus.isLoaded ? "Model ready for predictions" : "Upload dataset to train model"}
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {modelStatus.accuracy > 0 ? `${(modelStatus.accuracy * 100).toFixed(1)}%` : "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">Model prediction accuracy</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Trained</CardTitle>
          <Clock className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {modelStatus.lastTrained ? modelStatus.lastTrained.toLocaleDateString() : "Never"}
          </div>
          <p className="text-xs text-muted-foreground">Model training date</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-200 dark:border-orange-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dataset</CardTitle>
          <Database className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">IBM HR</div>
          <p className="text-xs text-muted-foreground">Employee attrition dataset</p>
        </CardContent>
      </Card>
    </div>
  )
}
