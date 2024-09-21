import React from 'react';
import './styles.css';

type Options = {
  element: HTMLElement;
  textArray: string[];

  typeSpeed?: number;
  eraseSpeed?: number;
  delay?: number;
};
function animateText(options: Options) {
  const { element, typeSpeed = 500, eraseSpeed = 200, textArray, delay = 1000 } = options;
  const dom = element;

  const type = (word: string) => {
    dom.innerHTML = word;
  };
  const erase = (word: string) => {
    dom.innerHTML = word;
  };

  function animate(textArray: string[], index) {
    const stateOptions = {
      Typing: 'Typing',
      Erase: 'Erase',
      Pause: 'Pause',
    };
    let state = stateOptions.Typing;
    let i = 0;
    let wordIndex = 0;
    function run() {
      return new Promise((res) => {
        let currentWord = textArray[wordIndex % textArray.length];

        if (state === stateOptions.Typing) {
          const typingTimer = setInterval(() => {
            if (i >= currentWord.length) {
              state = stateOptions.Pause;
              clearInterval(typingTimer);
              res();
            }
            type(currentWord.slice(0, i++));
          }, typeSpeed);
        }

        if (state === stateOptions.Erase) {
          const eraceTimer = setInterval(() => {
            if (i <= 1) {
              state = stateOptions.Typing;
              wordIndex++;
              clearInterval(eraceTimer);
              res();
            }
            erase(currentWord.slice(0, i--));
          }, eraseSpeed);
        }

        if (state === stateOptions.Pause) {
          state = stateOptions.Erase;
          const stopTimer = setInterval(() => {
            clearInterval(stopTimer);
            res();
          }, delay);
        }
      });
    }
    function invoke(fn) {
      console.log('call');
      return fn().then(() => invoke(fn));
    }
    invoke(run);
  }

  animate(textArray, 0);
}

export const TypingEffect = () => {
  React.useEffect(() => {
    animateText({
      element: document.querySelector('.type-root__dynamic-text'),
      textArray: ['hard', 'fun', 'a journey', 'LIFE'],
    });
  }, []);

  return (
    <div className="type-root">
      <p className="type-root__text">
        Coding is <span className="type-root__dynamic-text"></span>
        <span className="cursor">&nbsp;</span>
      </p>
    </div>
  );
};
