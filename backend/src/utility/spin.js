import MersenneTwister from 'mersenne-twister'


const symbols = {
    1: { "prob": 0.26, "winMul": { 2: 3.5, 3: 6, 4: 9.5, 5: 13.5 } },
    2: { "prob": 0.26, "winMul": { 2: 3.5, 3: 6, 4: 9.5, 5: 13.5 } },
    3: { "prob": 0.10, "winMul": { 2: 5.5, 3: 10, 4: 15, 5: 20 } },
    4: { "prob": 0.08, "winMul": { 2: 8.5, 3: 13, 4: 18.5, 5: 25.5 } },
    5: { "prob": 0.30, "winMul": { 2: 2, 3: 4, 4: 7.5, 5: 10.5 } }
}

function selectSymbol(symbols, randomNumber) {
    let cumulativeProb = .0

    for (let symbol in symbols) {
        cumulativeProb += symbols[symbol].prob

        if (randomNumber <= cumulativeProb)
            return Number(symbol)
    }
}

function getWinMul(reels, symbol, data) {
    let winMul = 1

    for (let i = 1; i < reels.length; i++) {
        if (reels[i] !== symbol)
            return winMul in data ? data[winMul] : 0

        winMul++
    }

    return data[winMul]
}

function evalWin(reels, symbols, fee) {
    return fee * getWinMul(reels, reels[0], symbols[reels[0]].winMul)
}

export default async function spin(fee) {
    const mt = new MersenneTwister()
    let reels = []
    
    for (let i = 5; i !== 0; --i)
        reels.push(selectSymbol(symbols, mt.random()))

    return [reels, evalWin(reels, symbols, fee)]
}