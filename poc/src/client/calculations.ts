/**
 * 
 * 1 MINUTE    4 BEATS     120 MEASURES
 * ––––––––– x ––––––––– x –––––––––––– = 4 MINUTES
 * 120 BEATS   1 MEASURE   1 
 */
export function measuresToTime(opts: { measures: number, bpm: number, beats_per_measure: number }): number {
    const minutes = (1/opts.bpm) * opts.beats_per_measure * opts.measures;
    return minutes * 60 * 1e3;
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
 * */
export function stepToTime(opts: { step: number, bpm: number }): number {
    return opts.step * (1 / opts.bpm) * 60 * 1e3 * 4;
}
