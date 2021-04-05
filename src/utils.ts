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
export function compareTwoWay(ways: { i: number; j: number }[], pointers: { i: number; j: number }[]): boolean {
  for (let i = 0; i < pointers.length; i++) {
    for (let j = 1; j < ways.length - 1; j++) {
      if (
        compareElement(pointers[i], ways[j]) &&
        !compare(ways[0], pointers) &&
        !compare(ways[ways.length - 1], pointers)
      ) {
        return true;
      }
    }
  }
  return false;
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

export function compareA(pointerB: { i: number; j: number }, pointerA: { i: number; j: number }[][]): boolean {
  // console.warn(pointerB);
  // console.warn(pointerA);
  for (let j = 0; j < pointerA.length; j++) {
    for (let i = 0; i < pointerA[j].length; i++) {
      if (pointerB.i === pointerA[j][i].i && pointerB.j === pointerA[j][i].j) {
        return true;
      }
    }
  }
  return false;
}
export function compareElement(pointerB: { i: number; j: number }, pointerA: { i: number; j: number }): boolean {
  // console.warn(pointerB);
  // console.warn(pointerA);

  if (pointerB.i === pointerA.i && pointerB.j === pointerA.j) {
    return true;
  }

  return false;
}
