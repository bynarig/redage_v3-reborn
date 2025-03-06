import React, { useState, useEffect } from 'react';
import { executeClient } from '#/shared/api/rage';
import { translateText } from '#/shared/locale';

interface WantedListProps {
  wantedData?: string[];
}

type SortOption = 'default' | 'name' | 'charges';
type FilterOption = 'all' | 'violent' | 'property' | 'traffic';

const WantedList: React.FC<WantedListProps> = ({ wantedData = [] }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [filteredData, setFilteredData] = useState<string[]>(wantedData);
  
  // Filter data whenever search term, sort option, or filter option changes
  useEffect(() => {
    let result = [...wantedData];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(person => 
        person.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterBy !== 'all') {
      // This is a simple example - in a real app, you'd have more sophisticated filtering
      // based on actual crime categories in your data
      switch (filterBy) {
        case 'violent':
          result = result.filter(person => person.includes('УК 2') || person.includes('Murder'));
          break;
        case 'property':
          result = result.filter(person => person.includes('УК 8') || person.includes('Theft'));
          break;
        case 'traffic':
          result = result.filter(person => person.includes('ДТП') || person.includes('Traffic'));
          break;
      }
    }
    
    // Apply sorting
    if (sortBy !== 'default') {
      result.sort((a, b) => {
        const [nameA, chargesA] = a.split(' - ');
        const [nameB, chargesB] = b.split(' - ');
        
        if (sortBy === 'name') {
          return nameA.localeCompare(nameB);
        } else {
          return chargesA?.localeCompare(chargesB || '') || 0;
        }
      });
    }
    
    setFilteredData(result);
  }, [searchTerm, sortBy, filterBy, wantedData]);

  const handleClearWanted = (person: string) => {
    // Extract name from the string (assuming format: "Name - Charges")
    const name = person.split(' - ')[0];
    executeClient('client:pcMenuInput', 'clearWantedLvl', name);
  };

  return (
    <div className="text-white">
      <h1 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="text-xl mr-3">🔍</span>
        {translateText('fractions', 'Сейчас в розыске')}
      </h1>
      
      {/* Search and filters */}
      <div className="bg-[#2c2c2e] rounded-xl p-4 mb-4">
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={translateText('fractions', 'Поиск по имени или статье...')}
            className="pl-10 p-3 bg-[#1c1c1e] border border-[#38383a] text-white rounded-xl w-full
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder:text-white/50"
          />
        </div>
        
        <div className="flex justify-between">
          {/* Sort options */}
          <div className="flex items-center">
            <span className="text-white/70 mr-2">{translateText('fractions', 'Сортировка')}:</span>
            <div className="flex bg-[#1c1c1e] rounded-xl overflow-hidden">
              <button
                onClick={() => setSortBy('default')}
                className={`py-2 px-3 text-sm transition-colors ${
                  sortBy === 'default' ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-[#38383a]'
                }`}
              >
                {translateText('fractions', 'По умолчанию')}
              </button>
              <button
                onClick={() => setSortBy('name')}
                className={`py-2 px-3 text-sm transition-colors ${
                  sortBy === 'name' ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-[#38383a]'
                }`}
              >
                {translateText('fractions', 'По имени')}
              </button>
              <button
                onClick={() => setSortBy('charges')}
                className={`py-2 px-3 text-sm transition-colors ${
                  sortBy === 'charges' ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-[#38383a]'
                }`}
              >
                {translateText('fractions', 'По статье')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wanted list */}
      <div className="bg-[#2c2c2e] rounded-xl overflow-hidden">
        {filteredData.length > 0 ? (
          <div className="divide-y divide-[#38383a]">
            {filteredData.map((person, index) => {
              // Split the string to get name and charges
              const [name, charges] = person.split(' - ');
              
              return (
                <div key={index} className="p-4 hover:bg-[#3c3c3e] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center mr-3 text-red-400">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-sm text-white/50">{charges}</div>
                      </div>
                    </div>
                    
                    <button 
                      className="bg-red-600/20 text-red-400 py-2 px-4 rounded-xl hover:bg-red-600/40 transition-colors"
                      onClick={() => handleClearWanted(person)}
                    >
                      {translateText('fractions', 'Снять розыск')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-white/50">
            <div className="text-5xl mb-4">🔍</div>
            <div className="text-lg">
              {searchTerm 
                ? translateText('fractions', 'Ничего не найдено')
                : translateText('fractions', 'Список пуст')
              }
            </div>
            <div className="text-sm mt-2 text-white/30">
              {searchTerm 
                ? translateText('fractions', 'Попробуйте изменить параметры поиска')
                : translateText('fractions', 'В данный момент никто не находится в розыске')
              }
            </div>
          </div>
        )}
        
        <div className="bg-[#38383a]/30 p-3 text-sm text-white/70">
          <div className="flex justify-between items-center">
            <div>
              {translateText('fractions', 'Всего в розыске')}: {wantedData.length}
            </div>
            <div>
              {translateText('fractions', 'Найдено')}: {filteredData.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WantedList;