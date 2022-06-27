"use strict";

async function getFact(number) {
    const factJson = await axios.get(`http://numbersapi.com/${number}/math?json`);
    const text = factJson.data.text;
    return text
}


async function displayFact() {
    const fact = await getFact(5);
    $("#facts").append(fact);
}

async function displayMultipleFacts() {
    const fact_5 = getFact(5);
    const fact_4 = getFact(4);
    const facts = await Promise.all([fact_5,fact_4])

    for(let fact of facts) {
        $("#facts").append(fact);
        $("#facts").append('<br>');
    }
}

async function displayFourFacts(luckyNumber) {
    const fact1 = getFact(luckyNumber);
    const fact2 = getFact(luckyNumber);
    const fact3 = getFact(luckyNumber);
    const fact4 = getFact(luckyNumber);
    const facts = await Promise.all([fact1, fact2, fact3, fact4]);

    for (let fact of facts) {
        $("#facts").append(fact);
        $("#facts").append('<br>');
    }
}

displayFourFacts(4);