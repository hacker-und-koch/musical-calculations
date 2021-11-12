export interface MeasuresToTimeOpts {
  bars: number;
  bpm: number;
  beatsPerMeasure: number;
}

/**
 *
 * 1 MINUTE    4 BEATS     120 MEASURES
 * ––––––––– x ––––––––– x –––––––––––– = 4 MINUTES
 * 120 BEATS   1 MEASURE   1
 */
export function measuresToTime(opts: MeasuresToTimeOpts): number {
  console.log('in util!', opts);
  const minutes = (1 / opts.bpm) * opts.beatsPerMeasure * opts.bars;
  return minutes * 60 * 1e3;
}

export interface StepToTimeOpts {
  step: number;
  bpm: number;
}
/**
 *
 * 1 MEASURES   1 MINUTE    60 SECONDS   1000 MS    4 BEATS
 * –––––––––– x ––––––––– x –––––––––– x –––––––– x –––––––––– = 500MS
 * 4            120 BEATS   1 MINUTE     1 SECOND   1 MEASURES
 *
 * 1 MEASURES   1 MINUTE    60 SECONDS   1000 MS    4 BEATS
 * –––––––––– x ––––––––– x –––––––––– x –––––––– x –––––––––– = 250MS
 * 8            120 BEATS   1 MINUTE     1 SECOND   1 MEASURES
 *
 */
export function stepToTime(opts: StepToTimeOpts): number {
  return opts.step * (1 / opts.bpm) * 60 * 1e3 * 4;
}
