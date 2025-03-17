import { Button } from "@/components/ui/button";

import "./App.css";

import { useTimerStore } from "./hooks/timer";
import BreathingGuideController from "./components/BreathingGuideController";

import { Play, Bolt } from "lucide-react";
import OptionsDialog from "./components/OptionsDialog";

function App() {
  const { phase, isRunning, start, stop } = useTimerStore();

  const toggle = () => (isRunning ? stop() : start());

  return (
    <>
      <div className="absolute top-10 md:top-20 left-0 right-0 z-10 self-center p-8">
        {isRunning ? (
          <div className="flex flex-col text-6xl items-center">
            <strong>
              {phase % 4 == 1 ? "Inspirez" : phase % 4 == 3 ? "Expirez" : "..."}
            </strong>
            <Button
              onClick={toggle}
              className="mt-10"
              size="lg"
              variant="outline"
            >
              Arrêter
            </Button>
          </div>
        ) : (
          <div>
            <h1 className="text-8xl md:text-9xl">Bébou</h1>
            <div className="text-2xl md:text-3xl mt-4 tracking-tight">
              Bébou est un outil pour caler ta respiration et t'aider à te
              calmer dans un moment stressant.
            </div>
            <div className="mt-10 flex gap-2 justify-center">
              <Button onClick={toggle} size="lg">
                <Play />
                <span>Démarrer</span>
              </Button>
              <OptionsDialog>
                <Button size="lg" variant="secondary" disabled>
                  <Bolt />
                  <span>Options (WIP)</span>
                </Button>
              </OptionsDialog>
            </div>
          </div>
        )}
      </div>
      <BreathingGuideController />
    </>
  );
}

export default App;
