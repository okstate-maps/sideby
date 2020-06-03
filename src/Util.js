import axios from 'axios';

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
  Takes an object and an array of strings representing 
  keys in the object. Deletes the keys and returns the
  modified object.
*/
export function deleteArrayofKeys(object, array) {
  for(var i = 0; i < array.length; i += 1) {
    delete object[array[i]]
  }
  return object
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

export function fetchJson(url) {
  return axios.get(url);
}

//disable eslint to avoid useless escape warning. Not worth testing which escapes can be removed.
// eslint-disable-next-line
export const RegexURL = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[\{\}!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[\{\}!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[\{\}!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[\{\}!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[\{\}!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
