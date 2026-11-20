# holbertonhouse-quiz
Take this quiz to find out if you're in Lovelace, Hamilton, Hopper, or Webb!

**Read this after taking the quiz to avoid spoilers!**

Psst, hey. You wanna learn how to make an online quiz with JavaScript? C’mere and I’ll show ya how. All you gotta do is try your best and have fun!

Depending on who you talk to in the programming world, you may have heard JavaScript spoken of in glowing terms or with outright hatred. Honestly, there’s a rationale for both extremes. But you gotta keep in mind that there’s a reason that JavaScript is still so widely used; it gets a lot done and teaches you some core coding concepts that’ll apply to many other languages. Plus, in my totally unbiased opinion, it’s fun and can help you create some really cool things!

This is a web-based JavaScript application written with HTML, CSS, and, of course, JavaScript. It may look like a lot at first if you’re not too familiar with coding programs yet, but it’s honestly pretty straight-forward once you get down to the nitty gritty of it.
The quiz itself is a ‘house quiz’ with multiple-choice questions that’ll guide you to your house. (When I say ‘house’, I mean like a team within a school. Many schools in Australia have these ‘houses’ – most commonly Red, Green, Yellow and Blue House.) The four houses are named after influential women in tech: Webb for Betty Webb (Red), Hamilton for Margaret Hamilton (Green), Hopper for Grace Hopper (Yellow), and Lovelace for Ada Lovelace (Blue). I write a bit more about the personalities and histories behind these houses and their namesakes down below!

If you want a general summary of the JavaScript code, go to the first section. A more thorough tutorial and explanation is in the second section. The final section will be all about the houses and their namesakes.

# General summary
For the sake of transparency, I will say that Copilot helped me with this summary. While proofreading, I added and changed some sentences. This section explains the rationale behind the code without going too into depth about the JavaScript itself.

## 1. House data

The `HOUSES` object stores everything that belongs to a result:

•	Display name

•	Description

•	Pixel image path

•	Quote

Each house uses a stable key like `lovelace`, `hamilton`, `hopper`, or `webb`. Those keys are used throughout the quiz to connect an answer to a house and to retrieve that house’s result content.

Keeping this information in one object avoids duplicating house names, descriptions, images, and quotes. So basically it keeps the code itself a little neater.

## 2. Quiz questions and choices

The `QUESTIONS` array contains each question.
Every question has:
```
{
    text: "...",
    choices: [
        { text: "...", house: "lovelace" },
        ...
    ]
}
```
Each choice stores the house it represents. The visible text is shown to the user, while the house value is used internally when scoring.
This separates presentation from quiz logic: the user sees the choice text, but the program only needs the associated house key to update scores.

## 3. Tiebreaker data

One thing I didn’t think of at first was the edge case of a tie. Even with an odd number of questions, you can still choose the same number of answers for more than one house. The `TIEBREAKER` object defines the extra question used when multiple houses have the same highest score.

The answers are stored by house:
```
answers: {
    lovelace: "Emacs",
    hamilton: "Nano lol",
    ...
}
```

This allows the tiebreaker to display only the tied houses instead of showing choices for every house.

## 4. DOM lookup helper and quiz state

The `$` helper and state variables are used throughout the script:
```
const $ = (id) => document.getElementById(id);
let current = 0;
let scores = {};
$ shortens repeated calls to document.getElementById.
```

`current` tracks which question is currently displayed. It starts at 0 because arrays use zero-based indexing.
`scores` stores the current score for every house, for example:
```
{
    lovelace: 2,
    hamilton: 1,
    hopper: 0,
    webb: 2
}
```
The state is kept outside the functions so all parts of the quiz can access and update it.

## 5. Shuffling answer choices

The `shuffle` function randomizes an array using the Fisher–Yates shuffle algorithm.
```
const shuffled = [...items];
```
The spread operator creates a copy first. This is important because it prevents the original question data from being permanently reordered.

The loop swaps items into random positions. The result is that choices appear in a different order each time a question is rendered, while the connection between each choice and its house remains unchanged.

## 6. Switching between page sections

The `show` function controls which main section is visible:
```
["start", "quiz", "result"].forEach((id) => ($(id).hidden = id !== section));
```

The page has three main sections:

•	start

•	quiz

•	result

Only the requested section is shown. The others receive `hidden = true`.

This keeps the application as a single page instead of navigating to separate HTML files.

## 7. Starting or restarting the quiz

The `startQuiz` function resets the quiz:
```
current = 0;
scores = Object.fromEntries(Object.keys(HOUSES).map((k) => [k, 0]));
```
It resets the question index and creates a score of 0 for every house.

Using `Object.keys(HOUSES)` means the score setup automatically stays synchronized with the available houses. If another house is added later, it will automatically receive a starting score.

The function then switches to the quiz section and displays the first question.

## 8. Rendering a question

The `renderQuestion` function updates the quiz UI for the current question.

It:

1.	Retrieves the current question.
2.	Updates the progress text.
3.	Updates the question text.
4.	Removes any old answer buttons.
5.	Creates new buttons for the current choices.
```
$("choices").replaceChildren(
    ...shuffle(q.choices).map(...)
);
```
`replaceChildren` makes sure buttons from the previous question don’t remain visible.
The function uses `textContent` instead of `innerHTML`. This is safer because the text is inserted as plain text instead of being interpreted as HTML.

Each button gets a click listener:
```
btn.addEventListener("click", () => choose(c.house));
```
The arrow function remembers which house belongs to that choice. This lets the quiz call choose with the correct house when the user clicks.

## 9. Recording an answer

The `choose` function handles a selected answer:
```
scores[house]++;
current++;
```
It increases the selected house’s score and advances to the next question.

If there are more questions, it calls `renderQuestion`. If there aren’t any more questions, it calls `finish`.

This keeps the question progression in one place and prevents button handlers from needing to know how the entire quiz works.

## 10. Finding the winner

The `finish` function determines the highest score:
```
const max = Math.max(...Object.values(scores));
```
It then finds every house with that score:
```
const tied = Object.keys(HOUSES).filter((k) => scores[k] === max);
```
There are two possible outcomes:

•	If one house has the highest score, it shows that house as the result.

•	If multiple houses share the highest score, then it shows the tiebreaker question.

Checking for all houses with the maximum score is necessary because it wouldn’t be fair to just choose a random house based on order rather than your answers. Plus it gives me an opportunity to write the iconic ‘vim or emacs’ question!

## 11. Showing the tiebreaker

The `showTiebreaker` function displays the tiebreaker question.

It uses the tied array so only tied houses appear as choices:
```
...shuffle(tied).map((house) => ...)
```
The choices are shuffled for the same reason as the regular question choices, which is that the first visible option should not have a positional advantage.

Clicking a tiebreaker answer directly calls:
`showResult(house)`

The tiebreaker does not add another score point. Instead, it chooses the house based on the chosen answer. That’s why you don’t see four choices in this question. Only answers for the tied houses are shown. 

## 12. Building the result page

The `showResult` function fills the result section with the winning house’s information.

It updates:

•	The house name

•	The pixel image

•	The image alt text

•	The description

•	The quote

The quote is conditionally hidden if no quote exists:
```
const quote = HOUSES[winner].quote || "";
$("result-quote").hidden = !quote;
```
This allows different houses to have different result content without showing an empty quote box. I had to add this when I was testing because I hadn’t added all the quotes yet.

The result section also receives a data-house attribute:
```
$("result").dataset.house = winner;
```
That attribute is used by CSS to apply house-specific styles, like ribbon colours and description colours. It just looks better when the results are styled by house colours rather than the same boring colour scheme!

## 13. Creating the score breakdown

The result breakdown is generated dynamically with:
```
Object.keys(HOUSES).map(...)
```
For each house, the function creates:

•	A list item

•	The house name

•	Its percentage

•	A progress-bar background

•	A filled bar showing its percentage

The percentage is calculated with:
```
const pct = Math.round((scores[key] / QUESTIONS.length) * 100);
```
The denominator uses the number of regular questions, not the tiebreaker, because the tiebreaker is not a scored question (as explained earlier).

The score bars are created dynamically so the result page always reflects the actual answers rather than using hardcoded percentages.

## 14. Connecting buttons to the quiz

The final two lines register event listeners:
```
$("start-btn").addEventListener("click", startQuiz);
$("restart-btn").addEventListener("click", startQuiz);
```

Both buttons use the same startQuiz function because starting a new quiz and restarting an existing quiz require the same behaviour:

•	Reset the question index

•	Reset scores

•	Show the quiz

•	Render the first question

This avoids duplicating reset logic in two separate event handlers.
