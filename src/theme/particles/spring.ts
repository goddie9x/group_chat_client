const spring = (bg: string) => {
  return {
    background: {
      color: {
        value: bg,
      },
    },
    fullScreen: {
      zIndex: -1,
    },
    particles: {
      bounce: {
        horizontal: {
          value: 0,
        },
        vertical: {
          value: 0,
        },
      },
      color: {
        value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E'],
        animation: {
          h: {
            enable: true,
            speed: 30,
          },
        },
      },
      move: {
        decay: 0.1,
        direction: 'top' as 'top',
        enable: true,
        gravity: {
          enable: true,
          maxSpeed: 200,
        },
        outModes: {
          default: 'destroy' as 'destroy',
          bottom: 'bounce' as 'bounce',
          left: 'destroy' as 'destroy',
          right: 'destroy' as 'destroy',
          top: 'none' as 'none',
        },
        speed: {
          min: 50,
          max: 150,
        },
      },
      number: {
        limit: 300,
        value: 0,
      },
      opacity: {
        animation: {
          speed: 0.3,
          sync: true,
          destroy: 'min' as 'min',
          startValue: 'max' as 'max',
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 30,
        },
        enable: true,
        enlighten: {
          enable: true,
          value: 30,
        },
        speed: {
          min: 15,
          max: 25,
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
        direction: 'random' as 'random',
      },
      shape: {
        options: {
          polygon: [
            {
              sides: 5,
            },
            {
              sides: 6,
            },
          ],
          character: [
            {
              value: ['💩', '🤡', '🍀', '🍙'],
            },
          ],
        },
        type: ['circle', 'square' as 'square', 'polygon', 'character', 'character', 'character'],
      },
      tilt: {
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
        direction: 'random' as 'random',
        enable: true,
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -15,
          max: 15,
        },
      },
    },
    emitters: {
      autoPlay: true,
      fill: true,
      life: {
        wait: false,
      },
      rate: {
        quantity: 10,
        delay: 0.1,
      },
      shape: 'square' as 'square',
      startCount: 0,
      size: {
        mode: 'percent' as 'percent',
        height: 0,
        width: 0,
      },
      position: {
        x: 50,
        y: 100,
      },
    },
  };
};

export default spring;
