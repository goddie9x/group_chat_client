import amongus from './amongus';
import spring from './spring';
import winter from './winter';
import newEve from './newEve';

const getParticlesTheme = (bg: string) => {
  const currentMonth = new Date().getMonth();

  switch (currentMonth) {
    case 0:
    case 1:
    case 2: 
      return newEve(bg);
    case 3:
    case 4:
    case 5:
      return spring(bg);
    case 6:
    case 7:
    case 8:
      return amongus(bg);
    case 9:
    case 10:
    case 11:
      return winter(bg);
    default:
      return amongus(bg);
  }
};

export default getParticlesTheme;
