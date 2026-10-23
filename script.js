// Menu no celular
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', aberto);
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Abrir / fechar todas as pautas
const pautas = document.querySelectorAll('.pauta');
const expandir = document.querySelector('.expandir');

expandir.addEventListener('click', () => {
  const abrir = expandir.textContent.trim() === 'Abrir todas as pautas';
  pautas.forEach((p) => (p.open = abrir));
  expandir.textContent = abrir ? 'Fechar todas as pautas' : 'Abrir todas as pautas';
});

// Mantém apenas uma pauta aberta ao clicar (exceto quando "abrir todas" está ativo)
pautas.forEach((p) => {
  p.addEventListener('toggle', () => {
    if (p.open && expandir.textContent.trim() === 'Abrir todas as pautas') {
      pautas.forEach((outra) => {
        if (outra !== p) outra.open = false;
      });
    }
  });
});

// Formulário de adesão
const form = document.querySelector('.form');
const msg = form.querySelector('.msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valido = true;

  form.querySelectorAll('input').forEach((campo) => {
    const vazio = campo.value.trim() === '';
    campo.classList.toggle('erro', vazio);
    if (vazio) valido = false;
  });

  if (!valido) {
    msg.textContent = 'Preencha todos os campos para entrar na AME.';
    return;
  }

  /* Para receber as inscrições de verdade, envie os dados para um serviço
     (Google Forms, Formspree etc.) ou para o WhatsApp do movimento. Exemplo:
     const nome = form.nome.value;
     window.open('https://wa.me/55SEUNUMERO?text=' + encodeURIComponent('Quero entrar na AME! Sou ' + nome));
  */
  msg.textContent = 'Inscrição recebida! A AME vai entrar em contato. Viva a luta estudantil!';
  form.reset();
});