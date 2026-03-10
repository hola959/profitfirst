const form = document.querySelector('#profit-form');
const resultList = document.querySelector('#result-list');
const validationMessage = document.querySelector('#validation-message');

const fields = {
  income: document.querySelector('#income'),
  profit: document.querySelector('#profit'),
  owner: document.querySelector('#owner'),
  tax: document.querySelector('#tax'),
  opex: document.querySelector('#opex'),
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);

function calculateDistribution(values) {
  const totalPercent = values.profit + values.owner + values.tax + values.opex;

  if (totalPercent !== 100) {
    validationMessage.textContent = `Los porcentajes deben sumar 100%. Actualmente: ${totalPercent}%.`;
    validationMessage.className = 'validation error';
    return null;
  }

  validationMessage.textContent = 'Distribución válida. ¡Listo para transferir!';
  validationMessage.className = 'validation ok';

  return [
    ['Ganancia', values.income * (values.profit / 100)],
    ['Salario dueño', values.income * (values.owner / 100)],
    ['Impuestos', values.income * (values.tax / 100)],
    ['Gastos operativos', values.income * (values.opex / 100)],
  ];
}

function renderResults(items) {
  resultList.innerHTML = '';

  if (!items) {
    return;
  }

  items.forEach(([label, amount]) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${label}</span><strong>${formatCurrency(amount)}</strong>`;
    resultList.appendChild(li);
  });
}

function getValues() {
  return {
    income: Number(fields.income.value) || 0,
    profit: Number(fields.profit.value) || 0,
    owner: Number(fields.owner.value) || 0,
    tax: Number(fields.tax.value) || 0,
    opex: Number(fields.opex.value) || 0,
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const values = getValues();
  const distribution = calculateDistribution(values);
  renderResults(distribution);
});

// Render inicial
renderResults(calculateDistribution(getValues()));

const checklist = document.querySelector('#checklist');
const resetChecklistButton = document.querySelector('#reset-checklist');

resetChecklistButton.addEventListener('click', () => {
  checklist.querySelectorAll('input[type="checkbox"]').forEach((item) => {
    item.checked = false;
  });
});
