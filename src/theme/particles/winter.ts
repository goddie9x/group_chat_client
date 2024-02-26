const winter = (bg: string) => {
  return {
    background: {
      color: {
        value: bg,
      },
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
    },
    fullScreen: {
      zIndex: 1,
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'repulse',
        },
        onHover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 0.3,
          opacity: 1,
          size: 4,
        },
        grab: {
          distance: 400,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      links: {
        color: {
          value: '#ffffff',
        },
        distance: 500,
        opacity: 0.4,
        width: 2,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        direction: 'bottom' as 'bottom',
        enable: true,
        outModes: {
          default: 'destroy' as 'destroy',
          bottom: 'out' as 'out',
          left: 'out' as 'out',
          right: 'out' as 'out',
          top: 'out' as 'out',
        },
      },
      number: {
        density: {
          enable: true,
        },
        value: 400,
      },
      opacity: {
        random: {
          enable: true,
          minimumValue: 0.1,
        },
        value: {
          min: 0.1,
          max: 0.5,
        },
        animation: {
          speed: 1,
          minimumValue: 0.1,
        },
      },
      size: {
        random: {
          enable: true,
          minimumValue: 1,
        },
        value: {
          min: 1,
          max: 10,
        },
        animation: {
          speed: 40,
          minimumValue: 0.1,
        },
      },
    },
  };
};

export default winter;
