/**
 * Very simple function to cut/format long Strings to use them
 * in components where it doesnt matter if we dont show the whole string required.
 * For example, profile descriptions might be very long and we sometimes only
 * want to display a part of it.
 * 
 * @param {*} str 
 * @param {*} maxLength 
 */
export function cutString(str, maxLength) {
  if(str.length > maxLength) {
    return `${str.slice(0, maxLength)}...`;
  } else {
    return str;
  }
}