document.getElementById("cep-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cep = document.getElementById("cep").value.trim();
  const result = document.getElementById("result");
  const loader = document.getElementById("loader");

  result.innerHTML = "";
  loader.classList.remove("hidden");

  if (!/^\d{8}$/.test(cep)) {
    loader.classList.add("hidden");
    result.innerHTML = "<p><i class='fas fa-exclamation-circle'></i> CEP inválido. Digite 8 números.</p>";
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    loader.classList.add("hidden");

    if (data.erro) {
      result.innerHTML = "<p><i class='fas fa-times-circle'></i> CEP não encontrado.</p>";
    } else {
      result.innerHTML = `
        <h2><i class="fas fa-map-pin"></i> Resultado:</h2>
        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Cidade:</strong> ${data.localidade}</p>
        <p><strong>Estado:</strong> ${data.uf}</p>
      `;
    }
  } catch (error) {
    loader.classList.add("hidden");
    result.innerHTML = "<p><i class='fas fa-bug'></i> Erro ao buscar o CEP. Tente novamente.</p>";
  }
});

