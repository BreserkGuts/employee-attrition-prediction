"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Brain, CheckCircle, Download } from "lucide-react"

interface DatasetUploadProps {
  modelStatus: any
  setModelStatus: (status: any) => void
}

export default function DatasetUpload({ modelStatus, setModelStatus }: DatasetUploadProps) {
  const [isTraining, setIsTraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [trainingLog, setTrainingLog] = useState<string[]>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const addLog = (message: string) => {
    setTrainingLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      addLog(`File uploaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`)
    }
  }

  const loadSampleDataset = async () => {
    setIsTraining(true)
    setProgress(0)
    setTrainingLog([])

    try {
      addLog("Loading IBM HR Analytics dataset...")
      setProgress(20)

      // Simulate API call to backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addLog("Dataset loaded successfully - 1470 employee records")
      setProgress(40)

      addLog("Preprocessing data...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress(60)

      addLog("Training Random Forest model...")
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setProgress(80)

      addLog("Evaluating model performance...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress(100)

      addLog("Model training completed successfully!")
      addLog("Accuracy: 87.3% | Precision: 72.1% | Recall: 64.8%")

      setModelStatus({
        isLoaded: true,
        accuracy: 0.873,
        lastTrained: new Date(),
      })
    } catch (error) {
      addLog("Error during training: " + (error as Error).message)
    } finally {
      setIsTraining(false)
    }
  }

  const trainCustomModel = async () => {
    if (!uploadedFile) {
      addLog("Error: No file uploaded")
      return
    }

    setIsTraining(true)
    setProgress(0)
    setTrainingLog([])

    try {
      addLog(`Processing uploaded file: ${uploadedFile.name}`)
      setProgress(10)

      // Simulate file processing
      const formData = new FormData()
      formData.append("file", uploadedFile)

      addLog("Uploading file to backend...")
      setProgress(30)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      addLog("Validating dataset format...")
      setProgress(50)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("Training model on custom dataset...")
      setProgress(70)
      await new Promise((resolve) => setTimeout(resolve, 2500))

      addLog("Evaluating model performance...")
      setProgress(90)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setProgress(100)
      addLog("Custom model training completed!")
      addLog("Model ready for predictions")

      setModelStatus({
        isLoaded: true,
        accuracy: 0.851,
        lastTrained: new Date(),
      })
    } catch (error) {
      addLog("Error during training: " + (error as Error).message)
    } finally {
      setIsTraining(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Dataset Upload & Model Training
          </CardTitle>
          <CardDescription>
            Upload your HR dataset or use the sample IBM HR Analytics data to train the machine learning model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="dataset-file">Upload CSV Dataset</Label>
              <Input id="dataset-file" type="file" accept=".csv" onChange={handleFileUpload} disabled={isTraining} />
            </div>

            {uploadedFile && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  File ready: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button onClick={trainCustomModel} disabled={!uploadedFile || isTraining} className="flex-1">
                <Brain className="h-4 w-4 mr-2" />
                Train Custom Model
              </Button>

              <div className="flex items-center text-sm text-muted-foreground">or</div>

              <Button variant="outline" onClick={loadSampleDataset} disabled={isTraining} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Use Sample Dataset
              </Button>
            </div>
          </div>

          {/* Training Progress */}
          {isTraining && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Training Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Log */}
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
              <pre className="text-sm font-mono whitespace-pre-wrap">
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

      {/* Model Information */}
      {modelStatus.isLoaded && (
        <Card>
          <CardHeader>
            <CardTitle>Model Information</CardTitle>
            <CardDescription>Current model configuration and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Algorithm:</span> Random Forest
              </div>
              <div>
                <span className="font-medium">Features:</span> 30+ variables
              </div>
              <div>
                <span className="font-medium">Accuracy:</span> {(modelStatus.accuracy * 100).toFixed(1)}%
              </div>
              <div>
                <span className="font-medium">Status:</span> Ready for predictions
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
