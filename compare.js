// Compare the Triplets

function compare(a, b){
    let res = [0,0];
    for (let i = 0; i < a.length; i++) {
        if(a[i] == b[i]) continue
        if(a[i] > b[i]) res[0]++
        else res[1]++
    }
    return res;
}
const a = [5, 6, 7];
const b = [3, 6, 10];
console.log(...compare(a,b)) // 1 1