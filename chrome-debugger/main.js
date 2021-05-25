function calc() {
  const inputValue = document.getElementById('input-value');
  const result = document.getElementById('result');
  result.innerText = fibonacci(+inputValue.value);
}

function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
