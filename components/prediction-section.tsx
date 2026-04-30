"use client"

import React, { useState, useEffect, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, Sparkle, RefreshCcw, ArrowRight } from "lucide-react"
import Script from "next/script"

type Option = { label: string; value: string | number }

type Feature = {
  id: string
  label: string
  type: "number" | "select"
  min?: number
  max?: number
  defaultValue: string | number
  options?: Option[]
}

const featureConfig: Feature[] = [
  { id: "high_blood_pressure", label: "هل تعاني من ارتفاع ضغط الدم؟ 🩸", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "لا", value: "لا"}, {label: "اه", value: "اه"}] },
  { id: "high_cholesterol", label: "هل تعاني من ارتفاع الكوليسترول؟ 🍔", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "لا", value: "لا"}, {label: "اه", value: "اه"}] },
  { id: "bmi", label: "ما هو مؤشر كتلة الجسم (BMI) الخاص بك؟ ⚖️", type: "number", min: 10, max: 100, defaultValue: "" },
  { id: "is_smoker", label: "هل دخنت أكثر من 100 سيجارة في حياتك؟ 🚬", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "لا", value: "لا"}, {label: "اه", value: "اه"}] },
  { id: "had_stroke", label: "هل سبق وأصبت بجلطة دماغية؟ 🧠", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "لا", value: "لا"}, {label: "اه", value: "اه"}] },
  { id: "diabetes_status", label: "هل تعاني من السكري؟ 🍬", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "لا", value: "لا"}, {label: "مرحلة ما قبل السكري", value: "مرحلة ما قبل السكري"}, {label: "اه", value: "اه"}] },
  { id: "physical_activity", label: "هل مارست نشاطاً بدنياً خلال الـ 30 يوماً الماضية؟ 🏃‍♂️", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "لا", value: "لا"}, {label: "اه", value: "اه"}] },
  { id: "no_doctor_due_to_cost", label: "هل امتنعت عن زيارة الطبيب بسبب التكلفة؟ 💸", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "لا", value: "لا"}, {label: "اه", value: "اه"}] },
  { id: "general_health", label: "كيف تقيم صحتك العامة؟ ✨", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "ممتاز", value: "ممتاز"}, {label: "جيد جداً", value: "جيد جداً"}, {label: "جيد", value: "جيد"}, {label: "مقبول", value: "مقبول"}, {label: "ضعيف", value: "ضعيف"}] },
  { id: "physical_health_days", label: "كم يوماً كانت صحتك الجسدية غير جيدة الشهر الماضي؟ 🤒", type: "number", min: 0, max: 30, defaultValue: "" },
  { id: "difficulty_walking", label: "هل تواجه صعوبة في المشي أو صعود الدرج؟ 🚶‍♂️", type: "select", defaultValue: "", options: [{label: "اختر الإجابة...", value: ""}, {label: "لا", value: "لا"}, {label: "اه", value: "اه"}] },
  { id: "gender", label: "النوع؟ 👦👧", type: "select", defaultValue: "", options: [{label: "اختر النوع...", value: ""}, {label: "أنثى", value: "أنثى"}, {label: "ذكر", value: "ذكر"}] },
  { id: "age_group", label: "ما هي فئتك العمرية؟ 🎂", type: "select", defaultValue: "", options: [
    {label: "اختر الفئة العمرية...", value: ""}, {label: "18-24", value: "18-24"}, {label: "25-29", value: "25-29"}, {label: "30-34", value: "30-34"}, {label: "35-39", value: "35-39"},
    {label: "40-44", value: "40-44"}, {label: "45-49", value: "45-49"}, {label: "50-54", value: "50-54"}, {label: "55-59", value: "55-59"},
    {label: "60-64", value: "60-64"}, {label: "65-69", value: "65-69"}, {label: "70-74", value: "70-74"}, {label: "75-79", value: "75-79"}, {label: "80 فأكثر", value: "80 فأكثر"}
  ] },
  { id: "education_level", label: "ما هو مستواك التعليمي؟ 🎓", type: "select", defaultValue: "", options: [
    {label: "اختر المستوى التعليمي...", value: ""}, {label: "لم أكمل الابتدائي", value: "لم أكمل الابتدائي"}, {label: "ابتدائي", value: "ابتدائي"}, {label: "إعدادي", value: "إعدادي"}, {label: "ثانوي", value: "ثانوي"}, {label: "جامعي", value: "جامعي"}, {label: "دراسات عليا", value: "دراسات عليا"}
  ] },
  { id: "income_level", label: "ما هو مستوى دخلك السنوي؟ 💰", type: "select", defaultValue: "", options: [
    {label: "اختر مستوى الدخل...", value: ""}, {label: "أقل من 10 آلاف", value: "أقل من 10 آلاف"}, {label: "10 - 15 ألف", value: "10 - 15 ألف"}, {label: "15 - 20 ألف", value: "15 - 20 ألف"}, {label: "20 - 25 ألف", value: "20 - 25 ألف"}, {label: "25 - 35 ألف", value: "25 - 35 ألف"}, {label: "35 - 50 ألف", value: "35 - 50 ألف"}, {label: "50 - 75 ألف", value: "50 - 75 ألف"}, {label: "أكثر من 75 ألف", value: "أكثر من 75 ألف"}
  ] }
]

// Memoized Lottie Components to prevent reloading when form states change
const AssistantLottie = memo(() => (
  <div dangerouslySetInnerHTML={{ __html: `<dotlottie-player src="https://lottie.host/85b4c973-fb16-4b9f-9dd6-9406c53e8dd7/TXbCITdQQ1.lottie" background="transparent" speed="1" style="width: 100%; height: 100%" loop autoplay></dotlottie-player>` }} className="w-[120%] h-[120%]" />
))
AssistantLottie.displayName = "AssistantLottie"

const ResultLottie = memo(() => (
  <div dangerouslySetInnerHTML={{ __html: `<dotlottie-player src="https://lottie.host/e85ed03f-08e1-4ebb-8960-33cc7d79a918/kFVW4Lt0UH.lottie" background="transparent" speed="1" style="width: 100%; height: 100%" loop autoplay></dotlottie-player>` }} className="w-[120%] h-[120%] -translate-y-4" />
))
ResultLottie.displayName = "ResultLottie"

export function PredictionSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string | number>>(
    featureConfig.reduce((acc, feat) => ({ ...acc, [feat.id]: feat.defaultValue }), {})
  )
  const [prediction, setPrediction] = useState<number | null>(null)
  const [predictionData, setPredictionData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [aiMessage, setAiMessage] = useState<string>("أهلاً بك! دعنا نلقي نظرة على صحة قلبك اليوم. 🩺❤️")
  const [isAiTyping, setIsAiTyping] = useState(false)
  const debounceTimerUrl = useRef<NodeJS.Timeout | null>(null)

  const handleInputChange = (id: string, value: string) => {
    const currentFeature = featureConfig.find(f => f.id === id)
    const processedValue = currentFeature?.type === "number" ? (value === "" ? 0 : Number(value)) : value
    
    setFormData((prev) => ({
      ...prev,
      [id]: processedValue,
    }))

    // Debounce AI reaction on value change directly
    if (debounceTimerUrl.current) clearTimeout(debounceTimerUrl.current)
    
    debounceTimerUrl.current = setTimeout(() => {
      if (currentFeature && processedValue !== currentFeature.defaultValue) {
        fetchAiReaction(currentFeature.label, String(processedValue))
      }
    }, 600)
  }

  const fetchAiReaction = async (question: string, answer: string) => {
    setIsAiTyping(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      })
      const data = await res.json()
      if (data.reaction) {
        setAiMessage(data.reaction)
      }
    } catch (e) {
      console.error(e)
      setAiMessage("شكراً لمشاركتك! استمر في الإجابة لنتائج أدق. 🩺✨")
    } finally {
      setIsAiTyping(false)
    }
  }

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep < featureConfig.length - 1) {
      setCurrentStep(prev => prev + 1)
      setAiMessage("شكراً! السؤال اللي بعده... 🧐")
    } else {
      await handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setAiMessage("تعديل الإجابة؟ فكرة كويسة! 🧐")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setPrediction(null)
    setPredictionData(null)
    setAiMessage("جاري تحليل بياناتك الصحية الآن... انتظر لحظة! ✨")
    setIsAiTyping(true)

    // Map string answers to numeric values for API
    const yesNoMap: Record<string, number> = { "لا": 0, "اه": 1 }
    const diabetesMap: Record<string, number> = { "لا": 0, "مرحلة ما قبل السكري": 1, "اه": 2 }
    const generalHealthMap: Record<string, number> = { "ممتاز": 1, "جيد جداً": 2, "جيد": 3, "مقبول": 4, "ضعيف": 5 }
    const genderMap: Record<string, number> = { "أنثى": 0, "ذكر": 1 }
    const ageMap: Record<string, number> = {
      "18-24": 1, "25-29": 2, "30-34": 3, "35-39": 4, "40-44": 5, "45-49": 6, 
      "50-54": 7, "55-59": 8, "60-64": 9, "65-69": 10, "70-74": 11, "75-79": 12, "80 فأكثر": 13
    }
    const educationMap: Record<string, number> = {
      "لم أكمل الابتدائي": 1, "ابتدائي": 2, "إعدادي": 3, "ثانوي": 4, "جامعي": 5, "دراسات عليا": 6
    }
    const incomeMap: Record<string, number> = {
      "أقل من 10 آلاف": 1, "10 - 15 ألف": 2, "15 - 20 ألف": 3, "20 - 25 ألف": 4, 
      "25 - 35 ألف": 5, "35 - 50 ألف": 6, "50 - 75 ألف": 7, "أكثر من 75 ألف": 8
    }

    const mapValue = (val: any, mapObj: Record<string, number>) => mapObj[val as string] ?? 0

    // Construct features dict for the API request
    const featuresDict = {
      high_blood_pressure: mapValue(formData.high_blood_pressure, yesNoMap),
      high_cholesterol: mapValue(formData.high_cholesterol, yesNoMap),
      bmi: Number(formData.bmi) || 0,
      is_smoker: mapValue(formData.is_smoker, yesNoMap),
      had_stroke: mapValue(formData.had_stroke, yesNoMap),
      diabetes_status: mapValue(formData.diabetes_status, diabetesMap),
      physical_activity: mapValue(formData.physical_activity, yesNoMap),
      no_doctor_due_to_cost: mapValue(formData.no_doctor_due_to_cost, yesNoMap),
      general_health: mapValue(formData.general_health, generalHealthMap),
      physical_health_days: Number(formData.physical_health_days) || 0,
      difficulty_walking: mapValue(formData.difficulty_walking, yesNoMap),
      gender: mapValue(formData.gender, genderMap),
      age_group: mapValue(formData.age_group, ageMap),
      education_level: mapValue(formData.education_level, educationMap),
      income_level: mapValue(formData.income_level, incomeMap)
    }

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: featuresDict }),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      
      let finalPrediction = 0;
      if (data.probabilities && data.probabilities.heart_disease !== undefined) {
        finalPrediction = Number(data.probabilities.heart_disease) / 100;
      } else if (typeof data.confidence === 'string' && data.confidence.includes('%')) {
        finalPrediction = parseFloat(data.confidence) / 100;
      } else {
        const rawPrediction = data.prediction ?? data.result ?? data.output ?? data;
        const parsedPrediction = Array.isArray(rawPrediction) ? rawPrediction[0] : rawPrediction;
        finalPrediction = Number(parsedPrediction);
      }
      
      setPrediction(finalPrediction)
      setPredictionData(data)
      setAiMessage("انتهينا! إليك نتيجة التوقيع لصحة قلبك. ❤️")
    } catch (err) {
      console.error(err)
      setPrediction(0.12) // Mock prediction on error
      setAiMessage("عذراً، حدث خطأ.. لكن خذ هذا كمثال! 🤖")
    } finally {
      setIsLoading(false)
      setIsAiTyping(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setPrediction(null)
    setPredictionData(null)
    setAiMessage("دعنا نبدأ من جديد لفحص آخر! 🎲")
  }

  const progressPercentage = ((currentStep) / featureConfig.length) * 100

  const getHeartHealthEvaluation = (score: number) => {
    // Prediction is usually a probability between 0 and 1
    if (score > 0.7) return "تنبيه! هناك احتمالية مرتفعة للإصابة. يرجى استشارة طبيب قريباً ⚠️🩺"
    if (score > 0.4) return "هناك بعض المخاطر الملحوظة. الاهتمام بنمط الحياة ضروري جداً 🏃‍♂️🥗"
    if (score > 0.2) return "مستوى المخاطر منخفض، لكن الوقاية دائماً خير من العلاج ✨"
    return "ما شاء الله! قلبك يبدو في حالة ممتازة، استمر على هذا النهج! 🌟❤️"
  }

  return (
    <section className="py-4 md:py-0.25 bg-transparent min-h-[500px] flex items-start w-full relative overflow-hidden" id="survey">
      <Script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module" strategy="lazyOnload" />
      <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10 w-3xl w-full">
        
        {/* AI Assistant - Standing behind Survey Box */}
        <div className="flex justify-end items-center relative z-10 pr-4 md:pr-12 w-full pt-8 md:pt-12 mb-[-15px] md:mb-[-25px]">
          <div className="flex items-center flex-row-reverse relative gap-4 md:gap-6">
            
            {/* Kid Image - Lottie Animation */}
            <div className="w-40 h-40 md:w-56 md:h-56 relative z-10 pointer-events-none drop-shadow-xl flex items-center justify-center">
              <AssistantLottie />
            </div>

            {/* Chat Bubble */}
            <div className="relative w-64 md:w-[340px] bg-transparent dark:bg-transparent p-4 md:p-6 rounded-[20px] rounded-bl-none border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] z-30">
              {isAiTyping ? (
                <div className="flex gap-2 items-center justify-end h-6 px-1">
                  <span className="w-3 h-3 bg-[#FDB927] border-2 border-black rounded-full animate-bounce"></span>
                  <span className="w-3 h-3 bg-[#FDB927] border-2 border-black rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-3 h-3 bg-[#FDB927] border-2 border-black rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              ) : (
                <p className="text-black dark:text-white font-bold text-lg md:text-xl leading-relaxed relative z-10 text-right">
                  {aiMessage}
                </p>
              )}
              <div className="absolute top-2 left-3 opacity-20 rotate-12">
                <Sparkle className="w-8 h-8 text-[#FF6B7A]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-6 md:p-10 rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] border-4 border-black dark:border-white backdrop-blur-xl relative z-20">
          
          {prediction === null ? (
            <form onSubmit={handleNext}>
              <div className="mb-10 text-right">
                <div className="flex justify-between items-center text-sm font-bold text-black dark:text-white mb-3 tracking-wider uppercase border-b-4 border-black dark:border-white pb-2" dir="rtl">
                  <span>سؤال {currentStep + 1} من {featureConfig.length}</span>
                  <span className="text-[#FF6B7A] bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-sm border-2 border-black dark:border-white">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-6 w-full bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-md overflow-hidden relative shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.1)]">
                  <div 
                    className="h-full bg-[#FDB927] transition-all duration-700 ease-out border-l-4 border-black dark:border-white"
                    style={{ width: `${progressPercentage}%` }} 
                  />
                </div>
              </div>

              <div key={currentStep} className="min-h-[160px] animate-in fade-in slide-in-from-left-8 duration-500 text-right" dir="rtl">
                <div className="space-y-8">
                  <label htmlFor={featureConfig[currentStep].id} className="text-2xl md:text-3xl font-extrabold leading-tight block text-gray-900 dark:text-white drop-shadow-sm">
                    {featureConfig[currentStep].label}
                  </label>
                  
                  {featureConfig[currentStep].type === "select" && featureConfig[currentStep].options ? (
                    <select
                      id={featureConfig[currentStep].id}
                      className="flex h-16 text-right w-full rounded-[16px] border-4 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 text-2xl font-bold focus-visible:outline-none focus-visible:border-[#2F81F7] focus-visible:bg-[#F0F7FF] dark:focus-visible:bg-zinc-800 transition-all cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] text-black dark:text-white"
                      value={formData[featureConfig[currentStep].id] !== undefined ? formData[featureConfig[currentStep].id] : ""}
                      onChange={(e) => handleInputChange(featureConfig[currentStep].id, e.target.value)}
                      required
                    >
                      {featureConfig[currentStep].options.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === "" && true} hidden={opt.value === "" && true}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={featureConfig[currentStep].id}
                      type={featureConfig[currentStep].type}
                      min={featureConfig[currentStep].min}
                      max={featureConfig[currentStep].max}
                      value={formData[featureConfig[currentStep].id] !== undefined ? formData[featureConfig[currentStep].id] : ""}
                      onChange={(e) => handleInputChange(featureConfig[currentStep].id, e.target.value)}
                      required
                      className="h-20 text-3xl text-center font-bold overflow-hidden rounded-[16px] border-4 border-black dark:border-white bg-white dark:bg-zinc-900 focus-visible:bg-[#F0F7FF] dark:focus-visible:bg-zinc-800 focus-visible:border-[#2F81F7] transition-all font-mono py-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] dark:text-white my-4 placeholder:opacity-50"
                      placeholder="أدخل الرقم هنا..."
                      style={{ fontSize: "2rem" }}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 mt-4 flex-row-reverse" dir="rtl">
                <Button 
                  type="button"
                  variant="ghost" 
                  size="lg" 
                  onClick={handleBack} 
                  disabled={currentStep === 0 || isLoading}
                  className={`rounded-[16px] px-6 font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors duration-300 ${currentStep === 0 ? 'opacity-0 select-none' : ''}`}
                >
                  السابق
                </Button>
                <Button 
                  type="submit"
                  size="lg" 
                  disabled={isLoading}
                  className="rounded-[16px] px-10 h-16 bg-[#2F81F7] hover:bg-[#2067d0] text-white font-bold border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-1 transform transition-transform inline-flex items-center text-xl shrink-0"
                >
                  {currentStep === featureConfig.length - 1 ? (
                    <>توقع النتيجة <Sparkles className="mr-3 w-6 h-6" /></>
                  ) : (
                    <>التالي <ArrowRight className="mr-3 w-6 h-6" /></>
                  )}
                </Button>
              </div>
            </form>
          ) : (
             <div className="text-center py-6 animate-in zoom-in-75 fade-in slide-in-from-bottom-5 text-right flex flex-col items-center">
               <div className="w-32 h-32 md:w-48 md:h-48 mb-2 relative z-10 pointer-events-none drop-shadow-xl flex items-center justify-center" style={{marginTop: "-134px"}}>
                 <ResultLottie />
               </div>
               <h3 className="text-2xl font-black tracking-tight text-black dark:text-white mb-3 uppercase bg-[#FDB927] px-4 py-2 border-4 border-black inline-block shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                 نتيجة الفحص
               </h3>
               
               {predictionData && predictionData.label && (
                 <div className={`text-2xl md:text-3xl font-black mb-3 px-6 py-3 border-4 border-black inline-block shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] ${predictionData.prediction === 1 ? 'bg-[#FF6B7A] text-white' : 'bg-green-500 text-white'}`}>
                   {predictionData.prediction === 1 ? '⚠️ اشتباه بإصابة (Heart Disease)' : '✅ سليم (No Heart Disease)'}
                 </div>
               )}

               <p className="text-lg font-bold text-gray-500 dark:text-gray-400 mt-2 mb-1">
                 نسبة احتمالية الإصابة
               </p>
               <div className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter text-black dark:text-white mb-4">
                 {(Number(prediction || 0) * 100).toFixed(2)}%
               </div>
               
               {predictionData && predictionData.probabilities && (
                  <div className="flex gap-4 md:gap-8 mb-6 text-sm md:text-base font-bold bg-white dark:bg-zinc-900 p-4 rounded-[20px] border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]" dir="rtl">
                     <div className="flex flex-col items-center">
                        <span className="text-gray-600 dark:text-gray-300 mb-1 text-base">احتمالية السلامة 🟢</span>
                        <span className="text-green-600 dark:text-green-400 text-xl md:text-2xl">{Number(predictionData.probabilities.no_heart_disease).toFixed(2)}%</span>
                     </div>
                     <div className="w-1 bg-black dark:bg-white opacity-20 rounded-full"></div>
                     <div className="flex flex-col items-center">
                        <span className="text-gray-600 dark:text-gray-300 mb-1 text-base">احتمالية الإصابة 🔴</span>
                        <span className="text-red-600 dark:text-[#FF6B7A] text-xl md:text-2xl">{Number(predictionData.probabilities.heart_disease).toFixed(2)}%</span>
                     </div>
                  </div>
               )}

               <p className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-200 mb-6 max-w-xl text-center leading-relaxed bg-gray-100 dark:bg-zinc-800 p-4 rounded-[16px] border-2 border-black dark:border-white border-dashed">
                 {getHeartHealthEvaluation(Number(prediction || 0))}
               </p>
               <Button 
                 onClick={handleReset} 
                 variant="outline" 
                 size="lg"
                 className="rounded-[16px] px-8 h-14 border-4 border-black dark:border-white hover:bg-[#FDB927] hover:text-black font-bold text-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300"
               >
                 <RefreshCcw className="w-6 h-6 ml-3 stroke-[3]" />
                 نفحص تاني  
               </Button>
             </div>
          )}
          
        </div>
      </div>
    </section>
  )
}
