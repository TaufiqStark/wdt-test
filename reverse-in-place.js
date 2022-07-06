// Reverse in Place

function reverse(word) {
    return word.split(' ').map((w)=>w.split('').reverse().join('')).join(' ');
}
console.log(reverse('what is your name')) // tahw si ruoy eman