
// DOM Elements
const leaderboardBody = document.getElementById('leaderboard-body');
const refreshBtn = document.getElementById('refresh-leaderboard');
const shareBtn = document.getElementById('share-score');
const showSubmitFormBtn = document.getElementById('show-submit-form');
const submitForm = document.getElementById('submit-score-form');
const submitBtn = document.getElementById('submit-score-btn');
const toastElement = document.getElementById('toast');
//high_score

let High_score
if (localStorage.getItem("High_score")) {
    High_score = localStorage.getItem("High_score")


    let High_score_Value = document.getElementById("High_score")

    High_score_Value.innerText = High_score
}
else {
    High_score = 0// deflat 
}



// Function to show toast notification
function showToast(message, type = 'success', duration = 3000) {
    toastElement.textContent = message;
    toastElement.className = 'toast';
    toastElement.classList.add(type);
    toastElement.classList.add('show');

    setTimeout(() => {
        toastElement.classList.remove('show');
    }, duration);
}

// Function to fetch leaderboard data from backend
async function fetchLeaderboard() {
    try {
        leaderboardBody.innerHTML = '<tr><td colspan="4">Loading leaderboard...</td></tr>';
        refreshBtn.innerHTML = '<div class="loading"></div> Refreshing';
        refreshBtn.disabled = true;
        let response = await fetch('https://pok-seek.onrender.com/getdata');
        if (!response.ok) {
            throw new Error("404");
        }
        let data = await response.json();
        console.log(data);

        populateLeaderboard(data);
        showToast('Leaderboard updated!');
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        leaderboardBody.innerHTML = '<tr><td colspan="4">Failed to load leaderboard. Please try again.</td></tr>';
        showToast('Failed to load leaderboard', 'error');

        populateLeaderboard({
            arr: [
                { "name": "Rishabh", "score": 9999, "date": "2025-05-19", rank: 1 },
                { "name": "Raiplus", "score": 9999, "date": "2025-05-17", rank: 2 },
                { "name": "Raj", "score": 9998, "date": "2025-05-23", rank: 3 },
                { "name": "Ashu", "score": 8120, "date": "2025-05-14", rank: 4 },
                { "name": "Dks", "score": 7210, "date": "2025-05-22", rank: 5 },
                { "name": "Hariom", "score": 6210, "date": "2025-05-22", rank: 6 },
                { "name": "abishak", "score": 5210, "date": "2025-05-22", rank: 7 },
                { "name": "ahsu5", "score": 4210, "date": "2025-05-22", rank: 8 },
                { "name": "Raj3", "score": 3210, "date": "2025-05-22", rank: 9 },
                { "name": "Dawn", "score": 2210, "date": "2025-05-22", rank: 10 }
            ]
        });

        console.log('Using fallback data');
    } finally {
        refreshBtn.innerHTML = 'Refresh';
        refreshBtn.disabled = false;
    }
}



// Function to populate the leaderboard with data
function populateLeaderboard(data) {
    leaderboardBody.innerHTML = '';


    if (data.arr.length === 0) {
        leaderboardBody.innerHTML = '<tr><td colspan="4">No scores yet. Be the first to submit!</td></tr>';
        return;
    }

    data.arr.forEach(player => {
        const row = document.createElement('tr');

        // Add special class for top 3 ranks
        if (player.rank <= 3) {
            row.classList.add('top-3');
        }

        row.innerHTML = `
            <td class="rank rank-${player.rank}">${player.rank}</td>
            <td class="player-name">${player.name}</td>
            <td class="score">${player.score.toLocaleString()}</td>
            <td class="date">${player.date}</td>
        `;

        leaderboardBody.appendChild(row);
    });
}


// Function to submit a score to the backend
async function submitScore(name, score) {
    try {
        submitBtn.innerHTML = '<div class="loading"></div> Submitting';
        submitBtn.disabled = true;
        try {
            let data = { name: name, score: score };
            let response = await fetch('https://pok-seek.onrender.com/AmION10', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            let resData = await response.json();
            console.log(resData);
        } catch (err) {
            console.log(err);
        }
    } finally {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Score';
        submitBtn.innerText = "Submitted"
        setTimeout(() => { submitBtn.disabled = false; }, 4000)
        setTimeout(() => { fetchLeaderboard() }, 500)
    }
}

// Function to share the leaderboard or user's score
async function shareContent() {
    let High_score
    if (localStorage.getItem("High_score")) {
        High_score = localStorage.getItem("High_score")

    }
    else {
        High_score = 0// deflat 
    }

    await navigator.share({
        title: 'PokéSeek Leaderboard',
        text: `Check out the PokéSeek leaderboard! My high score is ${High_score}. Can you beat it?`,
        url: window.location.href,
    })
        .then(() => showToast('Shared successfully!'))
        .catch((error) => {
            console.error('Error sharing:', error);
            showToast('Share cancelled', 'error');
        });


}

// Event Listeners
refreshBtn.addEventListener('click', () => {
    console.log("ref");
    fetchLeaderboard();
});

shareBtn.addEventListener('click', () => {
    console.log("share");
    shareContent();
});


showSubmitFormBtn.addEventListener('click', () => {
    submitForm.style.display = 'block';


});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById("player-name").value.trim()
    const score = parseInt(document.getElementById("player-score").value.trim())

    if (!name) {
        showToast('Please enter your name', 'error');
        return;
    }

    if (isNaN(score)) {
        showToast('Please enter a valid score', 'error');
        return;
    }

    submitScore(name, score);
});

// Initialize the leaderboard when the page loads
document.addEventListener('DOMContentLoaded', () => {


    fetchLeaderboard();
    (()=>{
         populateLeaderboard({
            arr: [
                { "name": "Rishabh", "score": 9999, "date": "2025-05-19", rank: 1 },
                { "name": "Raiplus", "score": 9999, "date": "2025-05-17", rank: 2 },
                { "name": "Raj", "score": 9998, "date": "2025-05-23", rank: 3 },
                { "name": "Ashu", "score": 8120, "date": "2025-05-14", rank: 4 },
                { "name": "Dks", "score": 7210, "date": "2025-05-22", rank: 5 },
                { "name": "Hariom", "score": 6210, "date": "2025-05-22", rank: 6 },
                { "name": "abishak", "score": 5210, "date": "2025-05-22", rank: 7 },
                { "name": "ahsu5", "score": 4210, "date": "2025-05-22", rank: 8 },
                { "name": "Raj3", "score": 3210, "date": "2025-05-22", rank: 9 },
                { "name": "Dawn", "score": 2210, "date": "2025-05-22", rank: 10 }
            ]
        });
    })()
    setInterval(fetchLeaderboard, 120000);  // ek hi baar interval lagao
});



