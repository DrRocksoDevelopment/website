(function () {
  'use strict';

  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateNav() {
    let currentId = '';
    const scrollY = window.scrollY;

    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav, { passive: true });
  updateNav();

  function scrollToSection(target) {
    const navHeight = 60;
    const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: targetPos, behavior: 'smooth' });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        scrollToSection(target);
      }
    });
  });

  const heroBtn = document.querySelector('.hero-content .btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        scrollToSection(target);
      }
    });
  }

  function renderResearch(data) {
    const container = document.getElementById('research-container');
    if (!container) return;

    (data.research || []).forEach(function (project) {
      const card = document.createElement('div');
      card.className = 'research-card';

      const header = document.createElement('div');
      header.className = 'research-card-header';

      const name = document.createElement('h3');
      name.className = 'research-card-name';
      name.textContent = project.name;
      header.appendChild(name);

      const status = document.createElement('span');
      status.className = 'research-card-status';
      status.textContent = project.status;
      header.appendChild(status);

      card.appendChild(header);

      const desc = document.createElement('p');
      desc.className = 'research-card-description';
      desc.textContent = project.description;
      card.appendChild(desc);

      const question = document.createElement('blockquote');
      question.className = 'research-card-question';
      question.textContent = project.question;
      card.appendChild(question);

      const link = document.createElement('a');
      link.className = 'btn btn-text';
      link.setAttribute('role', 'button');
      link.setAttribute('tabindex', '0');
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(project.name, project.status, project.question, project.details, project.links);
      });
      link.textContent = 'Подробнее \u2192';
      card.appendChild(link);

      container.appendChild(card);
    });

    setTimeout(function () {
      observeElements('.research-card', 'visible');
    }, 50);
  }

  function renderDevelopments(data) {
    const container = document.getElementById('developments-container');
    if (!container) return;

    (data.developments || []).forEach(function (dev) {
      const card = document.createElement('div');
      card.className = 'development-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      const header = document.createElement('div');
      header.className = 'development-header';

      const name = document.createElement('h3');
      name.className = 'development-name';
      name.textContent = dev.name;
      header.appendChild(name);

      const status = document.createElement('span');
      status.className = 'development-status';
      status.textContent = dev.status;
      header.appendChild(status);

      card.appendChild(header);

      const desc = document.createElement('p');
      desc.className = 'development-description';
      desc.textContent = dev.description;
      card.appendChild(desc);

      card.addEventListener('click', function () {
        openModal(dev.name, dev.status, null, dev.details, dev.links);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(dev.name, dev.status, null, dev.details, dev.links);
        }
      });

      container.appendChild(card);
    });

    setTimeout(function () {
      observeElements('.development-card', 'visible');
    }, 50);
  }

  function renderSolutions(data) {
    const container = document.getElementById('solutions-container');
    if (!container) return;

    (data.solutions || []).forEach(function (sol) {
      const card = document.createElement('div');
      card.className = 'solution-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      const yearSpan = document.createElement('span');
      yearSpan.className = 'solution-year';
      yearSpan.textContent = sol.year;
      card.appendChild(yearSpan);

      const name = document.createElement('span');
      name.className = 'solution-name';
      name.textContent = sol.name;
      card.appendChild(name);

      const desc = document.createElement('p');
      desc.className = 'solution-desc';
      desc.textContent = sol.description;
      card.appendChild(desc);

      if (sol.tech) {
        const tech = document.createElement('span');
        tech.className = 'solution-tech';
        tech.textContent = sol.tech;
        card.appendChild(tech);
      }

      card.addEventListener('click', function () {
        openModal(sol.name, null, null, sol.details, sol.links);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(sol.name, null, null, sol.details, sol.links);
        }
      });

      container.appendChild(card);
    });

    setTimeout(function () {
      observeElements('.solution-card', 'visible');
    }, 50);
  }

  function renderProcess(data) {
    const container = document.getElementById('process-container');
    if (!container) return;

    const steps = data.process || [];

    steps.forEach(function (step, index) {
      const stepEl = document.createElement('div');
      stepEl.className = 'process-step';

      const num = document.createElement('span');
      num.className = 'process-num';
      num.textContent = step.num;
      stepEl.appendChild(num);

      const label = document.createElement('span');
      label.className = 'process-label';
      label.textContent = step.label;
      stepEl.appendChild(label);

      container.appendChild(stepEl);

      if (index < steps.length - 1) {
        const line = document.createElement('div');
        line.className = 'process-line';
        container.appendChild(line);
      }
    });

    setTimeout(function () {
      setupProcessAnimation();
    }, 50);
  }

  function renderUnfinished(data) {
    const container = document.getElementById('unfinished-container');
    if (!container) return;

    (data.unfinished || data.researchUnfinished || []).forEach(function (item) {
      const el = document.createElement('div');
      el.className = 'unfinished-item';

      const num = document.createElement('span');
      num.className = 'unfinished-num';
      num.textContent = item.num;
      el.appendChild(num);

      const body = document.createElement('div');
      body.className = 'unfinished-body';

      const title = document.createElement('h3');
      title.className = 'unfinished-title';
      title.textContent = item.title;
      body.appendChild(title);

      const desc = document.createElement('p');
      desc.className = 'unfinished-desc';
      desc.textContent = item.description;
      body.appendChild(desc);

      el.appendChild(body);
      container.appendChild(el);
    });

    setTimeout(function () {
      observeElements('.unfinished-item', 'visible');
    }, 50);
  }

  function renderContacts(data) {
    const container = document.getElementById('contacts-container');
    if (!container) return;

    (data.contacts || []).forEach(function (contact) {
      const link = document.createElement('a');
      link.className = 'contact-link';
      link.href = contact.url || '#';
      link.textContent = contact.label;
      container.appendChild(link);
    });
  }

  function loadJSON(url) {
  return new Promise(function (resolve, reject) {
    if (location.protocol === 'file:') {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 0) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              reject(e);
            }
          } else {
            reject(new Error('Failed to load ' + url));
          }
        }
      };
      xhr.send();
    } else {
      fetch(url)
        .then(function (res) {
          if (!res.ok) throw new Error('Failed to load ' + url);
          return res.json();
        })
        .then(resolve)
        .catch(reject);
    }
  });
}

loadJSON('data/site.json')
  .then(function (data) {
    renderResearch(data);
    renderDevelopments(data);
    renderSolutions(data);
    renderProcess(data);
    renderUnfinished(data);
    renderContacts(data);
    const loader = document.getElementById('loading-indicator');
    if (loader) loader.remove();
  })
  .catch(function (err) {
    console.error(err);
    const loader = document.getElementById('loading-indicator');
    if (loader) loader.remove();
    const ids = ['research-container', 'developments-container', 'solutions-container', 'process-container', 'unfinished-container', 'contacts-container'];
    ids.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && !el.children.length) {
        const msg = document.createElement('p');
        msg.style.cssText = 'color:#666;font-size:14px;padding:32px 0;';
        msg.textContent = 'Не удалось загрузить данные. Для локальной разработки используйте простой HTTP-сервер: npx serve .';
        el.appendChild(msg);
      }
    });
  });

/* ---- Modal ---- */

const modal = document.getElementById('modal');
const modalBody = modal ? modal.querySelector('.modal-body') : null;
const modalClose = modal ? modal.querySelector('.modal-close') : null;
const modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;

function openModal(title, status, question, details, links) {
  if (!modal || !modalBody) return;

  let html = '<h2>' + title + '</h2>';
  if (status) {
    html += '<span class="project-status">' + status + '</span>';
  }
  if (question) {
    html += '<blockquote class="modal-question">' + question + '</blockquote>';
  }
  if (details) {
    html += '<div class="modal-details">' + details + '</div>';
  }
  if (links && links.length) {
    html += '<div class="modal-links">';
    links.forEach(function (link) {
      html += '<a href="' + link.url + '" class="modal-link" target="_blank" rel="noopener noreferrer">' + link.text + '</a>';
    });
    html += '</div>';
  }
  modalBody.innerHTML = html;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
    closeModal();
  }
});

setupSectionLines();
observeElements('.section:not(.hero)', 'visible');

})();
