const amongus = (bg: string) => {
  return {
    autoPlay: true,
    background: {
      color: {
        value: bg,
      },
      image: '',
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
      opacity: 1,
    },
    backgroundMask: {
      composite: 'destination-out',
      cover: {
        color: {
          value: '#fff',
        },
        opacity: 1,
      },
      enable: false,
    },
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    detectRetina: true,
    duration: 0,
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'window' as 'window',
      events: {
        onClick: {
          enable: false,
          mode: [],
        },
        onHover: {
          enable: false,
          mode: [],
          parallax: {
            enable: false,
            force: 2,
            smooth: 10,
          },
        },
        resize: true,
      },
      modes: {
        attract: {
          distance: 200,
          duration: 0.4,
          factor: 1,
          maxSpeed: 50,
          speed: 1,
        },
        bounce: {
          distance: 200,
        },
        bubble: {
          distance: 200,
          duration: 0.4,
          mix: false,
        },
        connect: {
          distance: 80,
          links: {
            opacity: 0.5,
          },
          radius: 60,
        },
        grab: {
          distance: 100,
          links: {
            blink: false,
            consent: false,
            opacity: 1,
          },
        },
        light: {
          area: {
            gradient: {
              start: {
                value: '#ffffff',
              },
              stop: {
                value: '#000000',
              },
            },
            radius: 1000,
          },
          shadow: {
            color: {
              value: '#000000',
            },
            length: 2000,
          },
        },
        push: {
          default: true,
          groups: [],
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
        },
        slow: {
          factor: 3,
          radius: 200,
        },
        trail: {
          delay: 1,
          pauseOnStop: false,
          quantity: 1,
          particles: {
            color: {
              value: '#ff0000',
              animation: {
                enable: true,
                speed: 400,
                sync: true,
              },
            },
            collisions: {
              enable: false,
            },
            links: {
              enable: false,
            },
            move: {
              outModes: {
                default: 'destroy' as 'destroy',
              },
              speed: 2,
            },
            size: {
              value: 5,
              animation: {
                enable: true,
                speed: 5,
                minimumValue: 1,
                sync: true,
                startValue: 'min' as 'min',
                destroy: 'max' as 'max',
              },
            },
          },
        },
      },
    },
    manualParticles: [],
    motion: {
      disable: false,
      reduce: {
        factor: 4,
        value: true,
      },
    },
    particles: {
      bounce: {
        horizontal: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
        vertical: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
      },
      collisions: {
        bounce: {
          horizontal: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            value: 1,
          },
          vertical: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            value: 1,
          },
        },
        enable: false,
        mode: 'bounce' as 'bounce',
        overlap: {
          enable: true,
          retries: 0,
        },
      },
      color: {
        value: '#fff',
        animation: {
          h: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 20,
            sync: true,
          },
          s: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
          l: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
        },
      },
      destroy: {
        split: {
          count: 1,
          factor: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 3,
          },
          rate: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: {
              min: 4,
              max: 9,
            },
          },
          sizeOffset: true,
        },
      },
      gradient: [],
      groups: {
        z5000: {
          number: {
            value: 70,
          },
          zIndex: {
            value: 50,
          },
        },
        z7500: {
          number: {
            value: 30,
          },
          zIndex: {
            value: 75,
          },
        },
        z2500: {
          number: {
            value: 50,
          },
          zIndex: {
            value: 25,
          },
        },
        z1000: {
          number: {
            value: 40,
          },
          zIndex: {
            value: 10,
          },
        },
      },
      life: {
        count: 0,
        delay: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          sync: false,
        },
        duration: {
          random: {
            enable: false,
            minimumValue: 0.0001,
          },
          value: 0,
          sync: false,
        },
      },
      links: {
        blink: false,
        color: {
          value: '#ffffff',
        },
        consent: false,
        distance: 100,
        enable: false,
        frequency: 1,
        opacity: 0.4,
        shadow: {
          blur: 5,
          color: {
            value: '#00ff00',
          },
          enable: false,
        },
        triangles: {
          enable: false,
          frequency: 1,
        },
        width: 1,
        warp: false,
      },
      move: {
        angle: {
          offset: 0,
          value: 10,
        },
        attract: {
          distance: 200,
          enable: false,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        decay: 0,
        distance: {},
        direction: 'right' as 'right',
        drift: 0,
        enable: true,
        gravity: {
          acceleration: 9.81,
          enable: false,
          inverse: false,
          maxSpeed: 50,
        },
        path: {
          clamp: true,
          delay: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
          },
          enable: false,
          options: {},
        },
        outModes: {
          default: 'out' as 'out',
          bottom: 'out' as 'out',
          left: 'out' as 'out',
          right: 'out' as 'out',
          top: 'out' as 'out',
        },
        random: false,
        size: false,
        speed: 5,
        spin: {
          acceleration: 0,
          enable: false,
        },
        straight: false,
        trail: {
          enable: false,
          length: 10,
          fillColor: {
            value: '#000000',
          },
        },
        vibrate: false,
        warp: false,
      },
      number: {
        density: {
          enable: false,
          area: 800,
          factor: 1000,
        },
        limit: 0,
        value: 200,
      },
      opacity: {
        random: {
          enable: false,
          minimumValue: 0.1,
        },
        value: 1,
        animation: {
          count: 0,
          enable: false,
          speed: 3,
          sync: false,
          destroy: 'none' as 'none',
          startValue: 'random' as 'random',
          minimumValue: 0.1,
        },
      },
      orbit: {
        animation: {
          count: 0,
          enable: false,
          speed: 1,
          sync: false,
        },
        enable: false,
        opacity: 1,
        rotation: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 45,
        },
        width: 1,
      },
      reduceDuplicates: false,
      repulse: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        enabled: false,
        distance: 1,
        duration: 1,
        factor: 1,
        speed: 1,
      },
      roll: {
        darken: {
          enable: false,
          value: 0,
        },
        enable: false,
        enlighten: {
          enable: false,
          value: 0,
        },
        mode: 'vertical' as 'vertical',
        speed: 25,
      },
      rotate: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          sync: false,
        },
        direction: 'clockwise' as 'clockwise',
        path: false,
      },
      shadow: {
        blur: 0,
        color: {
          value: '#000000',
        },
        enable: false,
        offset: {
          x: 0,
          y: 0,
        },
      },
      shape: {
        options: {},
        type: 'circle',
      },
      size: {
        random: {
          enable: false,
          minimumValue: 1,
        },
        value: 3,
        animation: {
          count: 0,
          enable: false,
          speed: 5,
          sync: false,
          destroy: 'none' as 'none',
          startValue: 'random' as 'random',
        },
      },
      stroke: {
        width: 0,
      },
      tilt: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          sync: false,
        },
        direction: 'clockwise' as 'clockwise',
        enable: false,
      },
      twinkle: {
        lines: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
        particles: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
      },
      wobble: {
        distance: 5,
        enable: false,
        speed: 50,
      },
      zIndex: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 5,
        opacityRate: 0.5,
        sizeRate: 1,
        velocityRate: 1,
      },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    responsive: [],
    themes: [],
    zLayers: 100,
    emitters: {
      autoPlay: true,
      fill: true,
      life: {
        wait: false,
      },
      rate: {
        quantity: 1,
        delay: 7,
      },
      shape: 'square' as 'square',
      startCount: 0,
      size: {
        mode: 'percent' as 'percent',
        height: 0,
        width: 0,
      },
      particles: {
        shape: {
          type: 'images',
          options: {
            images: {
              src: 'https://particles.js.org/images/cyan_amongus.png',
              width: 500,
              height: 634,
            },
          },
        },
        size: {
          value: 40,
        },
        move: {
          speed: 10,
          outModes: {
            default: 'none' as 'none',
            right: 'destroy' as 'destroy',
          },
          straight: true,
        },
        zIndex: {
          value: 0,
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 10,
            sync: true,
          },
        },
      },
      position: {
        x: -5,
        y: 55,
      },
    },
  };
};

export default amongus;
