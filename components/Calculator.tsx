import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Calculator: React.FC = () => {
  const [cost, setCost] = useState<string>('');
  // Default margin 48% persisted in localStorage
  const [margin, setMargin] = useLocalStorage<number>('profit_margin', 48);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', { // Generic Latam/MX format
      style: 'currency',
      currency: 'USD', // Using $ symbol generally
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const costNum = parseFloat(cost);
    const marginNum = Number(margin);

    if (isNaN(costNum) || costNum <= 0) {
      setError('Por favor ingresa un costo válido mayor a 0.');
      return;
    }

    if (isNaN(marginNum) || marginNum < 0 || marginNum >= 100) {
      setError('El margen debe estar entre 0 y 99%.');
      return;
    }

    // Formula: Selling Price = Cost / (1 - Margin%)
    // If Margin is 48%, we divide by (1 - 0.48) = 0.52
    const decimalMargin = marginNum / 100;
    const sellingPrice = costNum / (1 - decimalMargin);

    setResult(sellingPrice);
  };

  const handleReset = () => {
    setCost('');
    setResult(null);
    setError('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-6 sm:p-8 space-y-6">
        
        <form onSubmit={handleCalculate} className="space-y-5">
          {/* Cost Input */}
          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
              Costo del Producto ($)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-lg">$</span>
              </div>
              <input
                type="number"
                name="cost"
                id="cost"
                step="0.01"
                className="block w-full rounded-lg border-gray-300 pl-8 pr-12 py-3 focus:border-primary focus:ring-primary sm:text-lg bg-gray-50 focus:bg-white transition-all border outline-none ring-0 focus:ring-2"
                placeholder="0.00"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                autoComplete="off"
                inputMode="decimal"
              />
            </div>
          </div>

          {/* Margin Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="margin" className="block text-sm font-medium text-gray-700">
                Margen de Ganancia (%)
              </label>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                Predeterminado: 48%
              </span>
            </div>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                name="margin"
                id="margin"
                className="block w-full rounded-lg border-gray-300 py-3 px-4 focus:border-primary focus:ring-primary sm:text-lg bg-gray-50 focus:bg-white transition-all border outline-none ring-0 focus:ring-2"
                placeholder="48"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                inputMode="decimal"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-gray-500 font-bold">%</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-lg font-semibold text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Calcular Precio
          </button>
        </form>

        {/* Result Area */}
        <div className={`transition-all duration-500 ease-in-out transform ${result !== null ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 h-0 overflow-hidden'}`}>
            <div className="relative mt-2 pt-6 border-t border-dashed border-gray-200">
                <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Precio de Venta Sugerido</p>
                <div className="text-center">
                    <span className="block text-4xl sm:text-5xl font-extrabold text-secondary tracking-tight">
                        {result !== null ? formatCurrency(result) : '$ 0.00'}
                    </span>
                </div>
                
                {result !== null && (
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <span className="block text-xs text-gray-500">Ganancia Neta</span>
                            <span className="block text-sm font-bold text-gray-700">
                                {formatCurrency(result - parseFloat(cost))}
                            </span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <span className="block text-xs text-gray-500">Costo Base</span>
                            <span className="block text-sm font-bold text-gray-700">
                                {formatCurrency(parseFloat(cost))}
                            </span>
                        </div>
                    </div>
                )}
                
                <button 
                  onClick={handleReset}
                  className="mt-6 w-full text-sm text-gray-400 hover:text-gray-600 underline decoration-gray-300 underline-offset-4"
                >
                  Limpiar Calculadora
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};