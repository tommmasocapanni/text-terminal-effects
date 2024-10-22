import { TextAnimator } from './text-animator.js';

const init = () => {
  // Funzione per attivare l'animazione con un ritardo opzionale
  const animateText = (animator, delay = 0) => {
    setTimeout(() => {
      animator.textElement.style.opacity = 1; // Rendi visibile l'elemento
      animator.animate();
    }, delay);
  };

  // Funzione per osservare la visibilità dell'elemento con ritardo progressivo
  const observeVisibility = (element, animator, index) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calcola il ritardo basato sull'indice dell'elemento
            const delay = index * 200; // 200ms di ritardo tra ogni elemento
            animateText(animator, delay);
            observer.unobserve(entry.target); // Disattiva l'osservazione dopo la prima animazione
          }
        });
      },
      {
        threshold: 0.1, // trigger quando almeno il 10% del testo è visibile
      }
    );

    observer.observe(element);
  };

  document.querySelectorAll('.list__item').forEach((item, itemIndex) => {
    const cols = Array.from(item.querySelectorAll('.hover-effect'));
    const animators = cols.map(col => new TextAnimator(col));

    // Attiva animazione su hover
    cols.forEach((col, index) => {
      const animator = animators[index];
      col.addEventListener('mouseenter', () => {
        animateText(animator);
      });

      // Attiva animazione con ritardo quando il testo è visibile nella viewport
      observeVisibility(col, animator, itemIndex);
    });
  });

  document.querySelectorAll('a.hover-effect').forEach((item, index) => {
    const animator = new TextAnimator(item);

    // Attiva animazione su hover
    item.addEventListener('mouseenter', () => {
      animateText(animator);
    });

    // Attiva animazione con ritardo quando il link è visibile nella viewport
    observeVisibility(item, animator, index);
  });
};

init();
