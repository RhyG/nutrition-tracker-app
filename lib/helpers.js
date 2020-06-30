export const calcRemaining = (max, current) => max - current;

export const calcWidth = (max, current) => (current > max ? 100 : (current / max) * 100);

export const calcHeight = (max, current) => (current > max ? 100 : (current / max) * 100);

export const calToKj = (cal) => Math.round(cal * 4.184);

export const kjToCal = (kj) => Math.round(kj * 0.239006);

export const getCurrentCalories = (arr = []) => arr.reduce((acc, curr) => acc + Number(curr.calories), 0);

export const getCurrentProtein = (arr = []) => arr.reduce((acc, curr) => acc + Number(curr.protein), 0);

export const isInputNumber = (value) => value === "" || /^[0-9\b]+$/.test(value);
