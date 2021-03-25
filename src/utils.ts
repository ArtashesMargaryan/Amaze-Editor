export function compareSearch(ways: { i: number; j: number }[][], pointers: { i: number; j: number }[]): number {
  for (let i = 0; i < pointers.length; i++) {
    for (let j = 1; j < ways.length - 1; j++) {
      if (compare(pointers[i], ways[j])) {
        return j;
      }
    }
  }
  return -1;
}

export function searchCompare(pointerB: { i: number; j: number }, pointerA: { i: number; j: number }[]): number {
  // console.warn(pointerB);
  // console.warn(pointerA);

  for (let i = 0; i < pointerA.length; i++) {
    if (pointerB.i === pointerA[i].i && pointerB.j === pointerA[i].j) {
      return i;
    }
  }
  return -1;
}

export function compare(pointerB: { i: number; j: number }, pointerA: { i: number; j: number }[]): boolean {
  // console.warn(pointerB);
  // console.warn(pointerA);

  for (let i = 0; i < pointerA.length; i++) {
    if (pointerB.i === pointerA[i].i && pointerB.j === pointerA[i].j) {
      return true;
    }
  }
  return false;
}
