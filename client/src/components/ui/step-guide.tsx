"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Type, Sparkles, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepGuideProps {
  onClose: () => void;
  isOpen: boolean;
}

const steps = [
  {
    icon: Upload,
    title: "Step 1: Upload Image",
    description: "Drag and drop or click to upload your image for editing",
    detail: "Supports JPG, PNG, WebP formats, max 10MB",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Type,
    title: "Step 2: Describe Changes",
    description: "Use natural language to describe the effect you want",
    detail: "Example: 'change background to beach', 'add rainbow effects'",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Sparkles,
    title: "Step 3: Generate Results",
    description: "Click generate and AI will create stunning effects for you",
    detail: "Usually takes 10-30 seconds, please be patient",
    color: "from-yellow-400 to-orange-500"
  }
];

export const StepGuide: React.FC<StepGuideProps> = ({ onClose, isOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold gradient-text">Getting Started Guide</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-testid="button-close-guide"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Progress indicators */}
            <div className="flex justify-center space-x-2 mb-8">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  animate={{ scale: index === currentStep ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>

            {/* Current step */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${steps[currentStep].color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {steps[currentStep].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {steps[currentStep].description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {steps[currentStep].detail}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                data-testid="button-previous-step"
              >
                Previous
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                  data-testid="button-next-step"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                  data-testid="button-start-using"
                >
                  Get Started <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Mini step indicator for the main interface
export const StepIndicator: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
            <span className="text-xs font-bold">1</span>
          </div>
          <span className="text-xs font-medium text-white/80 hidden sm:inline">Upload</span>
        </div>
        <ArrowRight className="w-4 h-4 text-white/40" />
        <div className="flex items-center space-x-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white">
            <span className="text-xs font-bold">2</span>
          </div>
          <span className="text-xs font-medium text-white/80 hidden sm:inline">Describe</span>
        </div>
        <ArrowRight className="w-4 h-4 text-white/40" />
        <div className="flex items-center space-x-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white">
            <span className="text-xs font-bold">3</span>
          </div>
          <span className="text-xs font-medium text-white/80 hidden sm:inline">Generate</span>
        </div>
      </div>
    </div>
  );
};

export default StepGuide;