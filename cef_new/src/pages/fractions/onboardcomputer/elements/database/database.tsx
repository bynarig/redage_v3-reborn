import React, { useState } from 'react';
import DataBase from './datalist';
import Info from './info';

interface DatabaseProps {
  // Add any props that might be passed to this component
}

const Database: React.FC<DatabaseProps> = (props) => {
  // State for the current view
  const [selectView, setSelectView] = useState<'DataBase' | 'Info'>('DataBase');
  
  // Function to change the current view
  const onChangePage = (page: 'DataBase' | 'Info') => {
    setSelectView(page);
  };
  
  // Render the appropriate component based on the current view
  return (
    <>
      {selectView === 'DataBase' && <DataBase onChangePage={onChangePage} />}
      {selectView === 'Info' && <Info onChangePage={onChangePage} />}
    </>
  );
};

export default Database;