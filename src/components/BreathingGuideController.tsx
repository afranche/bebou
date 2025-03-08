import { useEffect } from "react";
import type { FunctionComponent } from "react";

import BreathingGuide from "./BreathingGuide";
import { useTimerStore } from "@/hooks/timer";

const BreathingGuideController: FunctionComponent<object> = () => {
  /*
  Phase % 4 = 1 => Inspiration
  Phase % 4 = 2 => Hold
  Phase % 4 = 3 => Expiration
  Phase % 4 = 0 => Hold
  */
  const { isRunning, phase, countdown, tick, lap } = useTimerStore();

  const isShorterPeriods = phase <= 12;
  const isInhalePhase = [1, 2].includes(phase % 4);

  useEffect(() => {
    if (isRunning) {
      if (countdown > 0) {
        const interval = setInterval(() => {
          tick();
        }, 1000);
        return () => clearInterval(interval);
      } else {
        lap([2, 0].includes(phase % 4) ? 2 : isShorterPeriods ? 3 : 5);
      }
    }
  }, [isRunning, lap, tick, countdown, isShorterPeriods, phase]);

  return (
    <>
      <BreathingGuide
        value={isInhalePhase ? 100 : 0}
        duration={isShorterPeriods ? 4 : 6}
      />
    </>
  );
};

export default BreathingGuideController;
