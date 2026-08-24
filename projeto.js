// Aguarda o HTML carregar completamente antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. GERENCIAMENTO DO FORMULÁRIO DE CONTATO
    // ==========================================
    const formulario = document.querySelector("form");
    
    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            // Impede a página de recarregar
            evento.preventDefault(); 
            
            // Captura os valores digitados pelos usuários
            const nome = formulario.querySelector("input[placeholder*='Nome']").value;
            const email = formulario.querySelector("input[type='email']").value;

            // Cria um alerta de sucesso na tela de forma elegante
            mostrarAlerta(`Obrigado, ${nome}! Seus dados foram enviados com sucesso para o e-mail: ${email}.`, "sucesso");
            
            // Limpa o formulário após o envio
            formulario.reset();
        });
    }

    // ==========================================
    // 2. CALCULADORA DE IMC (FUNCIONALIDADE EXTRA)
    // ==========================================
    const btnCalcular = document.getElementById("btn-calcular");
    
    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const peso = parseFloat(document.getElementById("peso").value);
            const altura = parseFloat(document.getElementById("altura").value);
            const elementoResultado = document.getElementById("resultado-imc");

            // Validação simples dos dados inseridos
            if (!peso || !altura || peso <= 0 || altura <= 0) {
                elementoResultado.textContent = "Por favor, insira valores válidos para peso e altura.";
                elementoResultado.style.color = "#ff4500";
                return;
            }

            // Cálculo do IMC (Peso dividido pela altura ao quadrado)
            const imc = (peso / (altura * altura)).toFixed(2);
            let classificacao = "";

            // Lógica de classificação do peso
            if (imc < 18.5) {
                classificacao = "Abaixo do peso";
            } else if (imc >= 18.5 && imc < 24.9) {
                classificacao = "Peso normal (Ideal)";
            } else if (imc >= 25 && imc < 29.9) {
                classificacao = "Sobrepeso";
            } else {
                classificacao = "Obesidade (Procure nossa equipe!)";
            }

            // Exibe o resultado na tela
            elementoResultado.innerHTML = `Seu IMC é <strong>${imc}</strong> - Classificação: <strong>${classificacao}</strong>`;
            elementoResultado.style.color = "#fff";
        });
    }
});

// Função auxiliar para exibir notificações personalizadas na tela
function mostrarAlerta(mensagem, tipo) {
    const alerta = document.createElement("div");
    alerta.className = `alerta ${tipo}`;
    alerta.textContent = mensagem;
    
    // Estilização direta via JS para garantir que funcione em qualquer layout
    alerta.style.padding = "15px";
    alerta.style.backgroundColor = "#2e7d32";
    alerta.style.color = "white";
    alerta.style.borderRadius = "4px";
    alerta.style.marginBottom = "20px";
    alerta.style.textAlign = "center";
    alerta.style.fontWeight = "bold";

    // Insere o alerta no topo do container principal da página
    const container = document.querySelector(".container") || document.body;
    container.insertBefore(alerta, container.firstChild);

    // Remove o alerta automaticamente após 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}
