import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactConcierge() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [emailInput, setEmailInput] = useState('');

  // The 3 Simple Questions
  const questions = [
    {
      id: 1,
      title: "What type of space are you designing?",
      options: ["Private Residence", "Commercial Estate", "Hospitality", "Other"]
    },
    {
      id: 2,
      title: "Which collections catch your eye?",
      options: ["Kitchenware", "Bathware", "Bespoke / Custom", "Just exploring"]
    },
    {
      id: 3,
      title: "Where should we send your digital dossier?",
      type: "input",
      placeholder: "Enter your email address..."
    }
  ];

  // The "Fake" database effect
  useEffect(() => {
    // When the array hits 3 responses, we trigger our fake API call
    if (responses.length === 3) {
      console.log("🚀 MOCK API CALL: Submitting to database...");
      console.log("User Responses:", responses);
      // You could trigger an actual fetch/axios request here later
    }
  }, [responses]);

  const handleOptionClick = (answer) => {
    setResponses((prev) => [...prev, { questionId: questions[step].id, answer }]);
    setStep((prev) => prev + 1);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    setResponses((prev) => [...prev, { questionId: questions[step].id, answer: emailInput }]);
    setStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] relative overflow-hidden rounded-lg md:rounded-lg bg-[#0A0A0A] border border-white/5 flex flex-col items-center justify-center p-6">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[40vw] h-[40vw] bg-[#C7A873] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl mx-auto z-10 relative">
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Progress Indicator */}
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873] mb-6">
                Step 0{step + 1} // 03
              </p>

              {/* Question Title */}
              <h2 className="font-serif text-[#F6F2EA] text-3xl md:text-5xl tracking-tight mb-12">
                {questions[step].title}
              </h2>

              {/* Options or Input */}
              {questions[step].options ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {questions[step].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className="w-full py-4 px-6 border border-white/10 rounded-md text-[#F6F2EA]/70 hover:text-[#C7A873] hover:border-[#C7A873] hover:bg-[#C7A873]/5 transition-all duration-300 text-sm tracking-wide"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="w-full relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={questions[step].placeholder}
                    className="w-full bg-transparent border-b border-white/20 text-[#F6F2EA] text-xl md:text-2xl pb-4 px-2 focus:outline-none focus:border-[#C7A873] transition-colors placeholder:text-white/20 text-center"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className="absolute right-0 top-1 text-[11px] uppercase tracking-[0.2em] text-[#C7A873] hover:text-white transition-colors"
                  >
                    Submit
                  </button>
                </form>
              )}
            </motion.div>
          ) : (
            /* Success / Thank You Screen */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full border border-[#C7A873] flex items-center justify-center mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C7A873" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="font-serif text-[#F6F2EA] text-4xl md:text-5xl tracking-tight mb-4">
                Thank You
              </h2>
              <p className="text-[#F6F2EA]/60 text-sm tracking-wide leading-relaxed max-w-md">
                Your dossier request has been received. Our concierge team will reach out to the provided email shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}