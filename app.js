document.addEventListener('DOMContentLoaded', () => {
    console.log('App.js cargado correctamente');

    // --- Elements ---
    const form = document.getElementById('calc-form');
    const costInput = document.getElementById('cost');
    const marginInput = document.getElementById('margin');
    const resultSection = document.getElementById('result-section');
    const sellingPriceEl = document.getElementById('selling-price');
    const profitAmountEl = document.getElementById('profit-amount');
    const baseCostEl = document.getElementById('base-cost');
    const errorMsgEl = document.getElementById('error-msg');
    const errorTextEl = document.getElementById('error-text');
    const btnReset = document.getElementById('btn-reset');
    const yearEl = document.getElementById('year');
    
    // Modal Elements
    const btnInfo = document.getElementById('btn-info');
    const infoModal = document.getElementById('info-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCloseModalAction = document.getElementById('btn-close-modal-action');
    const modalContent = document.getElementById('modal-content');

    // --- Init ---
    if(yearEl) yearEl.textContent = new Date().getFullYear();
    
    // Load Margin from LocalStorage
    const savedMargin = localStorage.getItem('profit_margin');
    if (savedMargin) {
        marginInput.value = savedMargin;
    } else {
        marginInput.value = "48";
    }

    // --- Functions ---
    
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const showError = (message) => {
        errorTextEl.textContent = message;
        errorMsgEl.classList.remove('hidden');
        resultSection.classList.add('hidden');
    };

    const hideError = () => {
        errorMsgEl.classList.add('hidden');
    };

    const calculate = (e) => {
        // Doble seguridad para evitar recarga
        if(e) e.preventDefault();
        
        hideError();
        console.log('Calculando...');

        const costVal = parseFloat(costInput.value);
        const marginVal = parseFloat(marginInput.value);

        // Validation
        if (isNaN(costVal) || costVal <= 0) {
            showError('Por favor ingresa un costo válido mayor a 0.');
            return;
        }

        if (isNaN(marginVal) || marginVal < 0 || marginVal >= 100) {
            showError('El margen debe estar entre 0 y 99%.');
            return;
        }

        // Save margin preference
        localStorage.setItem('profit_margin', marginVal);

        // Calculation: Price = Cost / (1 - Margin%)
        const decimalMargin = marginVal / 100;
        const sellingPrice = costVal / (1 - decimalMargin);
        const profit = sellingPrice - costVal;

        // Update UI
        sellingPriceEl.textContent = formatCurrency(sellingPrice);
        profitAmountEl.textContent = formatCurrency(profit);
        baseCostEl.textContent = formatCurrency(costVal);

        // Show results
        resultSection.classList.remove('hidden');
    };

    const reset = () => {
        costInput.value = '';
        resultSection.classList.add('hidden');
        hideError();
        costInput.focus();
    };

    // --- Modal Logic ---
    const openModal = () => {
        infoModal.classList.remove('hidden');
    };

    const closeModal = () => {
        infoModal.classList.add('hidden');
    };

    // --- Event Listeners ---
    if(form) {
        form.addEventListener('submit', calculate);
    }
    
    if(btnReset) {
        btnReset.addEventListener('click', (e) => {
            e.preventDefault();
            reset();
        });
    }

    // Modal Events
    if(btnInfo) btnInfo.addEventListener('click', openModal);
    if(btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    if(btnCloseModalAction) btnCloseModalAction.addEventListener('click', closeModal);
    
    // Close modal on click outside
    if(infoModal) {
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                closeModal();
            }
        });
    }
    
    // Stop propagation on content click to prevent closing
    if(modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && infoModal && !infoModal.classList.contains('hidden')) {
            closeModal();
        }
    });
});