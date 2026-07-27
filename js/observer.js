var observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

function observeElements(selector, className) {
  var elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

function setupProcessAnimation() {
  var processObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        var prevLine = entry.target.previousElementSibling;
        if (prevLine && prevLine.classList.contains('process-line')) {
          prevLine.classList.add('drawn');
        }

        processObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.process-step').forEach(function (step) {
    processObserver.observe(step);
  });
}

function setupSectionLines() {
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var line = entry.target.querySelector('.section-line');
        if (line) {
          line.classList.add('drawn');
        }
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section:not(.hero)').forEach(function (section) {
    sectionObserver.observe(section);
  });
}
