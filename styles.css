// Spell button interaction (unchanged, for fun)
document.getElementById('spell-button').addEventListener('click', function() {
    var result = document.getElementById('spell-result');
    result.style.display = 'block'; // Show the hidden message
    // Optional: Change page color for fun
    document.body.style.backgroundColor = '#e74c3c'; // Turns red like fire
    setTimeout(function() {
        document.body.style.backgroundColor = '#2c3e50'; // Reset after 2 seconds
    }, 2000);
});

// Puzzle interaction to reveal quiz
document.getElementById('puzzle-button').addEventListener('click', function() {
    var input = document.getElementById('puzzle-input').value.toLowerCase();
    var result = document.getElementById('puzzle-result');
    var quizSection = document.getElementById('quiz-section');
    if (input === 'echo') {
        result.textContent = 'Correct! The winds whisper secrets... The dragon\'s riddle is revealed!';
        result.style.color = 'gold';
        quizSection.style.display = 'block'; // Reveal the quiz section
        quizSection.style.opacity = '1'; // For fade-in
    } else {
        result.textContent = 'Wrong! Listen to the winds again. Try another answer!';
        result.style.color = 'red';
    }
    result.style.display = 'block';
});

// Quiz interaction to reveal artifacts
document.getElementById('quiz-button').addEventListener('click', function() {
    var input = document.getElementById('quiz-input').value.toLowerCase();
    var result = document.getElementById('quiz-result');
    var artifactsSection = document.getElementById('artifacts-section');
    if (input === 'gold') {
        result.textContent = 'Correct! You unlock a chest of treasures! Artifacts revealed below.';
        result.style.color = 'gold';
        artifactsSection.style.display = 'block'; // Reveal the artifacts
        artifactsSection.style.opacity = '1'; // For fade-in
    } else {
        result.textContent = 'Wrong! The dragon hoards gold. Try again!';
        result.style.color = 'red';
    }
    result.style.display = 'block';
});
