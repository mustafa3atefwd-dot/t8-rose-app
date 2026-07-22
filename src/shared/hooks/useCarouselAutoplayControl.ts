import { useEffect, useState } from 'react';

interface IAutoplayPlugin {
  play: () => void;
  stop: () => void;
}

export function useCarouselAutoplayControl(plugin: IAutoplayPlugin) {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space') return;

      event.preventDefault();

      if (isPaused) {
        plugin.play();
      } else {
        plugin.stop();
      }

      setIsPaused((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPaused, plugin]);

  return {
    isPaused,
  };
}
