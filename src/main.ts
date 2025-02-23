function serializeForm(formNode: HTMLFormElement) {
  const data = new FormData(formNode)

  const formObject: Record<string, number> = {};
  data.forEach((value, key) => {
    const typedValue = Number(value);
    if (isNaN(typedValue)) {
      console.error("Ошибка: введите число");
      return;
    }
    formObject[key] = typedValue;
    
  });

  return formObject
}

function calculateCredit(data: Record<string, number>) {
  const creditAmount = data.creditAmount
  const creditTerm = data.creditTerm
  const creditPercent = data.creditPercent

  const r = creditPercent / (12 * 100)

  const monthlyPayment = creditAmount 
    * (r * Math.pow(1 + r, creditTerm)) 
    / (Math.pow(1 + r, creditTerm) - 1)
  const totalAmount = monthlyPayment * creditTerm

  return [Math.floor(monthlyPayment), Math.floor(totalAmount)]
}

function printResults(results: Array<number>) {
  const monthlyResult = document.getElementById('monthly-result')
  const totalResult = document.getElementById('total-result')

  if (monthlyResult && totalResult) {
    monthlyResult.innerHTML = String(results[0])
    totalResult.innerHTML = String(results[1])
  }
}

function handleFormSubmit(event: Event) {
  event.preventDefault()
  if (event.target instanceof HTMLFormElement) {
    const data = serializeForm(event.target)
    const results = calculateCredit(data)
    printResults(results)
  }
}

const form = document.getElementById('form') as HTMLFormElement
form?.addEventListener('submit', handleFormSubmit)

