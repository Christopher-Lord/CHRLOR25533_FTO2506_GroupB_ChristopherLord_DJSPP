# 🎧 DJS Portfolio Piece – Podcast App (React)

## 📋 Project Description

This project builds off previous versions and introduces key new features including global audio playback, favouriting episodes, deployment best practices, UI enhancements, a recommended shows carousel and listening progress tracking.

## Setup Instructions

- Make sure you have `Node.js` and `npm` installed
- Open VSCode and clone this repo (`https://github.com/Christopher-Lord/CHRLOR25533_FTO2506_GroupB_ChristopherLord_DJS04.git`)
- After cloning, change your current directory to the newly cloned project folder (`cd repository-name`)
- The `package.json` file in this project contains all required dependencies: Install them using `npm install`
- Once dependencies are installed, start the dev server using `npm run dev`
- Navigate to the given `http://localhost` domain in your browser
- Browse the web page!

## Features

- A global audio player, with full playback control
- Support for favouriting podcast episodes with persistent storage
- A favourites page, to view all favourited episodes
- A randomised recommended shows carousel on the landing page
- Theme toggling between light and dark mode
- Track listening progress across episodes
- Ability to reset listening progress if you want to start fresh

## Technologies Used

- HTML
- CSS
- React
- Vite
- Vercel

## Usage Examples

- Once the server is running, navigate to the given `http://localhost` domain in your browser 

- On the Home page:
  - To utilize the filter and sorting features, interact with the search bar or dropdowns at the top
  - Interact with the carousel using the arrow buttons to either side of it
  - Change the theme by interacting with the 🌙 icon in the top right
  - Navigate to any of the podcast's details page by clicking on a podcast card
  - Navigate to the favourites page by interacting with the links in the header
  - Load more podcasts by interacting with the **Load More** button at the bottom

- On a podcasts details page:
  - Navigate back to the home page by interacting with the **Back to Home** button at the top
  - View the podcasts information at the top
  - Browse the currently selected seasons episodes
  - Change the current season by selecting a season from the dropdown
  - Interact with an episodes play button to start listening to an episode (This will bring up the audio player)
  - Interact with an episodes heart icon to favourite an episode

- On the Favourites page:
  - View all episodes you have favourited, grouped by podcast
  - Sort saved favourites by interacting with the dropdown
  - Remove an episode from your favourites by interacting with the red bin icon
  - Play an episode from your favourites by interacting with the play button
  - Reset all listening progress by interacting with the **Reset Progress** button at the top

---

## 🎯 Objectives

- Implement a global audio player with full playback control
- Add support for favouriting episodes with persistent storage
- Introduce a recommended shows carousel on the landing page
- Support theme toggling (light/dark mode)
- Ensure robust routing and deploy the app with professional polish
- Optionally track listening progress across episodes and sessions

## 🚀 Core Features & User Stories

### 🛠️ Setup and Deployment

- Deploy your app to **Vercel** using a **custom domain or URL**
- Add a **custom favicon** for easy identification in browser tabs
- Use tools like [metatags.io](https://metatags.io) to set **rich social media preview metadata**
- Ensure that direct access to dynamic routes (e.g. `/show/1`) works correctly (SPA routing fallback)

### 🔊 Global Audio Player

- Play audio using the provided **placeholder API**
- Keep the player **fixed at the bottom** of the screen across all pages
- Ensure **uninterrupted playback** when navigating between pages
- Provide **play, pause, seek, and progress tracking**
- Add a **confirmation prompt** on page reloads during playback

### ❤️ Favourites

- Allow users to **favourite or unfavourite episodes** via a button/icon
- Use **localStorage** to persist favourites across sessions
- Provide **visual feedback** for favourited items (e.g., filled heart)
- Create a **favourites page** displaying all saved episodes
- Display **associated show and season** for each favourite
- Show the **date/time added** to favourites
- **Group favourites by show title**
- Add **sorting options**:
  - A–Z / Z–A by title
  - Newest / Oldest by date added

### 🎠 Recommended Shows Carousel

- Add a **horizontally scrollable carousel** to the landing page
- Show each show’s **image, title, and genre tags**
- Support **looping** and navigation via **swipe or arrows**
- Clicking a carousel item should navigate to the **show’s detail page**

### 🌗 Theme Toggle

- Include a **toggle** for switching between light and dark mode
- **Persist theme selection** using `localStorage`
- Ensure the **entire app UI updates smoothly**
- Use **appropriate icons** (e.g., sun/moon) to indicate current theme
- Reflect selected theme across all views and components

## 🌟 Stretch Goal – Listening Progress (Optional)

- Save playback position per episode and **resume playback**
- Mark episodes as **"finished"** once fully played
- Display **progress indicators** for episodes in progress
- Allow users to **reset listening history**
- Save listening history in local storage

## ✅ Deliverables

- A fully functional and deployed podcast app
- Source code in **GitHub** with clear commit history
- Live demo link (**Vercel**)
- (Optional) Short demo video

## 💡 Tips

- Prioritise **user experience** and **clean component structure**
- Use **React best practices** (components, hooks, state management)
- Ensure the app is **responsive** and **mobile-friendly**
- Test localStorage and audio persistence thoroughly
- Make use of the **React ecosystem** to accelerate development!

---

## 🧑‍⚖️ Panel Review

After submitting your project, you will be required to present your work to a coach or panel of coaches.

During this session, you must:

- **Demonstrate** all the features you have implemented in your application.
- **Explain** how each feature was built, referring directly to your code (e.g., components, state, hooks, storage).
- Discuss the **decisions** you made during development (e.g., choice of libraries, structure, naming conventions).
- Break down the **logic** behind key functionalities (e.g., how audio persistence or favouriting works).
- Be prepared to answer **questions** from the coaches about your project, code structure, and implementation choices.

This is your opportunity to showcase both your technical and problem-solving skills—treat it like a real-world project revsiew.
