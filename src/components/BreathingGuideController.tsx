import { useEffect } from "react";
import type { FunctionComponent } from "react";

import BreathingGuide from "./BreathingGuide";
import { useTimerStore, useTimerConfigStore } from "@/hooks/timer";

const BreathingGuideController: FunctionComponent<object> = () => {
  /*
  Phase % 4 = 1 => Inspiration
  Phase % 4 = 2 => Hold
  Phase % 4 = 3 => Expiration
  Phase % 4 = 0 => Hold
  */
  const { isRunning, phase, globalTimer, countdown, tick, lap } =
    useTimerStore();
  const { period, isWarmupEnabled, isGlobalTimerEnabled, globalTimerTarget } =
    useTimerConfigStore();

  const isShorterPeriods = isWarmupEnabled && phase <= 12;
  const isInhalePhase = [1, 2].includes(phase % 4);

  useEffect(() => {
    if (isRunning) {
      if (isGlobalTimerEnabled && globalTimer >= globalTimerTarget) stop();
      if (countdown > 0) {
        const interval = setInterval(() => {
          tick();
        }, 1000);
        return () => clearInterval(interval);
      } else {
        lap([2, 0].includes(phase % 4) ? 2 : isShorterPeriods ? 3 : period);
      }
    }
  }, [
    isRunning,
    lap,
    tick,
    countdown,
    isShorterPeriods,
    phase,
    period,
    isGlobalTimerEnabled,
    globalTimer,
    globalTimerTarget,
  ]);

  return (
    <>
      <BreathingGuide
        value={isInhalePhase ? 100 : 0}
        duration={isShorterPeriods ? 4 : period + 1}
      />
    </>
  );
};

export default BreathingGuideController;
