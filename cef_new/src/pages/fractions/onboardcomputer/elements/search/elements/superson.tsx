import React, { useState } from 'react';
import { translateText } from '#/shared/locale';

const SuPerson: React.FC = () => {
  // State for form fields
  const [personId, setPersonId] = useState<string>('');
  const [articles, setArticles] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [characteristics, setCharacteristics] = useState<string>('');

  // Handle form submission
  const handleSubmit = () => {
    console.log('Declaring person wanted', {
      personId,
      articles,
      description,
      characteristics
    });
    // In a real app, we would call the native client here
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold mt-5">
        {translateText('fractions', 'Розыск преступников')}
      </div>
      
      <div>
        <label className="block text-base-content/70 text-sm mb-2">
          ID {translateText('fractions', 'человека')}:
        </label>
        <input 
          placeholder="Введите ID"
          className="input input-bordered w-full max-w-xs"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-base-content/70 text-sm mb-2">
          {translateText('fractions', 'Статьи')}:
        </label>
        <input 
          placeholder="Введите статьи"
          className="input input-bordered w-full max-w-xs"
          value={articles}
          onChange={(e) => setArticles(e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-base-content/70 text-sm mb-2">
          {translateText('fractions', 'Описание произошедшего')}:
        </label>
        <textarea 
          placeholder="Описание.."
          className="textarea textarea-bordered w-full h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      
      <div>
        <label className="block text-base-content/70 text-sm mb-2">
          {translateText('fractions', 'Приметы преступника')}:
        </label>
        <textarea 
          placeholder="Приметы.."
          className="textarea textarea-bordered w-full h-32"
          value={characteristics}
          onChange={(e) => setCharacteristics(e.target.value)}
        ></textarea>
      </div>
      
      <div className="mt-10">
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {translateText('fractions', 'Объявить в розыск')}
        </button>
      </div>
    </div>
  );
};

export default SuPerson;