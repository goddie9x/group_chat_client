import 'react-i18next';

import en_us from './en_US.json';
import vi_vn from './vi_VN.json';
import { Language } from 'constants/enum/language';

const resources: Record<Language, { translation: TDict<string> }> = {
  [Language.EN_US]: {
    translation: en_us,
  },
  [Language.VI_VN]: {
    translation: vi_vn,
  },
};

export default resources;
