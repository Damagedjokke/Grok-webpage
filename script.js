// Game state variables for battle
let playerHealth = 100;
let dragonHealth = 150;
let potionUses = 1; // Can use once
let battleActive = true;

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
const runeContainer = document.querySelector('.rune-container');

runes.forEach(rune => {
    rune.addEventListener('dragstart', dragStart);
    rune.addEventListener('dragend', dragEnd); // Handle missed drops
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

function dragEnd() {
    // If not dropped in a slot, reset to original container
    if (!this.parentElement || !this.parentElement.classList.contains('slot')) {
        runeContainer.appendChild(this);
        this.style.display = 'block';
    }
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

// Quiz interaction to reveal artifacts and battle
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
    var battleSection = document.getElementById('battle-section');
    if (input === 'gold') {
        result.textContent = 'Correct! You unlock a chest of treasures! Artifacts and battle revealed below.';
        result.style.color = 'gold';
        artifactsSection.style.display = 'block'; // Reveal the artifacts
        artifactsSection.style.opacity = '1'; // For fade-in
        battleSection.style.display = 'block'; // Reveal the battle
        battleSection.style.opacity = '1';
    } else {
        result.textContent = 'Wrong! The dragon hoards gold. Try again!';
        result.style.color = 'red';
    }
    result.style.display = 'block';
}

// Function to update health bars
function updateHealthBars() {
    const playerBar = document.getElementById('player-health');
    const dragonBar = document.getElementById('dragon-health');
    const playerText = document.getElementById('player-health-text');
    const dragonText = document.getElementById('dragon-health-text');
    
    playerBar.value = playerHealth;
    dragonBar.value = dragonHealth;
    playerText.textContent = `${playerHealth}/100`;
    dragonText.textContent = `${dragonHealth}/150`;
    
    if (playerHealth < 30) playerBar.classList.add('low-health');
    else playerBar.classList.remove('low-health');
    
    if (dragonHealth < 45) dragonBar.classList.add('low-health');
    else dragonBar.classList.remove('low-health');
}

// Function to check battle end
function checkBattleEnd() {
    const battleResult = document.getElementById('battle-result');
    if (playerHealth <= 0) {
        battleResult.textContent = 'Defeat! The dragon overwhelms you. Refresh to try again.';
        battleResult.style.color = 'red';
        battleResult.style.display = 'block';
        battleActive = false;
    } else if (dragonHealth <= 0) {
        battleResult.textContent = 'Victory! You slay the dragon and claim the realm!';
        battleResult.style.color = 'gold';
        battleResult.style.display = 'block';
        battleActive = false;
    }
}

// Artifact interactions (now tied to battle)
document.getElementById('sword-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (!battleActive) return;
    
    var effect = document.getElementById('sword-effect');
    const damage = Math.floor(Math.random() * 21) + 10; // 10-30 damage
    dragonHealth -= damage;
    dragonHealth = Math.max(dragonHealth, 0);
    
    effect.textContent = `Sword strike! Deals ${damage} damage to the dragon.`;
    effect.style.display = 'block';
    document.body.classList.add('shake'); // Shake the page
    document.body.style.backgroundColor = '#c0392b'; // Dark red for battle
    
    setTimeout(function() {
        document.body.classList.remove('shake');
        document.body.style.backgroundColor = '#2c3e50'; // Reset
        effect.style.display = 'none';
    }, 1000);
    
    updateHealthBars();
    checkBattleEnd();
    
    if (battleActive) {
        // Dragon counter-attack
        setTimeout(dragonAttack, 1500);
    }
});

function dragonAttack() {
    const damage = Math.floor(Math.random() * 21) + 15; // 15-35 damage
    playerHealth -= damage;
    playerHealth = Math.max(playerHealth, 0);
    
    const battleResult = document.getElementById('battle-result'); // Reuse for temp message
    battleResult.textContent = `Dragon attacks! Deals ${damage} damage to you.`;
    battleResult.style.color = 'red';
    battleResult.style.display = 'block';
    
    setTimeout(() => {
        battleResult.style.display = 'none';
    }, 2000);
    
    updateHealthBars();
    checkBattleEnd();
}

document.getElementById('potion-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (!battleActive || potionUses <= 0) return;
    
    var effect = document.getElementById('potion-effect');
    const heal = 50;
    playerHealth += heal;
    playerHealth = Math.min(playerHealth, 100); // Cap at max
    potionUses--;
    
    effect.textContent = `Potion used! Restores ${heal} health. (${potionUses} left)`;
    effect.style.display = 'block';
    document.body.style.backgroundColor = '#27ae60'; // Green for healing
    
    setTimeout(function() {
        document.body.style.backgroundColor = '#2c3e50'; // Reset
        effect.style.display = 'none';
    }, 1000);
    
    updateHealthBars();
    if (potionUses === 0) {
        this.style.pointerEvents = 'none'; // Disable link
        this.textContent = 'Healing Potion (Used)';
    }
});
