import { Button } from "@/components/ui/button";

import "./App.css";
import { useTimerStore } from "./hooks/timer";
import BreathingGuideController from "./components/BreathingGuideController";

function App() {
  const { phase, isRunning, start, stop } = useTimerStore();

  const toggle = () => (isRunning ? stop() : start());

  return (
    <>
      <div className="absolute top-10 left-0 right-0 z-10 self-center p-8">
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
            <h1 className="text-5xl">Bébou</h1>
            <h2 className="text-2xl">(BrEathe-in, Breathe-OUt)</h2>
            <div className="mt-4">
              Bébou est un outil pour caler ta respiration et t'aider à te
              calmer dans un moment stressant.
            </div>
            <Button
              onClick={toggle}
              className="mt-10"
              size="lg"
              variant="outline"
            >
              Démarrer
            </Button>
          </div>
        )}
      </div>
      <BreathingGuideController />
    </>
  );
}

export default App;
