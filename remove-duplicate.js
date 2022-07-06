// Remove Duplicate

function removeDuplicate(array){
    return [...new Set(array)];
}
console.log(removeDuplicate([1,3,3,3,1,5,6,7,8,1])) 
// [ 1, 3, 5, 6, 7, 8 ]
