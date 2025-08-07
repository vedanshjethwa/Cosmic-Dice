import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Menu, Plus, Minus, X, Divide, Equal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function CalculatorPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const Button = ({ onClick, className, children, ...props }: any) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`h-16 rounded-xl font-bold text-lg transition-all ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/calculator"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h1
                className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Cosmic - Calculator
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-6">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Gaming Calculator</h2>
            </div>

            {/* Display */}
            <div className="bg-[#0A1929] rounded-xl p-6 mb-6 border border-blue-500/20">
              <div className="text-right text-3xl font-mono text-white overflow-hidden">
                {display}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-3">
              <Button
                onClick={clear}
                className="col-span-2 bg-red-600 hover:bg-red-700 text-white"
              >
                Clear
              </Button>
              <Button
                onClick={() => inputOperation('÷')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Divide size={20} />
              </Button>
              <Button
                onClick={() => inputOperation('×')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <X size={20} />
              </Button>

              <Button
                onClick={() => inputNumber('7')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                7
              </Button>
              <Button
                onClick={() => inputNumber('8')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                8
              </Button>
              <Button
                onClick={() => inputNumber('9')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                9
              </Button>
              <Button
                onClick={() => inputOperation('-')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Minus size={20} />
              </Button>

              <Button
                onClick={() => inputNumber('4')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                4
              </Button>
              <Button
                onClick={() => inputNumber('5')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                5
              </Button>
              <Button
                onClick={() => inputNumber('6')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                6
              </Button>
              <Button
                onClick={() => inputOperation('+')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus size={20} />
              </Button>

              <Button
                onClick={() => inputNumber('1')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                1
              </Button>
              <Button
                onClick={() => inputNumber('2')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                2
              </Button>
              <Button
                onClick={() => inputNumber('3')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                3
              </Button>
              <Button
                onClick={performCalculation}
                className="row-span-2 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
              >
                <Equal size={20} />
              </Button>

              <Button
                onClick={() => inputNumber('0')}
                className="col-span-2 bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                0
              </Button>
              <Button
                onClick={() => inputNumber('.')}
                className="bg-[#2a3441] hover:bg-[#3a4451] text-white border border-blue-500/30"
              >
                .
              </Button>
            </div>

            {/* Gaming Tips */}
            <div className="mt-6 bg-blue-900/20 rounded-xl p-4 border border-blue-500/20">
              <h3 className="text-blue-400 font-semibold mb-2">Gaming Tips</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Calculate your bet percentages</li>
                <li>• Track your win/loss ratios</li>
                <li>• Plan your bankroll management</li>
                <li>• Determine optimal bet sizes</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}