const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

// Mostrar o formulário automaticamente ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    wrapper.classList.add('active-popup');
});

document.querySelector('form[action="php/login.php"]').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const oldAlert = document.querySelector('.alert');
  if (oldAlert) oldAlert.remove();

  try {
    const resposta = await fetch('php/login.php', {
      method: 'POST',
      body: formData
    });

    const texto = await resposta.text();
    const isSuccess = texto.startsWith('sucesso|');
    const message = isSuccess ? texto.replace('sucesso|', '') : texto;

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${isSuccess ? 'success' : 'error'}`;
    alertDiv.innerHTML = `
      ${message}
      <span class="close-btn">&times;</span>
    `;

    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.classList.add('show'), 10);

    const closeBtn = alertDiv.querySelector('.close-btn');
    const closeAlert = () => {
      alertDiv.classList.remove('show');
      setTimeout(() => alertDiv.remove(), 400);
    };

    closeBtn.addEventListener('click', closeAlert);
    setTimeout(closeAlert, 5000);

    // ⬇⬇ REDIRECIONAR após 2.5 segundos
    if (isSuccess) {
      setTimeout(() => {
        // ✅ COLOQUE AQUI O CAMINHO DA PÁGINA PARA ONDE O USUÁRIO DEVE IR APÓS LOGIN
        window.location.href = '../../Live-Music/Categorias/Categorias.html';
        // Exemplo: 'dashboard.html', 'home.html', etc.
      }, 2500);
    }

  } catch (erro) {
    // erro de rede ou fetch
  }
});
