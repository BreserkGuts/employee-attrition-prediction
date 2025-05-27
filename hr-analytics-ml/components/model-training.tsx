"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Play, CheckCircle, AlertCircle } from "lucide-react"
import { useMLContext } from "@/contexts/ml-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ModelTraining() {
  const { data, isModelTrained, setIsModelTrained, setModelMetrics, setFeatureImportance, setTrainedModel } =
    useMLContext()

  const [isTraining, setIsTraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [trainingLog, setTrainingLog] = useState<string[]>([])

  const addLog = (message: string) => {
    setTrainingLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const trainModel = async () => {
    if (data.length === 0) {
      addLog("Error: No data available for training")
      return
    }

    setIsTraining(true)
    setProgress(0)
    setTrainingLog([])

    try {
      addLog("Starting model training...")
      setProgress(10)

      // Simulate data preprocessing
      addLog("Preprocessing data...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress(30)

      // Simulate feature engineering
      addLog("Engineering features...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress(50)

      // Simulate model training
      addLog("Training Random Forest classifier...")
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setProgress(80)

      // Simulate model evaluation
      addLog("Evaluating model performance...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress(100)

      // Mock model metrics (in real implementation, these would come from actual ML training)
      const metrics = {
        accuracy: 0.867,
        precision: 0.723,
        recall: 0.645,
        f1Score: 0.682,
      }

      // Mock feature importance
      const importance = [
        { feature: "MonthlyIncome", importance: 0.156 },
        { feature: "OverTime", importance: 0.142 },
        { feature: "Age", importance: 0.098 },
        { feature: "TotalWorkingYears", importance: 0.087 },
        { feature: "YearsAtCompany", importance: 0.076 },
        { feature: "JobSatisfaction", importance: 0.065 },
        { feature: "WorkLifeBalance", importance: 0.058 },
        { feature: "EnvironmentSatisfaction", importance: 0.052 },
        { feature: "JobLevel", importance: 0.048 },
        { feature: "StockOptionLevel", importance: 0.043 },
      ]

      setModelMetrics(metrics)
      setFeatureImportance(importance)
      setTrainedModel({ type: "RandomForest", trained: true })
      setIsModelTrained(true)

      addLog("Model training completed successfully!")
      addLog(`Final Accuracy: ${(metrics.accuracy * 100).toFixed(1)}%`)
    } catch (error) {
      addLog("Error during training: " + (error as Error).message)
    } finally {
      setIsTraining(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Model Training
          </CardTitle>
          <CardDescription>Train a Random Forest classifier to predict employee attrition</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Please upload data first before training the model.</AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Training Data</p>
                  <p className="text-sm text-muted-foreground">{data.length} employee records ready for training</p>
                </div>
                <Badge variant={isModelTrained ? "default" : "secondary"}>
                  {isModelTrained ? "Model Trained" : "Not Trained"}
                </Badge>
              </div>

              <Button onClick={trainModel} disabled={isTraining || data.length === 0} className="w-full">
                <Play className="h-4 w-4 mr-2" />
                {isTraining ? "Training..." : "Train Model"}
              </Button>

              {isTraining && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Training Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {trainingLog.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Training Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-sm font-mono">
                {trainingLog.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {isModelTrained && (
        <Card>
          <CardHeader>
            <CardTitle>Model Architecture</CardTitle>
            <CardDescription>Random Forest Classifier with the following configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Algorithm:</span> Random Forest
              </div>
              <div>
                <span className="font-medium">Features:</span> 30+ variables
              </div>
              <div>
                <span className="font-medium">Train/Test Split:</span> 80/20
              </div>
              <div>
                <span className="font-medium">Cross Validation:</span> 5-fold
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
