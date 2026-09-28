/**
 * The 14 fully written lessons from the approved demo (docs/nextntech-demo-v3-1.jsx),
 * converted to structured blocks. Inline markup: **bold**, *italic*, `code`.
 */
import type { SeedLesson } from "./types";

// ───────────────────────── Front-End ─────────────────────────

export const htmlSkeleton: SeedLesson = {
  slug: "html-the-skeleton-of-every-website",
  title: "HTML: The Skeleton of Every Website",
  body: [
    {
      type: "paragraph",
      text: "Every website you have ever visited — YouTube, your school's page, this one — is built on **HTML** (HyperText Markup Language). Think of a website as a human body:",
    },
    { type: "visual", name: "WebTrio" },
    {
      type: "paragraph",
      text: "HTML was invented in **1991 by Tim Berners-Lee**, a scientist who wanted researchers to share documents easily. The first version had only ~18 tags; today's HTML5 has over 100 — but you only need a handful to start. Old tags like `<font>` and `<center>` retired long ago; modern tags like `<video>` and `<section>` replaced them.",
    },
    { type: "paragraph", text: "Tags come in pairs — here is the anatomy of one:" },
    { type: "visual", name: "TagAnatomy" },
    {
      type: "code",
      language: "html",
      code: "<h1>Hello, world!</h1>\n<p>My first web page 🎉</p>\n<ul>\n  <li>I am learning HTML</li>\n</ul>",
    },
  ],
  playground: {
    type: "html",
    title: "Write your first HTML",
    hint: "Change the text, add another <li>, or try an <h2>. The preview updates as you type.",
    starter:
      "<h1>Hello, world!</h1>\n<p>My name is <b>Zahra</b> and I am learning HTML!</p>\n<ul>\n  <li>My first tag ✅</li>\n  <li>Add another list item here…</li>\n</ul>",
  },
  quiz: [
    {
      prompt: "What does HTML stand for?",
      options: ["HyperText Markup Language", "HighTech Modern Language", "Home Tool Markup Language"],
      answerIdx: 0,
      explain: "HTML = HyperText Markup Language. It gives a web page its structure.",
    },
    {
      prompt: "Which tag makes the BIGGEST heading?",
      options: ["<h6>", "<h1>", "<heading>"],
      answerIdx: 1,
      explain: "<h1> is the largest heading; they go from <h1> (biggest) to <h6> (smallest).",
    },
    {
      prompt: "Who invented HTML and the Web?",
      options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs"],
      answerIdx: 1,
      explain: "Tim Berners-Lee created HTML and the Web in 1991 at CERN.",
    },
  ],
};

export const cssDressing: SeedLesson = {
  slug: "css-dressing-your-page",
  title: "CSS: Dressing Your Page",
  body: [
    {
      type: "paragraph",
      text: "**CSS** (Cascading Style Sheets) is the clothes of the web. HTML says *what* is on the page; CSS says *how it looks* — colors, fonts, sizes, and where things sit.",
    },
    {
      type: "paragraph",
      text: "The most important idea in CSS is the **box model**: every element is a box wrapped in three layers of space.",
    },
    { type: "visual", name: "BoxModel" },
    {
      type: "code",
      language: "css",
      code: "p {\n  color: #16337F;      /* text color */\n  padding: 12px;       /* space inside */\n  border: 3px solid gold;\n  margin: 20px;        /* space outside */\n}",
    },
    {
      type: "paragraph",
      text: "A CSS rule has a **selector** (which elements?) and **properties** (what changes?). Try it below.",
    },
  ],
  playground: {
    type: "html",
    title: "Style a box with CSS",
    hint: "Change the color, background, border or padding — watch the box transform live.",
    starter:
      '<style>\n  .mybox {\n    color: white;\n    background: #16337F;\n    padding: 20px;\n    border: 4px solid #F5A524;\n    border-radius: 16px;\n    font-size: 20px;\n  }\n</style>\n\n<div class="mybox">I am a styled box! 🎨</div>',
  },
  quiz: [
    {
      prompt: "What does CSS stand for?",
      options: ["Creative Style System", "Cascading Style Sheets", "Computer Styled Sections"],
      answerIdx: 1,
      explain: "Cascading Style Sheets — rules 'cascade' down through the page.",
    },
    {
      prompt: "Which property changes text color?",
      options: ["color", "text-paint", "font-color"],
      answerIdx: 0,
      explain: "It's simply `color`. (background changes the box behind the text.)",
    },
    {
      prompt: "In the box model, what sits between the border and the content?",
      options: ["margin", "padding", "spacing"],
      answerIdx: 1,
      explain: "Padding is inside the border; margin is outside it.",
    },
  ],
};

export const jsMove: SeedLesson = {
  slug: "javascript-making-pages-move",
  title: "JavaScript: Making Pages Move",
  body: [
    {
      type: "paragraph",
      text: "If HTML is the skeleton and CSS is the clothes, **JavaScript is the muscles**. It reacts to clicks, changes the page, does math, and makes websites feel alive.",
    },
    { type: "paragraph", text: "Three building blocks you will use every single day:" },
    {
      type: "code",
      language: "javascript",
      code: 'let name = "Zahra";          // a variable — a named box\n\nif (name === "Zahra") {      // a decision\n  console.log("Welcome back!");\n}\n\nbutton.onclick = sayHi;      // an event — run code on click',
    },
    {
      type: "paragraph",
      text: 'JavaScript can grab any HTML element and change it — that\'s called working with the **DOM** (Document Object Model). Try the button below: the code finds the element with `id="msg"` and rewrites it.',
    },
  ],
  playground: {
    type: "html",
    title: "Make a button do something",
    hint: "Click the button in the preview. Then change the message text in the code, or make it change the color too!",
    starter:
      '<h2 id="msg">Click the button 👇</h2>\n<button onclick="change()">Press me!</button>\n\n<script>\n  let count = 0;\n  function change() {\n    count = count + 1;\n    document.getElementById("msg").innerHTML =\n      "You clicked " + count + " times! 🎉";\n  }\n</script>',
  },
  quiz: [
    {
      prompt: "Which keyword creates a variable whose value can change?",
      options: ["let", "const", "static"],
      answerIdx: 0,
      explain: "`let` allows change; `const` locks the value.",
    },
    {
      prompt: 'What does document.getElementById("msg") do?',
      options: ["Creates a new page", 'Finds the element with id="msg"', "Downloads a file"],
      answerIdx: 1,
      explain: "It searches the page for the element with that id so your code can change it.",
    },
    {
      prompt: "Code that runs when a button is clicked is called…",
      options: ["a stylesheet", "an event handler", "a database"],
      answerIdx: 1,
      explain: "Events (click, type, scroll) trigger handler functions.",
    },
  ],
};

// ───────────────────────── Back-End ─────────────────────────

const JOKE_JSON =
  '{\n  "joke": "Why do programmers love dark mode?",\n  "answer": "Because light attracts bugs! 🐛"\n}';

export const firstServer: SeedLesson = {
  slug: "your-first-server",
  title: "Your First Server",
  body: [
    {
      type: "paragraph",
      text: "The **back end** is the part of an app you never see: a program running on a **server** that stores data and answers requests. **Node.js** lets you write servers in JavaScript, and **Express** makes it easy.",
    },
    { type: "visual", name: "ClientServer", props: { label: "GET /api/joke" } },
    {
      type: "paragraph",
      text: "The browser sends a **request**; the server sends back a **response** — usually as **JSON**, a simple text format both sides understand. In Express, each address the server answers is called a **route**:",
    },
    {
      type: "code",
      language: "javascript",
      code: 'const express = require("express");\nconst app = express();\n\napp.get("/api/joke", (req, res) => {\n  res.json({ joke: "Why do programmers love dark mode?",\n             answer: "Light attracts bugs! 🐛" });\n});\n\napp.listen(3000);   // server is now alive on port 3000',
    },
  ],
  playground: {
    type: "api",
    title: "Be the server",
    hint: "You are the back end! Edit the JSON your server sends, then press the button to act as the browser making a request. Break the JSON on purpose to see a server error.",
    starter: JOKE_JSON,
  },
  quiz: [
    {
      prompt: "Where does Node.js run JavaScript?",
      options: ["Only inside Chrome", "On the server", "Inside HTML files"],
      answerIdx: 1,
      explain: "Node.js runs JS outside the browser — perfect for servers.",
    },
    {
      prompt: "What format do APIs usually use to send data?",
      options: ["JSON", "MP3", "DOCX"],
      answerIdx: 0,
      explain: "JSON (JavaScript Object Notation) is the common language of APIs.",
    },
    {
      prompt: 'In Express, app.get("/joke", …) defines…',
      options: ["a database", "a route", "a stylesheet"],
      answerIdx: 1,
      explain: "A route: an address the server knows how to answer.",
    },
  ],
};

export const talkingToDatabases: SeedLesson = {
  slug: "talking-to-databases",
  title: "Talking to Databases",
  body: [
    {
      type: "paragraph",
      text: "Apps need memory. A **database** stores data in **tables** made of rows and columns — like a super-powered spreadsheet. **SQL** (Structured Query Language) is how you talk to it.",
    },
    { type: "paragraph", text: "Here is a real table called `students`:" },
    { type: "visual", name: "TableVisual" },
    {
      type: "paragraph",
      text: "Four commands do almost everything: **SELECT** reads, **INSERT** adds, **UPDATE** changes, **DELETE** removes. And **WHERE** filters which rows you touch:",
    },
    { type: "code", language: "sql", code: "SELECT name, age FROM students WHERE age > 13;" },
  ],
  playground: {
    type: "sql",
    title: "Query a real table",
    hint: "The students table above is live below. Try: SELECT * FROM students — or filter with WHERE country = 'USA' or WHERE age < 15.",
    starter: "SELECT name, age FROM students WHERE age > 13",
  },
  quiz: [
    {
      prompt: "Which command READS data from a table?",
      options: ["OPEN", "READ", "SELECT"],
      answerIdx: 2,
      explain: "SELECT fetches rows; it's the command you'll use most.",
    },
    {
      prompt: "One row in a table represents…",
      options: ["one record (e.g. one student)", "one column", "one database"],
      answerIdx: 0,
      explain: "Each row = one record; each column = one property of it.",
    },
    {
      prompt: "What is WHERE for?",
      options: ["Renaming tables", "Filtering which rows you get", "Deleting the database"],
      answerIdx: 1,
      explain: "WHERE narrows results: WHERE age > 13 returns only matching rows.",
    },
  ],
};

export const phpBehindTheWeb: SeedLesson = {
  slug: "php-the-language-behind-most-of-the-web",
  title: "PHP: The Language Behind Most of the Web",
  body: [
    {
      type: "paragraph",
      text: "**PHP** runs on the server — it powers WordPress, Wikipedia, and roughly **40% of all websites**. Like Node.js, it builds the back end; it just uses different words. Its print command is `echo`, and variables start with `$`:",
    },
    {
      type: "code",
      language: "php",
      code: '$name = "Zahra";\necho "Salaam, " . $name;   // prints: Salaam, Zahra',
    },
    {
      type: "paragraph",
      text: "Modern PHP developers rarely start from zero — they use **frameworks**: **Laravel** (the most popular, elegant and full-featured) and **CodeIgniter** (small and fast). And **CMS** platforms like **WordPress, Joomla and Drupal** are giant PHP apps you can customize with the HTML/CSS skills from the front-end path.",
    },
  ],
  playground: {
    type: "php",
    title: "echo in PHP",
    hint: 'Try changing the text, or make variables: $city = "Kabul"; then echo $city;',
    starter: '$name = "Zahra"\necho "Salaam!"\necho $name\necho 7 * 6',
  },
  quiz: [
    {
      prompt: "Where does PHP code run?",
      options: ["In the browser", "On the server", "Only on phones"],
      answerIdx: 1,
      explain: "PHP is server-side — the browser only receives the finished HTML.",
    },
    {
      prompt: "Which is a popular modern PHP framework?",
      options: ["Laravel", "React", "Django"],
      answerIdx: 0,
      explain: "Laravel (and CodeIgniter) are PHP; React is front-end JS, Django is Python.",
    },
    {
      prompt: "Which CMS is built with PHP and powers ~40% of the web?",
      options: ["Excel", "WordPress", "Photoshop"],
      answerIdx: 1,
      explain: "WordPress — along with Joomla and Drupal, all PHP-based CMSs.",
    },
  ],
};

// ───────────────────────── Full-Stack ─────────────────────────

export const fetchTwoSides: SeedLesson = {
  slug: "fetch-how-the-two-sides-talk",
  title: "fetch(): How the Two Sides Talk",
  body: [
    {
      type: "paragraph",
      text: "You've met both halves. A **full-stack developer** connects them: the front end asks, the back end answers. In the browser, the asking is done with **fetch()**:",
    },
    {
      type: "code",
      language: "javascript",
      code: 'const res = await fetch("/api/joke");\nconst data = await res.json();\ndocument.getElementById("out").innerHTML = data.joke;',
    },
    { type: "visual", name: "ClientServer", props: { label: "fetch('/api/joke')" } },
    {
      type: "paragraph",
      text: "Every response carries a **status code**: **200** = success, **404** = not found, **500** = server error. Good full-stack developers always handle the sad cases, not just the happy one.",
    },
  ],
  playground: {
    type: "api",
    title: "Round-trip a request",
    hint: "Play both roles: edit what your server returns, then fetch it as the browser. Delete a comma to trigger a 500 error and see why error handling matters.",
    starter: JOKE_JSON,
  },
  quiz: [
    {
      prompt: "What does the front end use to request data from the back end?",
      options: ["a USB cable", "fetch (an HTTP request)", "CSS"],
      answerIdx: 1,
      explain: "fetch() sends an HTTP request and receives the response, usually JSON.",
    },
    {
      prompt: "Status code 200 means…",
      options: ["success", "not found", "server crashed"],
      answerIdx: 0,
      explain: "200 OK = the request worked.",
    },
    {
      prompt: "Status code 404 means…",
      options: ["success", "not found", "too many requests"],
      answerIdx: 1,
      explain: "404 = the server has no route/page at that address.",
    },
  ],
};

export const hashingPasswords: SeedLesson = {
  slug: "logins-done-right-hashing-passwords",
  title: "Logins Done Right: Hashing Passwords",
  body: [
    {
      type: "paragraph",
      text: "Real apps have accounts — and the #1 rule of accounts is: **never store passwords as plain text**. If a database leaks, plain passwords are a disaster.",
    },
    {
      type: "paragraph",
      text: "Instead, servers store a **hash**: the password goes through a one-way math machine and comes out as scrambled text. You can always compute the same hash from the same password — but you can **never** go backwards from the hash to the password.",
    },
    {
      type: "code",
      language: "text",
      code: 'password:  "sunshine123"\n     ↓  (one-way hash function, e.g. bcrypt)\nstored:    "$2b$10$N9qo8uLOickgx2ZMRZoMye…"',
    },
    {
      type: "paragraph",
      text: "When you log in, the server hashes what you typed and compares hashes. **Social login** (Google, Facebook, LinkedIn, Microsoft) goes a step further: your password never touches the app at all — the provider vouches for you.",
    },
  ],
  playground: {
    type: "hash",
    title: "Hash a password",
    hint: "Type any password and watch the hash. Change one letter — the entire hash changes. That's the magic that keeps accounts safe.",
  },
  quiz: [
    {
      prompt: "How should passwords be stored?",
      options: ["As plain text", "Hashed", "In a shared spreadsheet"],
      answerIdx: 1,
      explain: "Always hashed (with a strong algorithm like bcrypt) — never plain text.",
    },
    {
      prompt: "Hashing is special because it is…",
      options: ["one-way: it can't be reversed", "reversible with a key", "just making text shorter"],
      answerIdx: 0,
      explain: "One-way: you can verify a password against a hash but never recover it.",
    },
    {
      prompt: "Social login lets users…",
      options: [
        "share their password with the site",
        "sign in with an account they already have",
        "skip all security",
      ],
      answerIdx: 1,
      explain: "Google/Facebook/LinkedIn/Microsoft confirm the identity — the app never sees the password.",
    },
  ],
};

// ───────────────────────── Python ─────────────────────────

export const pythonFirstProgram: SeedLesson = {
  slug: "print-variables-and-your-first-program",
  title: "print(), Variables, and Your First Program",
  body: [
    {
      type: "paragraph",
      text: "**Python** is famous for reading almost like English — that's why it's the most recommended first language, and why it powers AI, data science, and automation everywhere.",
    },
    {
      type: "code",
      language: "python",
      code: 'print("Salaam, world!")\n\nname = "Zahra"          # a variable — a labeled box\nage = 14\nprint(name)\nprint(age + 1)          # Python can do math',
    },
    {
      type: "paragraph",
      text: "A **variable** is a labeled box that stores a value. `print()` shows things on the screen, and `input()` asks the user to type. With just these three, you can already build a chatbot, a quiz, or a calculator.",
    },
  ],
  playground: {
    type: "python",
    title: "Your first Python",
    hint: "Change the text, make new variables, try math like print(7 * 6). Press Run to see the output.",
    starter: 'print("Salaam, world!")\nname = "Zahra"\nprint(name)\nage = 14\nprint(age + 1)',
  },
  quiz: [
    {
      prompt: "Which line prints text in Python?",
      options: ['echo "Hi"', 'print("Hi")', 'console.log("Hi")'],
      answerIdx: 1,
      explain: "print() is Python's — echo is PHP, console.log is JavaScript.",
    },
    {
      prompt: "What is a variable?",
      options: ["A named box that stores a value", "A type of loop", "A website"],
      answerIdx: 0,
      explain: 'name = "Zahra" puts the value in a box labeled `name`.',
    },
    {
      prompt: "What does input() do?",
      options: ["Prints faster", "Asks the user to type something", "Deletes variables"],
      answerIdx: 1,
      explain: "input() pauses and waits for the user's answer — great for interactive programs.",
    },
  ],
};

export const pythonLists: SeedLesson = {
  slug: "lists-many-values-one-box",
  title: "Lists: Many Values, One Box",
  body: [
    {
      type: "paragraph",
      text: "Real programs juggle many values at once. A **list** is one box holding many items in order:",
    },
    {
      type: "code",
      language: "python",
      code: 'fruits = ["apple", "mango", "pomegranate"]\n\nprint(fruits[0])      # apple  ← counting starts at 0!\nprint(len(fruits))    # 3\n\nfor f in fruits:      # a loop visits every item\n    print(f)',
    },
    {
      type: "paragraph",
      text: 'Two things trip up every beginner: counting starts at **0** (so `fruits[0]` is the first item), and a **loop** repeats code for each item so you never copy-paste. Later you\'ll meet **dictionaries** — lists\' cousin that stores **key–value pairs** like `{"name": "Zahra", "age": 14}`.',
    },
  ],
  // The demo used a print-only mini interpreter; real Python (Pyodide) arrives in
  // Phase 2, so the starter now exercises actual lists and loops.
  playground: {
    type: "python",
    title: "Play with values",
    hint: "Add a fruit to the list, print fruits[1], or build a total: score = 10, then print(score * 3 + 5).",
    starter:
      'fruits = ["apple", "mango", "pomegranate"]\nprint(fruits[0])\nprint(len(fruits))\n\nfor f in fruits:\n    print("I like " + f)\n\nscore = 10\nprint(score * 3)',
  },
  quiz: [
    {
      prompt: "Which line creates a list?",
      options: ['fruits = ["apple", "mango"]', "fruits = (apple mango)", "list fruits: apple"],
      answerIdx: 0,
      explain: "Square brackets with commas make a list.",
    },
    {
      prompt: "fruits[0] gives you…",
      options: ["the last item", "the first item", "always an error"],
      answerIdx: 1,
      explain: "Indexes start at 0, so [0] is the first item.",
    },
    {
      prompt: "A dictionary stores…",
      options: ["only numbers", "key–value pairs", "files"],
      answerIdx: 1,
      explain: 'Like {"name": "Zahra"} — you look values up by their key.',
    },
  ],
};

// ───────────────────────── Mobile ─────────────────────────

export const websitesVsApps: SeedLesson = {
  slug: "websites-vs-apps",
  title: "Websites vs. Apps: What Changes on a Phone?",
  body: [
    {
      type: "paragraph",
      text: "Phones changed everything: small screens, touch instead of mouse, and apps installed from stores (**Google Play** for Android, the **App Store** for iOS). You have two roads:",
    },
    {
      type: "paragraph",
      text: "**Native:** write Android apps in Kotlin and iPhone apps in Swift — two codebases, maximum power. **Cross-platform:** write once in **React Native** or Flutter and ship to both — perfect when you already know React.",
    },
    {
      type: "paragraph",
      text: "Either way, mobile design rules apply: big touch targets, one thing per screen, thumb-friendly buttons at the bottom. Try designing for a phone below.",
    },
  ],
  playground: {
    type: "html",
    phone: true,
    title: "Design a phone screen",
    hint: "The preview is a phone! Make the button bigger, change colors, add a second card — think thumbs, not mouse pointers.",
    starter:
      '<div style="text-align:center">\n  <h2>🌟 My First App</h2>\n  <div style="background:#F4F6FB; border-radius:14px;\n       padding:14px; margin:10px 0">\n    Today\'s goal: 1 lesson ✅\n  </div>\n  <button style="width:100%; padding:16px;\n       font-size:18px; border:none; border-radius:14px;\n       background:#16337F; color:white">\n    Start Learning\n  </button>\n</div>',
  },
  quiz: [
    {
      prompt: "A cross-platform framework lets you…",
      options: ["write once for Android AND iOS", "only build websites", "skip app stores"],
      answerIdx: 0,
      explain: "One codebase, two platforms — that's the appeal of React Native and Flutter.",
    },
    {
      prompt: "Which language is used for native iOS apps?",
      options: ["PHP", "Swift", "SQL"],
      answerIdx: 1,
      explain: "Swift for iOS; Kotlin for native Android.",
    },
    {
      prompt: "Android apps are published on…",
      options: ["Google Play", "the App Store", "npm"],
      answerIdx: 0,
      explain: "Google Play for Android; the App Store is Apple's.",
    },
  ],
};

export const reactNative: SeedLesson = {
  slug: "react-native-your-react-skills-on-phones",
  title: "React Native: Your React Skills, Now on Phones",
  body: [
    {
      type: "paragraph",
      text: "**React Native** takes what you learned in the front-end path and points it at phones. Same components, same state, same thinking — different building blocks:",
    },
    {
      type: "code",
      language: "jsx",
      code: "// View, Text and Pressable come from the React Native library\n\nfunction App() {\n  return (\n    <View>\n      <Text>Salaam! 👋</Text>\n      <Pressable onPress={sayHi}>\n        <Text>Tap me</Text>\n      </Pressable>\n    </View>\n  );\n}",
    },
    {
      type: "paragraph",
      text: "Instead of `<div>` you use `<View>`, instead of `<p>` it's `<Text>`, and clicks become taps. Instagram, Discord and many big apps ship with React Native — one team, both stores.",
    },
  ],
  playground: {
    type: "html",
    phone: true,
    title: "Prototype an app screen",
    hint: "Sketch your dream app's home screen in the phone preview — a title, a card, a big tappable button.",
    starter:
      '<div style="text-align:center">\n  <h2>🐍 PyQuiz</h2>\n  <p style="color:#3A4666">Level 3 · 🔥 4-day streak</p>\n  <button style="width:100%; padding:16px; font-size:18px;\n     border:none; border-radius:14px;\n     background:#2E933C; color:white">\n    ▶ Continue Quiz\n  </button>\n</div>',
  },
  quiz: [
    {
      prompt: "React Native apps are written in…",
      options: ["JavaScript", "Swift only", "Python"],
      answerIdx: 0,
      explain: "JavaScript/React — the skills transfer directly from web development.",
    },
    {
      prompt: "In React Native, instead of <div> you use…",
      options: ["<Box>", "<View>", "<Page>"],
      answerIdx: 1,
      explain: "<View> is the container; <Text> replaces <p>.",
    },
    {
      prompt: "The biggest benefit of React Native for YOU is…",
      options: ["apps run without phones", "no code needed", "you reuse your React skills"],
      answerIdx: 2,
      explain: "Learn React once on the web, then ship to both app stores.",
    },
  ],
};

// ───────────────────────── Careers ─────────────────────────

export const portfolio: SeedLesson = {
  slug: "your-portfolio-proof-beats-promises",
  title: "Your Portfolio: Proof Beats Promises",
  body: [
    {
      type: "paragraph",
      text: "When you're young with no job history, a **portfolio** is your superpower: real projects that prove your skills. Clients and employers trust what they can **see and click**.",
    },
    {
      type: "paragraph",
      text: "The starter kit: a **GitHub** account where your code lives, and a simple **portfolio page** — which you can already build with your HTML and CSS skills! Three good projects beat thirty copied ones: pick things you actually built and can explain line by line.",
    },
  ],
  playground: {
    type: "html",
    title: "Build your portfolio card",
    hint: "This is a real portfolio component. Put in your own name, skills and dream project — you just built your first portfolio piece.",
    starter:
      '<div style="border:3px solid #F5A524; border-radius:16px;\n     padding:18px; max-width:340px; font-family:sans-serif">\n  <h2 style="margin:0">Zahra A.</h2>\n  <p style="color:#3A4666">Junior Web Developer · Kabul</p>\n  <p>🛠 HTML · CSS · JavaScript · Python</p>\n  <p>⭐ Project: a quiz app for my classmates</p>\n  <button style="background:#16337F; color:white;\n     border:none; padding:10px 16px; border-radius:10px">\n    See my work\n  </button>\n</div>',
  },
  quiz: [
    {
      prompt: "A portfolio is…",
      options: [
        "a paid certificate",
        "a collection of projects that shows your skills",
        "a type of resume paper",
      ],
      answerIdx: 1,
      explain: "It's living proof: projects people can open, click, and judge for themselves.",
    },
    {
      prompt: "Where do developers usually share their code?",
      options: ["Instagram", "GitHub", "WordPad"],
      answerIdx: 1,
      explain: "GitHub is the standard home for code — and it's free.",
    },
    {
      prompt: "The best first portfolio project is…",
      options: ["a copied template", "screenshots of others' work", "something you built and can explain"],
      answerIdx: 2,
      explain: "Interviewers and clients always ask 'how did you build this?' — you must own the answer.",
    },
  ],
};

export const freelancePlatforms: SeedLesson = {
  slug: "fiverr-upwork-freelancer-first-online-income",
  title: "Fiverr, Upwork & Freelancer: Your First Online Income",
  body: [
    {
      type: "paragraph",
      text: 'Once you can build, you can earn — from anywhere. Three big marketplaces connect you with clients: **Fiverr** (you post **gigs** — fixed services with clear prices, like "I will build a 1-page website for $30"), **Upwork** (clients post jobs, you send proposals), and **Freelancer** (similar, with contests too). Remote job boards and LinkedIn add full-time options later.',
    },
    {
      type: "paragraph",
      text: 'Golden rules for beginners: start with small, crystal-clear offers; over-deliver on your first five reviews; and **always keep payment inside the platform** — anyone who says "let\'s pay outside" is a red flag. Your NextNTech certificates and portfolio card slot straight into these profiles.',
    },
  ],
  playground: null,
  quiz: [
    {
      prompt: "Which of these are freelance marketplaces?",
      options: ["Fiverr, Upwork, Freelancer", "Netflix and Spotify", "Gmail and Outlook"],
      answerIdx: 0,
      explain: "All three connect freelancers with paying clients worldwide.",
    },
    {
      prompt: "On Fiverr, a 'gig' is…",
      options: ["a full-time job", "a service you offer at a clear price", "a type of computer"],
      answerIdx: 1,
      explain: "Example: 'I will fix your website's CSS for $15' — small, specific, priced.",
    },
    {
      prompt: "To stay safe as a beginner, you should…",
      options: [
        "share your password with clients",
        "keep payments inside the platform",
        "work with no agreement",
      ],
      answerIdx: 1,
      explain: "Platform payments are protected; off-platform deals lose that safety net.",
    },
  ],
};
