import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const kakao = window.Kakao;
    if (!kakao) return;

    if (!kakao.isInitialized()) {
      kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
