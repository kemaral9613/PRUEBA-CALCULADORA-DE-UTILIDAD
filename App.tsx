import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { InfoModal } from './components/InfoModal';

const App: React.FC = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-100 to-indigo-50">
      
      <header className="w-full max-w-md flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Calculadora
          </h1>
          <p className="text-sm text-gray-500">Define tu precio de venta óptimo</p>
        </div>
        <button 
          onClick={() => setIsInfoOpen(true)}
          className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-white/50"
          aria-label="Información"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
        </button>
      </header>

      <main className="w-full max-w-md">
        <Calculator />
      </main>

      <footer className="mt-8 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Calculadora Comercial</p>
        <p className="mt-1">Optimizado para Móvil y PWA</p>
      </footer>

      {isInfoOpen && <InfoModal onClose={() => setIsInfoOpen(false)} />}
    </div>
  );
};

export default App;