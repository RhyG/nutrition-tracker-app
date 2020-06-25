export const calcRemaining = (max, current) => max - current;

export const calcWidth = (max, current) => (current > max ? 100 : (current / max) * 100);

export const calToKj = (cal) => Math.round(cal * 4.184);

export const kjToCal = (kj) => Math.round(kj * 0.239006);
