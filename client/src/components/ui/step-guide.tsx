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
    title: "第1步：上传图片",
    description: "拖拽或点击上传您想要编辑的图片",
    detail: "支持JPG、PNG、WebP格式，最大10MB",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Type,
    title: "第2步：输入描述",
    description: "用自然语言描述您想要的效果",
    detail: "例如：'将背景换成海滩'、'添加彩虹效果'",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Sparkles,
    title: "第3步：生成效果",
    description: "点击生成按钮，AI将为您创造惊艳效果",
    detail: "通常需要10-30秒，请耐心等待",
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
            <h2 className="text-2xl font-bold gradient-text">新手引导</h2>
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
                上一步
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                  data-testid="button-next-step"
                >
                  下一步 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                  data-testid="button-start-using"
                >
                  开始使用 <Sparkles className="w-4 h-4 ml-2" />
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
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20">
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className="flex items-center space-x-2 text-white/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-md`}>
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
              <span className="text-sm font-medium hidden sm:block">
                {step.title.replace('第1步：', '').replace('第2步：', '').replace('第3步：', '')}
              </span>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-white/40 hidden sm:block" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StepGuide;