import React, { useState } from 'react';
import { translateText } from '#/shared/locale';

interface SuEditProps {
  // Add any props the component might need
}

const SuEdit: React.FC<SuEditProps> = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [personId, setPersonId] = useState<string>('');
  const [articles, setArticles] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [characteristics, setCharacteristics] = useState<string>('');

  const handleSubmit = () => {
    console.log('Declaring person wanted', {
      personId,
      articles,
      description,
      characteristics
    });
    // In a real app, we would call the native client here
  };

  const handleEditClick = (shouldEdit: boolean) => {
    setIsEdit(shouldEdit);
  };

  return (
    <div className="space-y-4">
      {!isEdit ? (
        <>
          <div className="text-xl font-bold mt-20 mb-12">
            {translateText('fractions', 'Список законов')}
          </div>
          <div className="text-base-content/70">
            Выберите статью для настройки
          </div>
          <div className="mt-4">
            <button 
              className="btn btn-primary"
              onClick={() => handleEditClick(true)}
            >
              {translateText('fractions', 'Редактировать')}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-xl font-bold mt-20">
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
          
          <div className="mt-10 flex space-x-4">
            <button 
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {translateText('fractions', 'Объявить в розыск')}
            </button>
            
            <button 
              className="btn btn-ghost"
              onClick={() => handleEditClick(false)}
            >
              {translateText('fractions', 'Назад')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SuEdit;