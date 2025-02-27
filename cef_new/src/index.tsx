import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import {Provider} from "react-redux";
import {store} from "#/shared/store";
import Test from "#/app/Test";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <StrictMode>
        <Test />
      </StrictMode>
    </Provider>,
);
