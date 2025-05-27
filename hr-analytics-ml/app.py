from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import io
import requests
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Global variables to store model and data
model = None
feature_columns = None
label_encoders = {}
model_metrics = {}

class HRAnalyticsModel:
    def __init__(self):
        self.model = None
        self.feature_columns = None
        self.label_encoders = {}
        self.is_trained = False
        
    def preprocess_data(self, data):
        """Preprocess the HR data for training"""
        # Create a copy to avoid modifying original data
        df = data.copy()
        
        # Handle missing values
        df = df.fillna(df.median(numeric_only=True))
        df = df.fillna(df.mode().iloc[0])
        
        # Create target variable
        y = (df['Attrition'] == 'Yes').astype(int)
        
        # Remove non-predictive columns
        columns_to_drop = ['Attrition', 'EmployeeNumber', 'Over18', 'EmployeeCount', 'StandardHours']
        X = df.drop(columns=[col for col in columns_to_drop if col in df.columns])
        
        # Encode categorical variables
        categorical_columns = X.select_dtypes(include=['object']).columns
        
        for col in categorical_columns:
            if col not in self.label_encoders:
                self.label_encoders[col] = LabelEncoder()
                X[col] = self.label_encoders[col].fit_transform(X[col].astype(str))
            else:
                # Handle unseen categories
                X[col] = X[col].astype(str)
                known_categories = set(self.label_encoders[col].classes_)
                X[col] = X[col].apply(lambda x: x if x in known_categories else 'Unknown')
                
                # Add 'Unknown' to encoder if not present
                if 'Unknown' not in known_categories:
                    self.label_encoders[col].classes_ = np.append(self.label_encoders[col].classes_, 'Unknown')
                
                X[col] = self.label_encoders[col].transform(X[col])
        
        return X, y
    
    def train_model(self, data):
        """Train the Random Forest model"""
        try:
            X, y = self.preprocess_data(data)
            self.feature_columns = X.columns.tolist()
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42, stratify=y
            )
            
            # Train Random Forest
            self.model = RandomForestClassifier(
                n_estimators=100,
                max_depth=10,
                min_samples_split=5,
                min_samples_leaf=2,
                random_state=42
            )
            
            self.model.fit(X_train, y_train)
            
            # Evaluate model
            y_pred = self.model.predict(X_test)
            accuracy = accuracy_score(y_test, y_pred)
            
            # Calculate feature importance
            feature_importance = pd.DataFrame({
                'feature': self.feature_columns,
                'importance': self.model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            self.is_trained = True
            
            return {
                'success': True,
                'accuracy': accuracy,
                'feature_importance': feature_importance.to_dict('records'),
                'classification_report': classification_report(y_test, y_pred, output_dict=True)
            }
            
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def predict_single(self, employee_data):
        """Predict attrition for a single employee"""
        if not self.is_trained:
            return {'success': False, 'error': 'Model not trained'}
        
        try:
            # Convert to DataFrame
            df = pd.DataFrame([employee_data])
            
            # Ensure all required columns are present
            for col in self.feature_columns:
                if col not in df.columns:
                    df[col] = 0  # Default value for missing columns
            
            # Encode categorical variables
            for col, encoder in self.label_encoders.items():
                if col in df.columns:
                    df[col] = df[col].astype(str)
                    # Handle unseen categories
                    known_categories = set(encoder.classes_)
                    df[col] = df[col].apply(lambda x: x if x in known_categories else 'Unknown')
                    df[col] = encoder.transform(df[col])
            
            # Select only the features used in training
            X = df[self.feature_columns]
            
            # Make prediction
            prediction = self.model.predict(X)[0]
            probability = self.model.predict_proba(X)[0]
            
            return {
                'success': True,
                'prediction': int(prediction),
                'probability': float(probability[1]),  # Probability of attrition
                'confidence': float(max(probability))
            }
            
        except Exception as e:
            return {'success': False, 'error': str(e)}

# Initialize the model
hr_model = HRAnalyticsModel()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_trained': hr_model.is_trained,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/load-sample-data', methods=['POST'])
def load_sample_data():
    """Load and train model with IBM HR sample data"""
    try:
        # Load the sample dataset
        url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WA_Fn-UseC_-HR-Employee-Attrition-TdyRlqnbsSLgjaXz5CJSOQqzFnaRFr.csv"
        response = requests.get(url)
        data = pd.read_csv(io.StringIO(response.text))
        
        # Train the model
        result = hr_model.train_model(data)
        
        if result['success']:
            return jsonify({
                'success': True,
                'message': 'Model trained successfully with sample data',
                'data_shape': data.shape,
                'accuracy': result['accuracy'],
                'feature_importance': result['feature_importance'][:10]  # Top 10 features
            })
        else:
            return jsonify(result), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/upload-dataset', methods=['POST'])
def upload_dataset():
    """Upload and train model with custom dataset"""
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No file selected'}), 400
        
        # Read the CSV file
        data = pd.read_csv(file)
        
        # Validate required columns
        required_columns = ['Attrition']
        missing_columns = [col for col in required_columns if col not in data.columns]
        if missing_columns:
            return jsonify({
                'success': False, 
                'error': f'Missing required columns: {missing_columns}'
            }), 400
        
        # Train the model
        result = hr_model.train_model(data)
        
        if result['success']:
            return jsonify({
                'success': True,
                'message': 'Model trained successfully with uploaded data',
                'data_shape': data.shape,
                'accuracy': result['accuracy'],
                'feature_importance': result['feature_importance'][:10]
            })
        else:
            return jsonify(result), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict_attrition():
    """Predict attrition for a single employee"""
    try:
        employee_data = request.json
        
        if not employee_data:
            return jsonify({'success': False, 'error': 'No employee data provided'}), 400
        
        result = hr_model.predict_single(employee_data)
        
        if result['success']:
            return jsonify({
                'success': True,
                'prediction': 'Yes' if result['prediction'] == 1 else 'No',
                'probability': result['probability'],
                'confidence': result['confidence']
            })
        else:
            return jsonify(result), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/model-status', methods=['GET'])
def model_status():
    """Get current model status and metrics"""
    return jsonify({
        'is_trained': hr_model.is_trained,
        'feature_count': len(hr_model.feature_columns) if hr_model.feature_columns else 0,
        'model_type': 'Random Forest Classifier'
    })

@app.route('/api/feature-importance', methods=['GET'])
def get_feature_importance():
    """Get feature importance from trained model"""
    if not hr_model.is_trained:
        return jsonify({'success': False, 'error': 'Model not trained'}), 400
    
    try:
        feature_importance = pd.DataFrame({
            'feature': hr_model.feature_columns,
            'importance': hr_model.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        return jsonify({
            'success': True,
            'feature_importance': feature_importance.to_dict('records')
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get advanced analytics and insights"""
    try:
        # This would typically query a database or analyze current data
        # For demo purposes, returning sample analytics
        analytics = {
            'total_employees': 1470,
            'attrition_rate': 16.1,
            'high_risk_employees': 127,
            'medium_risk_employees': 234,
            'low_risk_employees': 1109,
            'departments': {
                'Sales': {'total': 446, 'attrition_rate': 20.6},
                'R&D': {'total': 961, 'attrition_rate': 13.8},
                'HR': {'total': 63, 'attrition_rate': 19.0}
            },
            'top_risk_factors': [
                'Low monthly income',
                'Overtime work',
                'Poor job satisfaction',
                'Long commute distance',
                'No stock options'
            ]
        }
        
        return jsonify({
            'success': True,
            'analytics': analytics,
            'generated_at': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting HR Analytics Backend Server...")
    print("Available endpoints:")
    print("- GET  /api/health - Health check")
    print("- POST /api/load-sample-data - Load sample dataset")
    print("- POST /api/upload-dataset - Upload custom dataset")
    print("- POST /api/predict - Predict single employee attrition")
    print("- GET  /api/model-status - Get model status")
    print("- GET  /api/feature-importance - Get feature importance")
    print("- GET  /api/analytics - Get advanced analytics")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
