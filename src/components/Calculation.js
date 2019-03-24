function getWindDirectionScore(WWD) {
    if (WWD == 'E') {
        return 5;
    } else if (WWD == 'NE') {
        return 4;
    } else if (WWD == 'SE') {
        return 4;
    } else if (WWD == 'S') {
        return 3;
    } else {
        return 1;
    }
}

function getSwellPeriodScore(SwP) {
    if (SwP < 10) {
        return 1;
    } else if (SwP >= 10 && SwP < 12) {
        return 2;
    } else if (SwP >= 12 && SwP < 16) {
        return 3;
    } else if (SwP >= 16) {
        return 5;
    }
}

function getWaveSizeScore(SwP, SwH) {
    const waveSize = SwP * SwH;
    if (waveSize < 10) {
        return 1;
    } else if (waveSize > 10 && waveSize <= 19) {
        return 2;
    } else if (waveSize > 19 && waveSize <= 24) {
        return 3;
    } else if (waveSize > 24 && waveSize <= 30) {
        return 4;
    } else if (waveSize > 30) {
        return 5;
    }
}

export { getWindDirectionScore, getWaveSizeScore, getSwellPeriodScore }