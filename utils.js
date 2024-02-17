function getRandomFibonacciNumber() {
    const maxNumber = 8;
    let a = 0;
    let b = 1;
    const randomIndex = Math.floor(Math.random() * maxNumber);

    for (let i = 0; i < randomIndex; i++) {
        const nextNumber = a + b;
        a = b;
        b = nextNumber;
    }

    return a;
}

function simulateTeamPoints(numMembers) {
    let totalPoints = 0;

    for (let i = 0; i < numMembers; i++) {
        const memberPoints = Math.floor(Math.random() * 9);
        totalPoints += memberPoints;
    }

    return totalPoints;
}
