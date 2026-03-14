import useSound from 'use-sound';

const usePlaySound = (sound: string, volume: number = 1) => {
  const [play] = useSound(sound, {
    volume,
  });

  return { play };
};

export default usePlaySound;
