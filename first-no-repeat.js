// First non repeating char

function character(word){
    const res = {};
    word.replaceAll(' ', '').split('').forEach(w => {
        if(res.hasOwnProperty(w))res[w]++
        else res[w] = 0
        
    });
    noRepeat = Object.entries(res).filter(([key, val])=>val == 0? key : '')
    return noRepeat[0][0];
}
console.log(character('the quick brown fox jumps then quickly blow air')) // f