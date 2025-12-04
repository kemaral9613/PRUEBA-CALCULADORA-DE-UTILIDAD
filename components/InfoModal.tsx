import React from 'react';

interface InfoModalProps {
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Acerca de la Fórmula</h2>
        
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Esta aplicación calcula el precio de venta necesario para obtener un margen de ganancia real sobre el precio final, no solo un sobreprecio al costo.
          </p>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="font-mono text-xs text-blue-800 font-bold mb-1">Fórmula utilizada:</p>
            <p className="font-mono text-blue-900">Precio = Costo / (1 - Margen)</p>
          </div>

          <p>
            <strong>Ejemplo:</strong><br/>
            Costo: $100<br/>
            Margen: 48% (0.48)<br/>
            Cálculo: 100 / (1 - 0.48) = 100 / 0.52<br/>
            <strong>Resultado: $192.31</strong>
          </p>
          
          <p className="text-xs text-gray-400 mt-4 pt-4 border-t">
            Esta aplicación funciona sin conexión (Offline) gracias a la tecnología PWA.
          </p>
        </div>
        
        <button 
          onClick={onClose}
          className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};