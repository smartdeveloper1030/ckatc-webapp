import {useState, useEffect} from "react";
import { ChevronDown, RotateCcw, X } from "lucide-react";

interface SessionConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionConfig = ({ isOpen, onClose }: SessionConfigProps) => {
    const [autoAdvance, setAutoAdvance] = useState(true);
    const [applyToAll, setApplyToAll] = useState(false);
    const [displayMomentum, setDisplayMomentum] = useState(true);
    const [momentumType, setMomentumType] = useState<'intermixed' | 'suggested'>('intermixed');
    const [selectionMode, setSelectionMode] = useState<'random' | 'weighted'>('weighted');
    const [autoAdvanceWhen, setAutoAdvanceWhen] = useState('after-scored');
    const [correctionTrials, setCorrectionTrials] = useState('3');
    const [momentumProbes, setMomentumProbes] = useState('0');
  
    if (!isOpen) return null;

    const handleReset = () => {
      setAutoAdvance(true);
      setApplyToAll(false);
      setDisplayMomentum(true);
      setMomentumType('intermixed');
      setSelectionMode('weighted');
      setAutoAdvanceWhen('after-scored');
      setCorrectionTrials('3');
      setMomentumProbes('0');
    };

    const handleSave = () => {
      // Here you would typically save the settings
      console.log('Saving settings:', {
        autoAdvance,
        applyToAll,
        displayMomentum,
        momentumType,
        selectionMode,
        autoAdvanceWhen,
        correctionTrials,
        momentumProbes
      });
      onClose();
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleOutsideClick}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-900">Session Configuration</h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="text-sm text-gray-600 italic">
                *Changing these settings will only affect this device. Overall student settings will not change
              </div>
              
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-[#2B4C7E] hover:text-[#2B4C7E]/80 font-medium"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset to Default Settings</span>
              </button>
              
              <div className="border-t border-gray-200 pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyToAll}
                    onChange={() => setApplyToAll(!applyToAll)}
                    className="h-4 w-4 rounded border-gray-300 text-[#2B4C7E] focus:ring-[#2B4C7E]"
                  />
                  <span className="text-gray-700">Apply Settings to every Session with this Student</span>
                </label>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Auto-Advance to Next Target</span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input
                      type="checkbox"
                      id="auto-advance"
                      className="opacity-0 w-0 h-0"
                      checked={autoAdvance}
                      onChange={() => setAutoAdvance(!autoAdvance)}
                    />
                    <label
                      htmlFor="auto-advance"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-200 ${
                        autoAdvance ? 'bg-[#2B4C7E]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-200 ${
                          autoAdvance ? 'transform translate-x-6' : ''
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm text-gray-700 mb-2">When?</label>
                  <div className="relative">
                    <select
                      value={autoAdvanceWhen}
                      onChange={(e) => setAutoAdvanceWhen(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                    >
                      <option value="after-scored">After Each Scored Target</option>
                      <option value="after-session">After Session Completion</option>
                      <option value="after-mastered">After All Targets Mastered</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm text-gray-700 mb-2">Number of Correction Trials</label>
                  <div className="relative">
                    <select
                      value={correctionTrials}
                      onChange={(e) => setCorrectionTrials(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Display Momentum Targets</span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input
                      type="checkbox"
                      id="display-momentum"
                      className="opacity-0 w-0 h-0"
                      checked={displayMomentum}
                      onChange={() => setDisplayMomentum(!displayMomentum)}
                    />
                    <label
                      htmlFor="display-momentum"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-200 ${
                        displayMomentum ? 'bg-[#2B4C7E]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-200 ${
                          displayMomentum ? 'transform translate-x-6' : ''
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm text-gray-700 mb-2">Number of Momentum Probes</label>
                  <div className="relative">
                    <select
                      value={momentumProbes}
                      onChange={(e) => setMomentumProbes(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-3">Momentum Types</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="momentumType"
                            checked={momentumType === 'intermixed'}
                            onChange={() => setMomentumType('intermixed')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border transition-colors ${
                            momentumType === 'intermixed' ? 'border-[#2B4C7E]' : 'border-gray-300'
                          }`}>
                            {momentumType === 'intermixed' && (
                              <div className="w-3 h-3 rounded-full bg-[#2B4C7E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700">Intermixed</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="momentumType"
                            checked={momentumType === 'suggested'}
                            onChange={() => setMomentumType('suggested')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border transition-colors ${
                            momentumType === 'suggested' ? 'border-[#2B4C7E]' : 'border-gray-300'
                          }`}>
                            {momentumType === 'suggested' && (
                              <div className="w-3 h-3 rounded-full bg-[#2B4C7E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700">Suggested</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-3">Selection Mode</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="selectionMode"
                            checked={selectionMode === 'random'}
                            onChange={() => setSelectionMode('random')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border transition-colors ${
                            selectionMode === 'random' ? 'border-[#2B4C7E]' : 'border-gray-300'
                          }`}>
                            {selectionMode === 'random' && (
                              <div className="w-3 h-3 rounded-full bg-[#2B4C7E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700">Random</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="selectionMode"
                            checked={selectionMode === 'weighted'}
                            onChange={() => setSelectionMode('weighted')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border transition-colors ${
                            selectionMode === 'weighted' ? 'border-[#2B4C7E]' : 'border-gray-300'
                          }`}>
                            {selectionMode === 'weighted' && (
                              <div className="w-3 h-3 rounded-full bg-[#2B4C7E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700">Weighted</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg font-medium hover:bg-[#2B4C7E]/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
};
  