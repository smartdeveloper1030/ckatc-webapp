import { X } from "lucide-react";
import { Check } from "lucide-react";
import { useState } from "react";

interface ProgramsConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgramsConfig({ isOpen, onClose }: ProgramsConfigProps) {
    const [selectedItems, setSelectedItems] = useState<string[]>([
      '01-M Manipulates and explores objects from 1 minute',
      '02-M Responds to hearing his own name 5 times'
    ]);
  
    const items = [
      'All',
      '01-M Manipulates and explores objects from 1 minute',
      '02-M Responds to hearing his own name 5 times',
      '02-M Shows variation in play by independently interacting with 5 different items',
      '03-M Demonstrates generalization by engaging in exploratory movement and playing with the toys in a novel environment for 2 minutes'
    ];
  
    const handleItemClick = (item: string) => {
      if (item === 'All') {
        // If "All" is selected, deselect all items
        // If not all items are selected, select all items
        setSelectedItems(selectedItems.length === items.length - 1 ? [] : items.slice(1));
      } else {
        setSelectedItems(prev => {
          if (prev.includes(item)) {
            return prev.filter(i => i !== item);
          } else {
            return [...prev, item];
          }
        });
      }
    };

    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Program Configuration</h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
              >
                <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors
                  ${selectedItems.includes(item) || (item === 'All' && selectedItems.length === items.length - 1)
                    ? 'bg-[#2B4C7E] border-[#2B4C7E]' 
                    : 'border-gray-300'}`}
                >
                  {(selectedItems.includes(item) || (item === 'All' && selectedItems.length === items.length - 1)) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="text-gray-700">{item}</span>
              </button>
            ))}
          </div>
          
          <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle save logic here
                onClose();
              }}
              className="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg font-medium hover:bg-[#2B4C7E]/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
  