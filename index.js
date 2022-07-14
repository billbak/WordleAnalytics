

'use strict';

/*
    Read the source file from disk, split on newline to get an array of words
*/
const fs = require ('fs');

const contents = fs.readFileSync ('./data/wordle-answers-alphabetical.txt', 'UTF-8');
const words = contents.split ('\n');

/*
    Initialize an array of character counts.  This will receive the total number of
    each letter across all the words in the list.
*/
const characterCounts = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
};


let wordCount = 0;                              // Total number of words
for (let i = 0; i < words.length; i++) {
    wordCount++;
    const word = words[i];
    for (let j = 0; j < word.length; j++) {
        const character = word.charAt (j);      // Pull each letter from the word, increment the count
        characterCounts[character] = characterCounts[character] + 1;
    }
}

// Sort it, for no other reason than printing it later
const sortable = Object.fromEntries (Object.entries (characterCounts).sort (([,a],[,b]) => b-a));
console.log (JSON.stringify (sortable, undefined, 4));

/*
    Normalize the counts by dividing by 100 and rounding down
*/
const letters = Object.keys (sortable);
for (let k = 0; k < letters.length; k++) {
    sortable[letters[k]] = Math.floor((sortable[letters[k]] + 50) / 100);
}
console.log (JSON.stringify (sortable, undefined, 4));

/*
    Function to score a word based on its letters.  To start we're just adding up the
    points of each letter.  We need to improve this; eerie will be the highest scoring
    word.  That's not right, we need to find words that have the most of the high-point
    letters.
*/
const score = (word) => {
    let points = 0;
    for (let i = 0; i < word.length; i++) {
        points += sortable[word.charAt (i)];
    }
    return points;
};

/*
    Loop over the word list and score each word.  Then sort and print the list.
*/
const wordScores = [];
for (let i = 0; i < words.length; i++) {
    wordScores.push ({
        word: words[i],
        score: score (words[i])
    });
}

console.log (JSON.stringify (wordScores.sort ((a,b) => a.score - b.score), undefined, 4));
// console.log (JSON.stringify (sortable, undefined, 4));
