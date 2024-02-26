import { useEffect, useRef } from 'react';

const useSkipRunEffectForTheFirstTime = (effect: React.EffectCallback, dependencies?: React.DependencyList) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    effect();
  }, dependencies);
};

export default useSkipRunEffectForTheFirstTime;
