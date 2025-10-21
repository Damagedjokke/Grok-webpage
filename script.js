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

// Drag-and-drop logic for runes
const runes = document.querySelectorAll('.rune');
const slots = document.querySelectorAll('.slot');

runes.forEach(rune => {
    rune.addEventListener('dragstart', dragStart);
});

slots.forEach(slot => {
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('dragenter', dragEnter);
    slot.addEventListener('dragleave', dragLeave);
    slot.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => this.style.display = 'none', 0); // Hide while dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function dragLeave() {
    this.classList.remove('drag-over');
}

function drop(e) {
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    
    // Remove from previous slot if any
    slots.forEach(s => {
        if (s.contains(draggable)) {
            s.innerHTML = 'Drop here';
        }
    });
    
    // Append to this slot
    this.innerHTML = '';
    this.appendChild(draggable);
    draggable.style.display = 'block';
    this.classList.remove('drag-over');
}

// Puzzle check button
document.getElementById('check-puzzle').addEventListener('click', function() {
    const slot1Content = document.getElementById('slot1').firstChild ? document.getElementById('slot1').firstChild.id : null;
    const slot2Content = document.getElementById('slot2').firstChild ? document.getElementById('slot2').firstChild.id : null;
    const slot3Content = document.getElementById('slot3').firstChild ? document.getElementById('slot3').firstChild.id : null;
    
    var result = document.getElementById('puzzle-result');
    var quizSection = document.getElementById('quiz-section');
    
    if (slot1Content === 'rune2' && slot2Content === 'rune3' && slot3Content === 'rune1') { // Water, Earth, Fire
        result.textContent = 'Correct! The runes align... The dragon\'s riddle is revealed!';
        result.style.color = 'gold';
        quizSection.style.display = 'block'; // Reveal the quiz section
        quizSection.style.opacity = '1'; // For fade-in
    } else {
        result.textContent = 'Wrong arrangement! Try again—balance the elements.';
        result.style.color = 'red';
    }
    result.style.display = 'block';
});

// Quiz interaction to reveal artifacts
const quizInput = document.getElementById('quiz-input');
quizInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkQuiz();
    }
});

document.getElementById('quiz-button').addEventListener('click', checkQuiz);

function checkQuiz() {
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
}

// New: Artifact interactions
document.getElementById('sword-link').addEventListener('click', function(e) {
    e.preventDefault();
    var effect = document.getElementById('sword-effect');
    effect.textContent = 'You strike down shadows! Slash!';
    effect.style.display = 'block';
    document.body.classList.add('shake'); // Shake the page
    document.body.style.backgroundColor = '#c0392b'; // Dark red for battle
    setTimeout(function() {
        document.body.classList.remove('shake');
        document.body.style.backgroundColor = '#2c3e50'; // Reset
        effect.style.display = 'none'; // Hide after use (or keep if you want reusable)
    }, 1500);
});

document.getElementById('potion-link').addEventListener('click', function(e) {
    e.preventDefault();
    var effect = document.getElementById('potion-effect');
    effect.textContent = 'Health restored—feel the magic flow!';
    effect.style.display = 'block';
    document.body.style.backgroundColor = '#27ae60'; // Green for healing
    setTimeout(function() {
        document.body.style.backgroundColor = '#2c3e50'; // Reset
        effect.style.display = 'none'; // Hide after use
    }, 1500);
});
