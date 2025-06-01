document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('convertBtn');
  if (!btn) return; // si no está el botón, no hacer nada

  btn.addEventListener('click', async () => {
    try {
      const response = await fetch(window.location.origin + '/api/tasa-cambio/');
      const data = await response.json();
      const tasaCambio = data.tasa;

      const precios = document.querySelectorAll('.price');
      precios.forEach(p => {
        let texto = p.textContent.trim();
        let soloNumero = texto.replace(/\$/g, '').replace(/\./g, '');
        let precioCLP = parseFloat(soloNumero);

        if (!isNaN(precioCLP)) {
          let precioUSD = (precioCLP / tasaCambio).toFixed(2);
          p.textContent = `$${precioUSD} USD`;
        }
      });

      btn.textContent = 'Precios convertidos';
      btn.disabled = true;

    } catch (error) {
      alert('Error al obtener la tasa de cambio.');
      console.error(error);
    }
  });
});
