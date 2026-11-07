const HOUSES = {
    lovelace: { name: "Lovelace", desc: "Placeholder description for Lovelace." },
    hamilton: { name: "Hamilton", desc: "Placeholder description for Hamilton." },
    hopper: { name: "Hopper", desc: "Placeholder description for Hopper." },
    webb: { name: "Webb", desc: "Placeholder description for Webb." },
};

// Questions
const QUESTIONS = [
    {
        text: "You're on campus with free time. How do you spend it (productively)?",
        choices: [
            { text: "Working with a peer on an unfinished coding task", house: "lovelace" },
            { text: "Checking on my repos to clean up merge conflicts", house: "hamilton" },
            { text: "Researching new technologies and frameworks", house: "hopper" },
            { text: "Completing coding puzzles on Codewars or LEETcode", house: "webb" },
        ],
    },
    {
        text: "You're on campus with free time. How do you spend it (not so productively)?",
        choices: [
            { text: "PLDrinks!", house: "lovelace" },
            { text: "Playing video games", house: "hamilton" },
            { text: "Snoozing on the beanbag", house: "hopper" },
            { text: "Going out for coffee", house: "webb" },
        ],
    },
    {
        text: "Which of these projects interest you the most?",
        choices: [
            { text: "Developing a video game of some kind", house: "lovelace" },
            { text: "Programming with microcontrollers", house: "hamilton" },
            { text: "Creating a compiler or interpreter", house: "hopper" },
            { text: "Coding a personal website", house: "webb" },
        ],
    },
    {
        text: "If you couldn't work in tech, what profession would you enter?",
        choices: [
            { text: "Something scientific, like a lab technician", house: "lovelace" },
            { text: "Something explorative, like a pilot", house: "hamilton" },
            { text: "Something to do with maths, like a mathematician", house: "hopper" },
            { text: "Something to do with design, like an engineer", house: "webb" },
        ],
    },
    {
        text: "Which hot take do you agree with the most?",
        choices: [
            { text: "Javascript is great and hating it is a skill issue", house: "lovelace" },
            { text: "The AI bubble is gonna burst, badly", house: "hamilton" },
            { text: "The intranet checkers are helpful, TURN THEM BACK ON", house: "hopper" },
            { text: "Backend is way more interesting than frontend", house: "webb" },
        ],
    },
];

// Shown only on a tie. Answers appear for just the tied houses.
const TIEBREAKER = {
    text: "Vim or emacs?",
    answers: {
        lovelace: "Emacs",
        hamilton: "Nano lol",
        hopper: "Vim",
        webb: "I don't really mind!",
    },
};

const $ = (id) => document.getElementById(id);
let current = 0;
let scores = {};

function shuffle(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function show(section) {
    ["start", "quiz", "result"].forEach((id) => ($(id).hidden = id !== section));
}

function startQuiz() {
    current = 0;
    scores = Object.fromEntries(Object.keys(HOUSES).map((k) => [k, 0]));
    show("quiz");
    renderQuestion();
}

function renderQuestion() {
    const q = QUESTIONS[current];
    $("progress").textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
    $("question").textContent = q.text;
    $("choices").replaceChildren(
        ...shuffle(q.choices).map((c) => {
            const btn = document.createElement("button");
            btn.textContent = c.text;
            btn.addEventListener("click", () => choose(c.house));
            return btn;
        })
    );
}

function choose(house) {
    scores[house]++;
    current++;
    if (current < QUESTIONS.length) renderQuestion();
    else finish();
}

function finish() {
    const max = Math.max(...Object.values(scores));
    const tied = Object.keys(HOUSES).filter((k) => scores[k] === max);
    if (tied.length > 1) showTiebreaker(tied);
    else showResult(tied[0]);
}

// One extra question with one choice per tied house.
function showTiebreaker(tied) {
    $("progress").textContent = "Tiebreaker!";
    $("question").textContent = TIEBREAKER.text;
    $("choices").replaceChildren(
        ...shuffle(tied).map((house) => {
            const btn = document.createElement("button");
            btn.textContent = TIEBREAKER.answers[house];
            btn.addEventListener("click", () => showResult(house));
            return btn;
        })
    );
}

function showResult(winner) {
    $("result-name").textContent = HOUSES[winner].name;
    $("result-desc").textContent = HOUSES[winner].desc;
    $("result-breakdown").replaceChildren(
        ...Object.keys(HOUSES).map((key) => {
            const li = document.createElement("li");
            const pct = Math.round((scores[key] / QUESTIONS.length) * 100);
            li.dataset.house = key;
            const label = document.createElement("span");
            label.textContent = `${HOUSES[key].name}: ${pct}%`;
            const bar = document.createElement("div");
            bar.className = "bar";
            const fill = document.createElement("div");
            fill.className = "bar-fill";
            fill.style.width = `${pct}%`;
            bar.append(fill);
            li.append(label, bar);
            return li;
        })
    );
    $("result").dataset.house = winner;
    show("result");
}

$("start-btn").addEventListener("click", startQuiz);
$("restart-btn").addEventListener("click", startQuiz);
