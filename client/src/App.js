import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from './components/auth/LoginForm';
import Register from './components/auth/Register';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
