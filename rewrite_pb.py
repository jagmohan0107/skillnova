import re

with open("src/pages/PracticeBattle.jsx", "r") as f:
    text = f.read()

text = text.replace("const [currentQuestion, setCurrentQuestion] = useState(0);", 
                    "const [activeQuestions, setActiveQuestions] = useState([]);\n  const [currentQuestion, setCurrentQuestion] = useState(0);")

text = re.sub(r"const questions = \[.*?\];", "", text, flags=re.DOTALL)

handle_ans_old = """  const handleAnswer = (index) => {
    if (userAnswers[currentQuestion] !== undefined) return; 

    setUserAnswers(prev => ({ ...prev, [currentQuestion]: index }));

    if (index === questions[currentQuestion].correct) {
      setScore(s => s + 100);
      setFeedback("correct");
      setTimeout(() => setFeedback(null), 1500);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };"""

handle_ans_new = """  const handleAnswer = (optString) => {
    if (userAnswers[currentQuestion] !== undefined) return; 

    setUserAnswers(prev => ({ ...prev, [currentQuestion]: optString }));

    if (optString === activeQuestions[currentQuestion]?.answer) {
      setScore(s => s + 100);
      setFeedback("correct");
      setTimeout(() => setFeedback(null), 1500);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };"""

text = text.replace(handle_ans_old, handle_ans_new)

finish_battle_old = """  const finishBattle = () => {
    const correctCount = Object.values(userAnswers).filter((ans, i) => ans === questions[i].correct).length;
    setAccuracy(Math.round((correctCount / questions.length) * 100));
    setView("results");
  };"""

finish_battle_new = """  const finishBattle = () => {
    const correctCount = Object.values(userAnswers).filter((ans, i) => ans === activeQuestions[i]?.answer).length;
    setAccuracy(Math.round((correctCount / (activeQuestions.length || 1)) * 100));
    setView("results");
  };"""
text = text.replace(finish_battle_old, finish_battle_new)

text = text.replace("questions.length", "activeQuestions.length")

initiate_old = """                         onClick={() => { 
                            setCountdown(3);
                            const timer = setInterval(() => {
                               setCountdown(prev => {
                                  if (prev === 1) {
                                     clearInterval(timer);
                                     setTimeout(() => {
                                        setCountdown(null);
                                        setTimeLeft(battleTime); 
                                        setView("battle");
                                     }, 1000);
                                     return "GO!";
                                  }
                                  return prev - 1;
                               });
                            }, 1000);
                         }}"""

initiate_new = """                         onClick={async () => {
                            setCountdown("PULSING AI ENGINE...");
                            setActiveQuestions([]);
                            setCurrentQuestion(0);
                            setUserAnswers({});
                            setScore(0);
                            
                            try {
                                const res = await fetch("http://127.0.0.1:8000/api/generate-quiz", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ subject, difficulty }),
                                });
                                const data = await res.json();
                                if (data?.questions?.length > 0) {
                                  setActiveQuestions(data.questions);
                                }
                            } catch (e) {
                                console.error("[AI ERROR] ", e);
                            }

                            setCountdown(3);
                            const timer = setInterval(() => {
                               setCountdown(prev => {
                                  if (prev === 1) {
                                     clearInterval(timer);
                                     setTimeout(() => {
                                        setCountdown(null);
                                        setTimeLeft(battleTime); 
                                        setView("battle");
                                     }, 1000);
                                     return "GO!";
                                  }
                                  if (typeof prev === "string") return 3;
                                  return prev - 1;
                               });
                            }, 1000);
                         }}"""
text = text.replace(initiate_old, initiate_new)

text = text.replace("{questions[currentQuestion].q}", "{activeQuestions[currentQuestion]?.question || \"Processing Mission...\"}")

options_old = """                           {questions[currentQuestion].options.map((opt, i) => (
                              <motion.button 
                                 key={i} onClick={() => handleAnswer(i)} disabled={userAnswers[currentQuestion] !== undefined}
                                 whileHover={{ scale: 1.02 }}
                                 className={`p-6 text-left border rounded-2xl transition-all flex items-center gap-6 group ${userAnswers[currentQuestion] === i ? (i === questions[currentQuestion].correct ? 'border-white bg-white/20 shadow-[0_0_20_rgba(255,255,255,0.3)] backdrop-blur-md' : 'border-red-500 bg-brand-primary/10') : 'border-white/5 bg-white/[0.02] hover:border-white/40'}`}
                              >
                                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/30 group-hover:text-white transition-all">{i+1}</div>
                                 <span className="text-[13px] font-black text-white/50 group-hover:text-white transition-all uppercase tracking-widest leading-relaxed">{opt}</span>
                              </motion.button>
                           ))}"""

options_new = """                           {activeQuestions[currentQuestion]?.options?.map((opt, i) => (
                              <motion.button 
                                 key={i} onClick={() => handleAnswer(opt)} disabled={userAnswers[currentQuestion] !== undefined}
                                 whileHover={{ scale: 1.02 }}
                                 className={`p-6 text-left border rounded-2xl transition-all flex items-center gap-6 group ${userAnswers[currentQuestion] === opt ? (opt === activeQuestions[currentQuestion]?.answer ? 'border-white bg-white/20 shadow-[0_0_20_rgba(255,255,255,0.3)] backdrop-blur-md' : 'border-red-500 bg-brand-primary/10') : 'border-white/5 bg-white/[0.02] hover:border-white/40'}`}
                              >
                                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/30 group-hover:text-white transition-all">{i+1}</div>
                                 <span className="text-[13px] font-black text-white/50 group-hover:text-white transition-all uppercase tracking-widest leading-relaxed">{opt}</span>
                              </motion.button>
                           ))}"""
text = text.replace(options_old, options_new)

text = text.replace("{questions[currentQuestion].explanation}", "{activeQuestions[currentQuestion]?.explanation || \"AI Explanation Unavailable.\"}")
text = text.replace("questions[currentQuestion]", "activeQuestions[currentQuestion]")

with open("src/pages/PracticeBattle.jsx", "w") as f:
    f.write(text)
print("done")
