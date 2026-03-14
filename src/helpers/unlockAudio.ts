const unlockAudio = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (context.state === 'suspended') {
    await context.resume();
  }
  return context;
};

export default unlockAudio;
