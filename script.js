const HOUSES = {
    lovelace: {
        name: "Lovelace",
        desc: "As a member of the esteemed Lovelace house, you see the music in math and code. You're not held down by barriers between art and science; in fact, you embrace it. Those of the Lovelace house value creativity, innovation, and the importance of teamwork. Go forth and create art through code; make Ada Lovelace proud!",
        image: "img/pixel_lovelace.png",
        quote: "I may remark that the curious transformations many formulae can undergo ... is I think one of the chief difficulties in the early part of mathematical studies. I am often reminded of certain sprites and fairies one reads of, who are at one's elbows in one shape now, and the next minute in a form most dissimilar.",
    },
    hamilton: {
        name: "Hamilton",
        desc: "Members of the Hamilton house such as yourself are not only dedicated to tech, but also incredibly eagle-eyed. You're the one who comes up with the most robust test suites; you're the one who imagines the most useful edge cases. Hamilton house members are also leaders, guiding others towards the stars!",
        image: "img/pixel_hamilton.png",
        quote: "You had to be able to discover a system error in real time when you were flying on a mission. It had to be reliable. It had to not only work, but it had to work the first time. If somebody made a mistake like an astronaut when he's keying in something and it keys in the wrong thing, then you got to save him from that, right?",
    },
    hopper: {
        name: "Hopper",
        desc: "The Hopper house is for those who not only work tirelessly towards functioning code; they also value code that runs efficiently. You strip a program down to its elements to find how best to make it function. You see the whole of things and how harmony between files and layers plays an essential role. Hop to it, Hopper House member!",
        image: "img/pixel_hopper.png",
        quote: "A human must turn information into intelligence or knowledge. We've tended to forget that no computer will ever ask a new question.",
    },
    webb: {
        name: "Webb",
        desc: "Those of the Webb house are among the most reliable of programmers. You prize legible, well-commented code, and you always do what needs to be done, even if it's tedious. When someone doesn't understand a person's work (or their own), you're the one they turn to for help -- because at heart, you're a decoder and lover of puzzles, just like Betty Webb!",
        image: "img/pixel_webb.png",
        quote: "I painstakingly wrote the date and call sign for each message on an index card...I found this rather boring at the time, but realise that all the less interesting tasks were vital because so much intelligence could be deduced from patterns and groupings.",
    },
};

// Questions
const QUESTIONS = [
    {
        text: "You're on campus with free time. How do you spend it (productively)?",
        choices: [
            { text: "Working with a peer on an unfinished coding task", house: "lovelace" },
            { text: "Checking on my repos to clean up merge conflicts", house: "hamilton" },
            { text: "Researching new technologies and frameworks", house: "webb" },
            { text: "Completing coding puzzles on Codewars or LEETcode", house: "hopper" },
        ],
    },
    {
        text: "You're on campus with free time. How do you spend it (not so productively)?",
        choices: [
            { text: "PLDrinks!", house: "lovelace" },
            { text: "Playing video games", house: "hamilton" },
            { text: "Snoozing on the beanbag", house: "webb" },
            { text: "Going out for coffee", house: "hopper" },
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
            { text: "There is such a thing as too many comments", house: "hopper" },
            { text: "Backend is way more interesting than frontend", house: "webb" },
        ],
    },
    {
        text: "What is your main pet peeve when it comes to other people's code?",
        choices: [
            { text: "When it's clearly stolen or vibe-coded", house: "lovelace" },
            { text: "When there's no tests. Why are there literally no tests??", house: "hamilton" },
            { text: "There are very obvious errors and bugs", house: "hopper" },
            { text: "There are no comments. None.", house: "webb" },
        ],
    },
    {
        text: "You're in a job interview. What would you tell the interviewer is your main strength?",
        choices: [
            { text: "My solutions are creative. I love thinking out of the box!", house: "lovelace" },
            { text: "I always keep security as a priority when I develop a program", house: "hamilton" },
            { text: "My passion is efficiency. I never hesitate to refactor code when necessary", house: "hopper" },
            { text: "I'm always reading up on new tech tools and other people's perspectives", house: "webb" },
        ],
    },
    {
        text: "You're in a group preparing for Demo Day. Which role would you volunteer for?",
        choices: [
            { text: "Frontend or UX/UI Designer", house: "lovelace" },
            { text: "Technical Team Leader or Fullstack", house: "hamilton" },
            { text: "Something in backend", house: "hopper" },
            { text: "Whatever needs to be done. I don't really mind", house: "webb" },
        ],
    },
    {
        text: "Someone asks you to write technical documentation. How do you respond?",
        choices: [
            { text: "Good timing, I was just thinking about that!", house: "lovelace" },
            { text: "Why don't we spread the workload and each write one section?", house: "hamilton" },
            { text: "Nah, I'd rather proofread after someone else does it", house: "hopper" },
            { text: "Sure", house: "webb" },
        ],
    },
    {
        text: "What does your LinkedIn profile look like?",
        choices: [
            { text: "An up-to-date photo of me and details about my projects & jobs", house: "lovelace" },
            { text: "The main details of my experience and some articles I've written/reposted", house: "hamilton" },
            { text: "I don't have LinkedIn", house: "hopper" },
            { text: "Just the facts, nothing fancy", house: "webb" },
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
    $("result-image").src = HOUSES[winner].image;
    $("result-image").alt = `${HOUSES[winner].name} pixel art`;
    $("result-desc").textContent = HOUSES[winner].desc;
    const quote = HOUSES[winner].quote || "";
    $("result-quote").textContent = quote;
    $("result-quote").hidden = !quote;
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
