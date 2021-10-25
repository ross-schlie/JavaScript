/**
 * Compute Pascal's Triangle up to a given number of rows.
 *
 * @param {Number} numRows The number of rows to compute.
 * @returns {Array} Pascal's Triangle for the given number of rows.
 */
export const rows = (numRows) => {
  if (numRows === 0) {
    return [];
  } else if (numRows === 1) {
    return [[1]];
  }

  // get the rows 'above'
  const pascalsTriangles = rows(numRows - 1);
  const previousRow = pascalsTriangles[pascalsTriangles.length - 1];

  // find the middle point, and insert a new entry
  let centerIndex = Math.floor(previousRow.length / 2)
  const newRow = [...previousRow.slice(0, centerIndex), previousRow[centerIndex], ...previousRow.slice(centerIndex)];

  // iterate over the values in the row and
  // add up the entry before and at the 'current' index of the row above (if they exist)
  let sum = 0;
  for (let i = 0; i < newRow.length; i++) {
    sum = 0;
    if (i > 0) {
      sum += previousRow[i - 1];
    }

    if (i < previousRow.length) {
      sum += previousRow[i];
    }

    newRow[i] = sum;
  }

  pascalsTriangles.push(newRow);
  return pascalsTriangles;
};
