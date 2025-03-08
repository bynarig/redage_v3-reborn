import { useSelector } from 'react-redux';
import { selectRouter } from '#/app/router';
import { EventDispatcher } from './components/EventDispatcher';
// Import your views/components
import PlayerAuthentication from '#/pages/player/authentication';


const App = () => {
  const { view, popup, opacity } = useSelector(selectRouter);
  
  // Map your views to components
  const renderView = () => {
    switch (view) {
      case 'PlayerAuthentication':
        return <PlayerAuthentication />;
      // Add other views here
      default:
        return <div>Unknown view: {view}</div>;
    }
  };
  
  // Map your popups to components
  const renderPopup = () => {
    if (!popup) return null;
    
    switch (popup) {
      // Add your popup components here
      default:
        return <div>Unknown popup: {popup}</div>;
    }
  };

  return (
    <div style={{ opacity }}>
      {/* Silent component for event handling */}
      <EventDispatcher />
      
      {/* Main content */}
      {renderView()}
      
      {/* Popup layer */}
      {popup && renderPopup()}
    </div>
  );
};

export default App;