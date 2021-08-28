let guess_counter = 0;

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-div').classList.add('d-none')
    document.getElementById('game-container').classList.remove('d-none')
    document.getElementById('ask-replay-div').classList.add('d-none')
    guess_counter = 0;
    document.getElementById('guess-button').removeAttribute('disabled');
    clearMessage();
})


const getRandomNumber = (max = 6) => Math.floor(Math.random() * max + 1)

document.getElementById('guess-button').addEventListener('click', async () => {
    let guessElement = document.getElementById('guess-input')
    let guessValue = guessElement.value;

    const randomNumber = getRandomNumber()

    const resultDetails = {
        message: '',
        points: 'Not Applicable',
        guessValue: guessValue,
        randomNumber: randomNumber,
    }

    const promise = new Promise((resolve, reject) => {
        if (!guessValue) {
            resultDetails.message = 'Input is Empty'
            reject(resultDetails);
        }
        else if (guessValue < 1 || guessValue > 6) {
            resultDetails.message = 'Input is out of range'
            reject(resultDetails);
        }
        else if (guessValue == randomNumber) {
            resultDetails.message = 'Congratulations!!. '
            resultDetails.points = 2;
            resolve(resultDetails)
        }
        else if (Math.abs(guessValue - randomNumber) < 2) {
            resultDetails.message = 'So Close. '
            resultDetails.points = 1;
            resolve(resultDetails)
        }
        else {
            resultDetails.message = 'Not Close. '
            resultDetails.points = 0;
            reject(resultDetails)
        }
    })

    try {
        let output = await promise;

        let successElement = document.getElementById('success')
        successElement.innerHTML = `
                Your Input: ${output.guessValue}, <br>
                Random Number: ${output.randomNumber} <br>
                ${output.message} <br>
                You got: ${output.points} Points. 
            `
        updateMessageContainer(false, false, true);
    }
    catch (error) {

        // points may be 0 for valid input or Not Applicable for invalid input
        if (error.points == 0) {
            let infoElement = document.getElementById('info')
            infoElement.innerHTML = `
                Your Input: ${error.guessValue}, <br>
                Random Number: ${error.randomNumber} <br>
                ${error.message} <br>
                You got: ${error.points} Points. 
            `
            updateMessageContainer(true, false, false);
        }

        if (error.points == 'Not Applicable') {
            let errorElement = document.getElementById('error')
            errorElement.innerText = error.message;
            updateMessageContainer(false, true, false);
        }
    }

    guessElement.value = '';
    guess_counter++;
    if (guess_counter % 5 == 0) {
        document.getElementById('guess-button').setAttribute('disabled', true);
        setTimeout(()=> {
            askReplay(guess_counter);
        }, 2000);
    }
})

function updateMessageContainer(info, error, success) {
    if (info) {
        document.getElementById('info').classList.remove('d-none')
        document.getElementById('error').classList.add('d-none')
        document.getElementById('success').classList.add('d-none')
    }
    if (error) {
        document.getElementById('info').classList.add('d-none')
        document.getElementById('error').classList.remove('d-none')
        document.getElementById('success').classList.add('d-none')
    }
    if (success) {
        document.getElementById('info').classList.add('d-none')
        document.getElementById('error').classList.add('d-none')
        document.getElementById('success').classList.remove('d-none')
    }
}


function showStartPage() {
    document.getElementById('start-div').classList.remove('d-none')
    document.getElementById('game-container').classList.add('d-none')
    document.getElementById('ask-replay-div').classList.add('d-none')
}

function showGamePage() {
    document.getElementById('start-div').classList.add('d-none')
    document.getElementById('game-container').classList.remove('d-none')
    document.getElementById('ask-replay-div').classList.add('d-none')
}

function showReplayDiv() {
    document.getElementById('start-div').classList.add('d-none')
    document.getElementById('game-container').classList.add('d-none')
    document.getElementById('ask-replay-div').classList.remove('d-none')
}

function askReplay(guessCounter) {
    document.getElementById('times').innerText = guessCounter;
    showReplayDiv();
}

document.getElementById('yes').addEventListener('click', () => {
    showGamePage();
    document.getElementById('guess-button').removeAttribute('disabled');
    clearMessage();
})

document.getElementById('no').addEventListener('click', () => {
    showStartPage();
})

function clearMessage(){
    document.getElementById('info').classList.add('d-none')
    document.getElementById('error').classList.add('d-none')
    document.getElementById('success').classList.add('d-none')
}