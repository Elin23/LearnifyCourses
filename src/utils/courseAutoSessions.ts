export type AutoSession = {
  index: number;          
  title: string;
  durationMin: number;
  isPreview: boolean;    
};

export function generateAutoSessions(totalHours: number, chunkMin = 60): AutoSession[] {
  const totalMin = Math.max(0, Math.round(totalHours * 60));
  const count = Math.max(1, Math.ceil(totalMin / chunkMin));

  return Array.from({ length: count }).map((_, i) => {
    const index = i + 1;
    const remaining = totalMin - i * chunkMin;
    const durationMin = i === count - 1 ? Math.max(10, remaining) : chunkMin;

    return {
      index,
      title: index === 1 ? "Intro (Preview)" : `Session ${index}`,
      durationMin,
      isPreview: index === 1,
    };
  });
}
