// Spell button interaction
document.getElementById('spell-button').addEventListener('click', function() {
    var result = document.getElementById('spell-result');
    result.style.display = 'block'; // Show the hidden message
    // Optional: Change page color for fun
    document.body.style.backgroundColor = '#e74c3c'; // Turns red like fire
    setTimeout(function() {
        document.body.style.backgroundColor = '#2c3e50'; // Reset after 2 seconds
    }, 2000);
});

// Quiz interaction
document.getElementById('quiz-button').addEventListener('click', function() {
    var input = document.getElementById('quiz-input').value.toLowerCase();
    var result = document.getElementById('quiz-result');
    if (input === 'gold') { // Change 'gold' to your preferred answer
        result.textContent = 'Correct! You unlock a chest of treasures!';
        result.style.color = 'gold';
    } else {
        result.textContent = 'Wrong! The dragon hoards gold. Try again!';
        result.style.color = 'red';
    }
    result.style.display = 'block';
});
