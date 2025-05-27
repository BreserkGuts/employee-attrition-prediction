Employee Attrition Prediction
This project aims to predict employee attrition using machine learning techniques. By analyzing HR data, we can identify patterns and factors that contribute to employee turnover, enabling organizations to take proactive measures to retain valuable talent.
f0nzie.github.io

📂 Project Structure
data sets/: Contains the dataset(s) used for training and evaluation.

hr-analytics-ml/: Includes the machine learning models, training scripts, and evaluation metrics.

README.md: Provides an overview of the project, setup instructions, and usage guidelines.
arXiv
+6
GitHub
+6
f0nzie.github.io
+6

📊 Dataset
The dataset used in this project is sourced from the IBM HR Analytics Employee Attrition & Performance dataset. It encompasses various features related to employee demographics, job roles, satisfaction levels, and more. Key features include:
GitHub

Age

Attrition (Target Variable)

BusinessTravel

Department

DistanceFromHome

Education

EducationField

EmployeeNumber

EnvironmentSatisfaction

Gender

JobRole

JobSatisfaction

MaritalStatus

MonthlyIncome

NumCompaniesWorked

OverTime

PercentSalaryHike

PerformanceRating

StockOptionLevel

TotalWorkingYears

TrainingTimesLastYear

WorkLifeBalance

YearsAtCompany

YearsInCurrentRole

YearsSinceLastPromotion

YearsWithCurrManager

Note: Ensure that the dataset is placed in the data sets/ directory before running the scripts.

🛠️ Installation & Setup
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/BreserkGuts/employee-attrition-prediction.git
cd employee-attrition-prediction
Create a Virtual Environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Dependencies:

bash
Copy
Edit
pip install -r requirements.txt
🚀 Usage
Data Preprocessing:

Navigate to the hr-analytics-ml/ directory and run the preprocessing script:

bash
Copy
Edit
python preprocess.py
Model Training:

Train the machine learning model using the prepared data:

bash
Copy
Edit
python train_model.py
Model Evaluation:

Evaluate the performance of the trained model:

bash
Copy
Edit
python evaluate_model.py
Prediction:

Use the trained model to make predictions on new data:

bash
Copy
Edit
python predict.py --input new_employee_data.csv
📈 Model Performance
The model's performance is evaluated using the following metrics:
GitHub
+1
Kaggle
+1

Accuracy

Precision

Recall

F1-Score

ROC-AUC Score

Detailed evaluation reports and confusion matrices are saved in the hr-analytics-ml/reports/ directory.
GitHub

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or want to add new features, feel free to fork the repository and submit a pull request.

📄 License
This project is licensed under the MIT License.
GitHub

📬 Contact
For any questions or feedback, please open an issue in the repository or contact the maintainer directly.

