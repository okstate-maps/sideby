/*
*  Takes an array of objects and returns the index 
*  of the member with the supplied attribute value.
*  If not found, returns -1.
*/
export function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

/*
*	Moves items within an array. From and to arguments
*   Represent the index numbers. Returns nothing, as 
*   it modifies the array in place.
*/
export function moveWithinArray(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

export function compareArrays(array1, array2) {
	var arraysAreEqual = true;
	for (var i = array1.length; i--;){
		if (array1[i] !== array2[i]) {
			arraysAreEqual = false;
		}
	}
	return arraysAreEqual;
}