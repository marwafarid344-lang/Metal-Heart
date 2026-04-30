# 🩺 Heart Disease Risk Prediction Assistant

![App Preview](https://github.com/AbdoAhmedAbdelmonem/Datasets/blob/main/image.png)

An interactive Next.js web application that helps users assess their heart disease risk through a friendly, step-by-step health survey. The app features a cute AI robot assistant that reacts to your answers in real-time (in Egyptian Arabic), making the experience engaging and supportive.

At the end of the survey, the user's responses are sent to a machine learning backend, which calculates and displays their heart disease risk percentage along with personalized advice.

## ✨ Features

- **Interactive Health Survey:** A smooth, step-by-step form built with React and Tailwind CSS.
- **Real-Time AI Assistant:** Uses OpenRouter API (GPT-4o-mini) to provide highly expressive, fun, and supportive reactions in Egyptian Arabic as you answer questions.
- **ML Risk Prediction:** Connects to a FastAPI machine learning backend (hosted on Railway) using an SVM model to predict the probability of heart disease.
- **Modern & Responsive UI:** Beautiful glassmorphism, rich aesthetics, micro-animations, and full Light/Dark mode support.
- **Lottie Animations:** Uses lightweight animations to enhance the user experience.

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **AI Integration:** OpenRouter API (OpenAI GPT-4o-mini model)
- **Machine Learning Backend:** FastAPI (Python), scikit-learn, Pandas (Hosted on Railway)
- **Animations:** dotLottie

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository (or download the source code):**
   ```bash
   git clone <your-repo-url>
   cd <your-project-directory>
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

### Environment Variables

The project requires some environment variables to connect to the external APIs. 

1. Duplicate the `.env.example` file and rename it to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and add your keys:
   ```env
   OPENROUTER_API_KEY="your_openrouter_api_key_here"
   PREDICTION_API_URL="your_prediction_api_url_here"
   ```
   *Note: `PREDICTION_API_URL` should point to your FastAPI machine learning endpoint.*

### Running the App

Start the development server:
```bash
npm run dev
# or yarn dev / pnpm dev
```

Open [Project](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure Highlights

- `app/page.tsx`: Main landing page integrating the hero section and the survey.
- `components/prediction-section.tsx`: The core health survey component, managing state, AI chats, and API submission.
- `app/api/chat/route.ts`: Serverless route that communicates with OpenRouter for the AI assistant's reactions.
- `app/api/predict/route.ts`: Serverless route that forwards the survey data to the ML backend.

## 📖 User Manual

Welcome to the Heart Disease Risk Prediction Assistant! This section provides a comprehensive guide on how to use the web application effectively.

### 1. Navigating the Home Page
When you first open the application, you'll be greeted by the **Home Page**.
- **Hero Section:** Read the brief introduction to understand the purpose of the application.
- **Start Button:** Click the prominent "ابدأ الفحص الآن" (Start Survey Now) button to seamlessly scroll down to the interactive health survey.
- **Theme Toggle:** Look for the sun/moon icon (usually at the top or bottom corner) to switch between Light Mode and Dark Mode according to your preference.

### 2. Taking the Health Survey
The core feature of this app is the step-by-step health assessment.
- **Answering Questions:** You will be presented with a series of 15 questions regarding your lifestyle, medical history, and physical metrics (e.g., BMI, smoking habits, physical activity).
- **Types of Inputs:**
  - *Dropdowns:* Select the most accurate option from the list (e.g., Yes/No, Age Groups).
  - *Numeric Inputs:* Type in your exact numbers (e.g., BMI, Days of poor physical health).
- **Navigation Controls:** 
  - Use the "التالي" (Next) button to proceed to the next question.
  - Use the "السابق" (Previous) button if you made a mistake and want to change a previous answer.
- **Progress Tracking:** A visual progress bar at the top of the survey shows you exactly how far along you are.

### 3. Interacting with the AI Assistant
As you fill out the survey, you are not alone!
- **Real-Time Reactions:** On the right side of the screen, you will see a friendly, animated 3D robot.
- **Egyptian Arabic Responses:** Every time you answer a question, the robot will provide a short, supportive, and fun reaction in Egyptian Arabic. Wait a few seconds after answering a question to see the robot's new message pop up in its chat bubble!

### 4. Understanding Your Results
Once you answer the final question, click "توقع النتيجة" (Predict Result). The app will analyze your data and show a results screen.
- **Risk Percentage:** You will see a large percentage indicating your probability of having or developing heart disease.
- **Visual Risk Indicators:** 
  - 🟢 **Green (Safe):** Indicates low risk.
  - 🔴 **Red (Warning):** Indicates higher risk.
- **Personalized Advice:** Below the percentage, the app provides a brief evaluation of your heart health based on your score.
- **Retake Survey:** Want to test different scenarios? Click the "نفحص تاني" (Test Again) button to reset the form and start over.

### 5. Privacy & Data Handling
- **Temporary Processing:** Your answers are only used momentarily to calculate your risk and to generate AI responses.
- **No Permanent Storage:** The application does not save your medical data to any database. Once you refresh the page or restart the survey, your previous inputs are cleared.

---

## 📝 License
This project is open source and available under the MIT License.
