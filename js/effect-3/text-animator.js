// Supponendo che SplitType e gsap siano già caricati globalmente
const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];
const randomColors = ['#22a3a9', '#4ca922', '#a99222', '#1d2619']; // Example colors

// Definisci la classe per creare effetti di hover sul testo
class TextAnimator {
  constructor(textElement) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    this.textElement = textElement;
    this.originalChars = []; // Memorizza i caratteri originali
    this.splitText();
  }

  splitText() {
    // Divide il testo per animazione e memorizza il riferimento
    this.splitter = new SplitType(this.textElement, {
      types: 'words, chars' // Modificato per corrispondere alla configurazione SplitType globale
    });

    // Salva lo stato iniziale di ogni carattere
    this.originalChars = this.splitter.chars.map(char => char.innerHTML);
    this.originalColors = this.splitter.chars.map(char => getComputedStyle(char).color);
  }

  animate() {
    // Reset di eventuali animazioni in corso
    this.reset();

    // Anima ogni singolo carattere
    const chars = this.splitter.chars;

    chars.forEach((char, position) => {
      let initialHTML = char.innerHTML;
      let initialColor = getComputedStyle(char).color;

      gsap.timeline()
        .fromTo(char, {
            opacity: 0,
            transformOrigin: '50% 0%'
        },
        {
          duration: 0.03,
          ease: 'none',
          onComplete: () => gsap.set(char, { innerHTML: initialHTML, color: initialColor, delay: 0.03 }),
          repeat: 3,
          repeatRefresh: true,
          repeatDelay: 0.1,
          delay: (position + 1) * 0.08,
          innerHTML: () => {
            const randomChar = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
            const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
            gsap.set(char, { color: randomColor });
            return randomChar;
          },
          opacity: 1
        });
    });
  }

  reset() {
    const chars = this.splitter.chars;
    chars.forEach((char, index) => {
      gsap.killTweensOf(char);
      char.innerHTML = this.originalChars[index];
      char.style.color = this.originalColors[index];
    });
  }
}

// Esponi la classe globalmente per poterla usare nel codice inline di Webflow
window.TextAnimator = TextAnimator;
