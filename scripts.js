
// Модальное окно
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalClose = document.getElementById('modal-close');
const modalCloseX = document.getElementById('modal-close-x');
const terminalLines = document.getElementById('terminal-lines');

// Конфигурация проектов
const projects = {
  ANTISLUT: { color: 'red', title: 'БОТ_ANTISLUT' },
  BANHAMMER: { color: 'red', title: 'БОТ_BANHAMMER' },
  FRAGENHAMMER: { color: 'emerald', title: 'БОТ_FRAGENHAMMER' }
};

// Открытие модального окна
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const projectId = button.dataset.project;
    const project = projects[projectId];
    
    modalTitle.className = `text-3xl md:text-5xl font-black tracking-tight mb-8 bg-gradient-to-r from-${project.color}-500 to-${project.color}-500/60 bg-clip-text text-transparent`;
    modalTitle.textContent = project.title;
    
    modalContent.className = `bg-black p-6 md:p-16 max-w-3xl w-full mx-4 border-2 border-${project.color}-500/20 animate-slide-up relative`;
    modalSubtitle.className = `text-xs md:text-sm font-medium tracking-[0.2em] text-${project.color}-500`;
    modalClose.className = `corporate-button border-2 border-${project.color}-500 hover:bg-${project.color}-500/10 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base`;

    // Генерация терминальных строк
    terminalLines.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.className = `terminal-line text-${project.color}-500/50 text-xs md:text-sm`;
      line.style.transform = `translateY(${i * 2}px)`;
      line.style.opacity = 1 - (i / 40);
      line.textContent = `АНАЛИЗ_${Math.random().toString(36).substring(2, 8).toUpperCase()}_${i}: ИНИЦИАЛИЗАЦИЯ_БОТА`;
      terminalLines.appendChild(line);
    }

    modal.classList.remove('hidden');
  });
});

// Закрытие модального окна
const closeModal = () => {
  modal.classList.add('hidden');
};

modalClose.addEventListener('click', closeModal);
modalCloseX.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
