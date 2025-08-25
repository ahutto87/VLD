import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Baby, Clock, AlertCircle } from 'lucide-react';

const DueDateCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState<{
    dueDate: Date;
    weeksPregnant: number;
    trimester: number;
    daysRemaining: number;
  } | null>(null);

  const calculateDueDate = () => {
    if (!lastPeriod) return;

    const lmp = new Date(lastPeriod);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280); // Standard 280 days

    const today = new Date();
    const pregnancyStart = new Date(lmp);
    const daysPregnant = Math.floor((today.getTime() - pregnancyStart.getTime()) / (1000 * 60 * 60 * 24));
    const weeksPregnant = Math.floor(daysPregnant / 7);
    
    let trimester = 1;
    if (weeksPregnant >= 13 && weeksPregnant < 27) trimester = 2;
    else if (weeksPregnant >= 27) trimester = 3;

    const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    setResults({
      dueDate,
      weeksPregnant: Math.max(0, weeksPregnant),
      trimester,
      daysRemaining
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTrimesterInfo = (trimester: number) => {
    const info = {
      1: { weeks: '1-12', color: 'text-sage-300', bgColor: 'bg-sage-100' },
      2: { weeks: '13-26', color: 'text-coral-300', bgColor: 'bg-coral-100' },
      3: { weeks: '27-40', color: 'text-lavender-300', bgColor: 'bg-lavender-100' }
    };
    return info[trimester as keyof typeof info] || info[1];
  };

  return (
    <section id="calculator" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('calculator.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('calculator.subtitle')}
          </p>
        </div>

        <div className="card max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  {t('calculator.last_period')}
                </label>
                <input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  {t('calculator.cycle_length')}
                </label>
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                  min="21"
                  max="35"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateDueDate}
              disabled={!lastPeriod}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Baby className="w-5 h-5 mr-2" />
              {t('calculator.calculate')}
            </button>

            {/* Results */}
            {results && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Due Date */}
                  <div className="bg-coral-50 p-6 rounded-xl text-center">
                    <div className="text-coral-300 font-semibold text-sm uppercase tracking-wide mb-2">
                      {t('calculator.results.due_date')}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {formatDate(results.dueDate)}
                    </div>
                  </div>

                  {/* Weeks Pregnant */}
                  <div className="bg-sage-50 p-6 rounded-xl text-center">
                    <div className="text-sage-300 font-semibold text-sm uppercase tracking-wide mb-2">
                      {t('calculator.results.weeks_pregnant')}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {results.weeksPregnant} weeks
                    </div>
                  </div>

                  {/* Current Trimester */}
                  <div className={`${getTrimesterInfo(results.trimester).bgColor} p-6 rounded-xl text-center`}>
                    <div className={`${getTrimesterInfo(results.trimester).color} font-semibold text-sm uppercase tracking-wide mb-2`}>
                      {t('calculator.results.trimester')}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {results.trimester}
                      <span className="text-sm font-normal text-gray-600 ml-2">
                        ({getTrimesterInfo(results.trimester).weeks} weeks)
                      </span>
                    </div>
                  </div>

                  {/* Days Remaining */}
                  <div className="bg-lavender-50 p-6 rounded-xl text-center">
                    <div className="text-lavender-300 font-semibold text-sm uppercase tracking-wide mb-2">
                      {t('calculator.results.days_remaining')}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {results.daysRemaining} days
                    </div>
                  </div>
                </div>

                {/* Pregnancy Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Pregnancy Progress</span>
                    <span>{Math.min(100, Math.round((results.weeksPregnant / 40) * 100))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-coral-300 to-sage-300 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (results.weeksPregnant / 40) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800">
                  {t('calculator.disclaimer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DueDateCalculator;