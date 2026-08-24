# Netflix for Memories

## 1. Project Overview

Build a web-based interactive memory archive inspired by the Netflix user experience.

This is **not a generic Netflix clone**.

The concept is:

> A private "Netflix" containing memories, photos, videos, stories, and moments shared between a group of close friends.

The application should feel immediately familiar as Netflix, while replacing entertainment content with personal memories.

The emotional goal is:

> "It looks like Netflix, but after a few seconds you realize that the entire catalog is about us."

The website should feel polished, cinematic, nostalgic, personal, and premium.

---

# 2. Core Product Principles

## 2.1 Netflix-inspired, not Netflix-branded

Use Netflix's general UX patterns as inspiration:

- Dark cinematic interface
- Large hero content
- Horizontal content rows
- Content cards
- Profile selection
- Continue Watching
- Personalized recommendations
- Search
- My List
- Detail pages
- Seasons and episodes
- Autoplay / next episode
- Ratings / reactions
- Top 10
- Profile statistics

Do NOT copy Netflix's proprietary assets, logos, exact UI assets, or copyrighted content.

The implementation should be an original design inspired by the interaction model.

---

# 3. Primary User Experience

The experience should follow this general journey:

```text
Landing
   ↓
Profile Selection
   ↓
Home
   ↓
Discover Memories
   ↓
Open Memory / Episode
   ↓
Watch / Browse Photos
   ↓
React / Add to My Memories
   ↓
Next Memory
   ↓
Discover another memory
```

The user should never feel like they are browsing a traditional photo gallery.

They should feel like they are browsing a streaming platform.

---

# 4. Profile Selection

The first major screen should resemble a streaming-service profile selection page.

Example:

```text
Who's reminiscing?

[ Danendra ]   [ Grace ]   [ Friend 1 ]   [ Friend 2 ]
```

Each profile should have:

- Name
- Avatar
- Optional custom profile image
- Personalized memory statistics

Profiles are primarily used to personalize the experience.

Example:

If Grace enters:

```text
Because Grace was there
```

If Danendra enters:

```text
Your Memories
```

---

# 5. Home Page

The Home page is the most important screen.

It should contain:

## 5.1 Hero Section

A large cinematic hero featuring one important memory.

Example:

```text
THE DAY WE MET

2023 · 1h 42m · Friendship · Core Memory

[ ▶ Play Memory ] [ + My Memories ]

A story about how everything started...
```

Hero content should support:

- Background image
- Background video if available
- Title
- Year
- Duration
- Genre
- Description
- Main CTA
- Secondary CTA

Hero should have a cinematic gradient overlay to maintain readability.

---

# 6. Home Content Rows

The homepage should use horizontal scrolling rows similar to streaming services.

Required rows:

## Continue Watching

Show memories that the current profile has partially viewed.

---

## Because You Were There

Show memories involving the selected profile.

---

## Trending Among Us

Show memories with the highest engagement / view count.

---

## Most Rewatched Memories

Show memories that have been replayed frequently.

---

## You May Have Forgotten This...

Show older or rarely accessed memories.

This section is especially important emotionally.

---

## Top 10 Memories

Display a ranked list of the most popular memories.

Example:

```text
#1 Bandung Trip
#2 Selfie Time Incident
#3 Graduation
#4 Midnight Conversation
...
```

---

## Made For You

Personalized recommendations based on:

- Profile
- People involved
- Tags
- Genre
- Previous views
- Reactions
- Favorite memories

---

## Coming Soon

Show future plans or memories that have not happened yet.

Example:

```text
OUR NEXT CHAPTER

Coming Soon
```

This section should reinforce that the story is not over.

---

# 7. Memory Content Model

Every memory should be treated like a streaming title.

A memory can contain:

```text
Memory
├── title
├── description
├── year
├── date
├── duration
├── coverImage
├── backdropImage
├── trailer / preview
├── genre[]
├── tags[]
├── people[]
├── location
├── season
├── episode
├── media[]
├── trivia[]
├── quotes[]
├── reactions
└── metadata
```

---

# 8. Memory Detail Page

Clicking a memory should open a Netflix-style detail page.

Example:

```text
THE SELFIE TIME INCIDENT

2026 · 17 min · Comedy · Friendship

★★★★★
98% Match

[ ▶ Play ] [ + My Memories ]

Synopsis

A seemingly normal photo booth session
turns into an unforgettable incident...

Starring

Danendra
Grace
Friend 1
Friend 2
```

Sections:

- Hero
- Description
- People involved
- Media
- Trivia
- Quotes
- Related memories
- Recommended memories

---

# 9. Memory Playback

Memory playback should feel like watching an episode.

Possible media:

- Video
- Photo slideshow
- Mixed photo + video timeline
- Audio
- Captions
- Text overlays

Player requirements:

- Play / pause
- Progress bar
- Volume
- Fullscreen
- Skip forward/backward
- Next memory
- Previous memory
- Captions if available
- "Skip Intro"

---

# 10. Seasons and Episodes

Memories should optionally be grouped into seasons.

Example:

```text
OUR STORY

Season 1 — The Beginning
Episode 1 — How It Started
Episode 2 — First Hangout
Episode 3 — We Became Friends

Season 2 — The Good Times
Episode 1 — Bandung
Episode 2 — Late Night Talks
Episode 3 — Random Tuesday

Season 3 — Growing Up
Episode 1 — Everyone Got Busy
Episode 2 — Things Changed
Episode 3 — Last Semester

Final Season — Goodbye
Episode 1 — The Last Few Days
Episode 2 — One Last Hangout
Episode 3 — See You Again
```

This is one of the central concepts of the application.

---

# 11. Continue Watching

Track the user's progress through a memory.

Example:

```text
Bandung Trip
██████████░░░░
72% watched
```

When the user returns:

```text
Continue Watching
```

should allow them to resume from their previous position.

---

# 12. Next Episode

After a memory finishes:

```text
NEXT EPISODE

The Night We Almost Got Lost

Starting in 5...
```

Allow:

- Automatic next episode
- Manual next episode
- Cancel autoplay

---

# 13. "Are You Still Reminiscing?"

After prolonged watching / browsing, show a playful equivalent of Netflix's "Are you still watching?"

Use:

```text
Are you still reminiscing?

You've gone through 7 memories.

[ Obviously ]
```

This should feel playful rather than intrusive.

---

# 14. My Memories

Replace Netflix's "My List" concept with:

> My Memories

Users can save memories manually.

Each memory card should have:

```text
+ My Memories
```

or:

```text
✓ In My Memories
```

The My Memories page should display the user's saved memories.

---

# 15. Reactions

Replace traditional ratings with emotional reactions.

Possible reactions:

- ❤️ Core Memory
- 🥹 I Miss This
- 😂 I Can't Believe We Did This
- 💀 Why Did We Do This?
- ⭐ Would Relive

The selected reactions can later influence recommendations.

---

# 16. Surprise Me

Add a prominent discovery feature:

```text
🎲 Surprise Me
```

When clicked, randomly select an appropriate memory.

Example:

```text
Tonight's recommendation

THE DAY WE ATE 14 PLATES OF SUSHI

[ Watch ]
```

Avoid selecting the exact same memory repeatedly unless the dataset is very small.

---

# 17. Search

Search should support:

- Title
- Description
- Person
- Location
- Year
- Genre
- Tag
- Quote
- Trivia

Example:

```text
Search: Bandung
```

Results:

```text
Bandung Trip
Random Bandung Dinner
That Hotel in Bandung
Our First Road Trip
```

Search should feel like content discovery rather than database search.

---

# 18. Genres

Create custom memory genres.

Suggested genres:

- Comedy
- Chaos
- Core Memory
- Road Trip
- Academic Survival
- Food
- Random Moments
- Late Night
- Main Character
- Unplanned
- Embarrassing
- Wholesome
- We Were Young
- Last Days Together

Genres should be configurable.

---

# 19. Timeline

Add a chronological view called:

> Our Timeline

Example:

```text
2023
│
├── First Meeting
├── First Hangout
│
2024
│
├── First Trip
├── Graduation
│
2025
│
├── ...
│
2026
│
└── The Beginning of Goodbye
```

The timeline should allow users to navigate memories chronologically.

---

# 20. Friendship Statistics

Each profile should have personalized statistics.

Example:

```text
DANENDRA

127 Memories
2,481 Photos
84 Videos
17 Places
3 Years Together
46 Inside Jokes
82 Late Night Conversations
193 "Let's Hangout Soon" Promises
```

Statistics should be presented visually.

Avoid making the page look like a generic analytics dashboard.

It should remain cinematic and emotional.

---

# 21. Profile Page

Profile should contain:

- Avatar
- Name
- Member since
- Memories watched
- Favorite genres
- Favorite memories
- Saved memories
- Friendship statistics
- People most frequently appearing together
- Most watched memory

Example:

```text
DANENDRA

Member since 2023

127 Memories Watched

Favorite Genre
CHAOS

Most Watched
Bandung Trip
```

---

# 22. "Because You Watched..."

Related memory recommendations should appear after watching.

Example:

```text
Because you watched "Bandung Trip"

→ Another Bandung Memory
→ Our First Road Trip
→ That Dinner
→ Hotel Chaos
```

Recommendations can initially use simple metadata/tag matching.

Do not over-engineer recommendation algorithms in the first version.

---

# 23. Notifications

Create a lightweight notification center.

Examples:

```text
A new memory was added.

Grace added "Our Last Dinner."

You May Have Forgotten This...

You haven't watched "Bandung 2024" in a while.

Memory Unlocked.

You've watched 10 memories.
```

Notifications should feel like part of the story.

---

# 24. Easter Eggs

The application should contain hidden interactions.

Possible examples:

- Hidden memories
- Secret episodes
- Inside jokes
- Konami code
- Clickable objects
- Hidden photos
- Secret messages
- Unlockable content

Example:

```text
You found a hidden memory.
```

Easter eggs should not interfere with normal navigation.

---

# 25. Final Season / Ending

The experience should eventually have a "series finale".

Example:

```text
THE END

But this story isn't over.

There are still episodes
we haven't made yet.

[ Continue Our Story ]
```

Then:

```text
Season 4

THE FUTURE

Coming Soon...
```

This is important because the website represents a friendship rather than a finished archive.

---

# 26. Visual Design

## Overall Style

The visual language should be:

- Cinematic
- Dark
- Premium
- Nostalgic
- Minimal
- Emotional
- Modern
- Responsive

Primary visual characteristics:

- Dark background
- Large imagery
- Strong typography
- Smooth gradients
- Rounded cards
- Subtle shadows
- Cinematic overlays
- Large whitespace where appropriate

Avoid:

- Generic dashboard aesthetics
- Excessive glassmorphism
- Excessive gradients
- Overly colorful UI
- Corporate SaaS styling
- Excessive animations
- Clutter

---

# 27. Animation

Animations should be subtle and cinematic.

Use:

- Fade
- Scale
- Slide
- Card hover expansion
- Hero transitions
- Smooth horizontal scrolling
- Modal transitions
- Page transitions

Avoid excessive motion.

Animations should enhance nostalgia rather than distract from the content.

---

# 28. Responsive Design

The application must work on:

- Desktop
- Laptop
- Tablet
- Mobile

Desktop should provide the full cinematic experience.

Mobile should preserve the streaming-platform experience while adapting:

- Navigation
- Hero height
- Card sizes
- Horizontal rows
- Detail pages
- Player controls

Do not simply shrink the desktop layout.

---

# 29. Accessibility

Implement:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible buttons
- Alt text for meaningful images
- Sufficient contrast
- Reduced-motion support
- Proper heading hierarchy

---

# 30. Data Architecture

Keep content data separate from UI components.

Do not hardcode memories directly inside components.

Example conceptual structure:

```text
data/
├── profiles
├── memories
├── seasons
├── genres
├── people
├── notifications
└── recommendations
```

This allows the content to be replaced without rebuilding the UI.

---

# 31. Media Architecture

Media should be referenced through data.

Example:

```text
memory:
  title: "Bandung Trip"
  coverImage: "/memories/bandung/cover.jpg"
  backdropImage: "/memories/bandung/backdrop.jpg"
  media:
    - type: image
      src: "/memories/bandung/01.jpg"
    - type: video
      src: "/memories/bandung/video.mp4"
```

Do not embed large media directly inside components.

---

# 32. Component Architecture

Prefer reusable components.

Suggested components:

```text
ProfileSelector
Navbar
HeroBanner
MemoryRow
MemoryCard
MemoryCardLarge
MemoryCardTop10
MemoryDetail
MemoryPlayer
EpisodeList
SeasonSelector
ContinueWatching
RecommendationRow
MyMemories
SearchOverlay
SearchResults
Timeline
ProfileStats
NotificationCenter
ReactionPicker
SurpriseMe
Footer
```

Components should be composable.

---

# 33. State Management

The application should track:

- Current profile
- Watched memories
- Playback progress
- Saved memories
- Reactions
- Search state
- Active season
- Notifications
- Recently viewed memories

For the first version, local persistence is acceptable.

Use:

```text
localStorage
```

or another lightweight client-side persistence mechanism.

Do not introduce a backend unless required.

---

# 34. Recommendation Logic

Initial recommendation logic can be simple.

Prioritize:

1. Same people
2. Same genre
3. Same location
4. Same tags
5. Similar year
6. User reactions
7. Watch history

Example:

```text
User watches:
Bandung Trip

Find:
- memories tagged Bandung
- memories containing the same people
- memories tagged Trip
- memories from the same period
```

The recommendation system should be deterministic and explainable initially.

---

# 35. Performance

Because this application may contain many images and videos:

- Lazy-load images
- Use responsive image sizes
- Avoid loading all videos at once
- Lazy-load video previews
- Compress assets
- Use poster images
- Avoid unnecessary re-renders
- Keep initial bundle reasonable

The homepage should remain fast even with a large memory library.

---

# 36. UX Details That Matter

Pay special attention to small details.

Examples:

- Card hover reveals more information
- Hero image slowly moves / zooms
- Smooth navigation
- Persistent navbar
- Progress bars on watched content
- Recently watched state
- Saved state
- Loading skeletons
- Empty states
- Smooth modal transitions
- Proper mobile behavior

These details are important for making the application feel like a real streaming service.

---

# 37. Content Philosophy

Do not treat memories as generic media files.

Each memory should have a story.

Instead of:

```text
IMG_4839.jpg
```

use:

```text
The Night We Couldn't Stop Laughing
```

Instead of:

```text
VID_2024_03_12.mp4
```

use:

```text
The Most Unnecessary Adventure
```

Metadata should add emotional context.

---

# 38. Important Personalization

The application should make heavy use of the actual relationships between people.

For every memory, where possible, define:

```text
people involved
location
date
event
genre
tags
story
```

This enables meaningful features such as:

```text
Because you were there
```

and:

```text
You might remember this
```

---

# 39. MVP Scope

The first implementation should prioritize:

### Phase 1

- Profile selection
- Home page
- Hero section
- Memory rows
- Memory cards
- Memory detail page
- Media viewer
- Search
- My Memories
- Continue Watching
- Seasons / episodes
- Responsive design

### Phase 2

- Personalized recommendations
- Reactions
- Timeline
- Friendship statistics
- Top 10
- Surprise Me
- Notifications

### Phase 3

- Easter eggs
- Hidden memories
- Advanced animations
- Final season experience
- Advanced recommendation system

Do not attempt to build everything simultaneously.

---

# 40. Development Priorities

When making implementation decisions, prioritize:

1. Emotional experience
2. Visual polish
3. Core Netflix-like interaction patterns
4. Smooth navigation
5. Responsive behavior
6. Performance
7. Maintainable architecture
8. Advanced functionality

A visually polished simple feature is better than a technically complex feature that feels unfinished.

---

# 41. Definition of Done

The project is successful when a user can:

1. Open the website
2. Select their profile
3. Immediately understand that it is a Netflix-inspired memory platform
4. Browse memories horizontally
5. Open a memory
6. Read its story
7. Watch photos/videos
8. Save it to My Memories
9. Resume it later
10. Continue to another episode
11. Search for a specific memory
12. Browse the friendship timeline
13. See personalized statistics
14. Discover unexpected old memories
15. Feel that the website was specifically made for their friendship

The most important success criterion is emotional:

> The website should feel like a place where the friendship itself became a streaming series.

---

# 42. Implementation Rule

Before implementing a feature, ask:

> "Does this make the experience feel more like a streaming service for memories?"

If yes, implement it.

If it only adds technical complexity without improving the experience, defer it.

Do not prioritize feature quantity over emotional impact.

---

# 43. Final Product Identity

The product should ultimately feel like:

```text
Netflix
      ×
Personal Archive
      ×
Friendship Story
      ×
Interactive Time Capsule
```

The application is not simply a gallery.

It is not simply a Netflix clone.

It is an **interactive streaming experience for memories.**

---

# 44. Architecture Constraints (HARD RULES)

## Pure Frontend — No Backend, No Database

This application is **100% client-side only**. There is no backend server, no database, no API.

- All data lives in `src/data/` as static JS/TS files
- All state persists via `localStorage` only
- No `fetch()` calls to external APIs (except publicly available images if absolutely needed)
- No server-side rendering
- Routing is handled by `react-router-dom` (frontend routing)
- Do not add any backend framework (Express, Fastify, Next.js API routes, etc.)
- Do not add any database (Supabase, Firebase, SQLite, etc.)

If a feature requires a backend, defer it or simulate it with static data + localStorage.

**Tech stack locked to:**
- React 18 + Vite
- Tailwind CSS
- react-router-dom (frontend routing)
- AOS (scroll animations)
- localStorage (persistence)
- No other runtime dependencies unless approved

---

# 45. CLAUDE.md Maintenance Rule

**Every time a feature is added, modified, or removed, update this file immediately.**

Specifically:
- Mark completed features in Section 45 (Implementation Status) as `✓ Done`
- If the data model, component list, or tech stack changes, update the relevant section
- If a design decision is made that overrides a spec item, note it in the relevant section
- Keep Section 45 as the single source of truth for current implementation state

This file must never be more than one session out of date.

**Trigger:** After any commit or significant code change, review Section 45 and update statuses.

---

# 45. Implementation Status (Last updated: 2026-08-24)

Track what is built vs. not built. Update this section after every work session.

## Tech Stack (Current)
- React 18.3.1 + Vite
- Tailwind CSS 3.4.14
- AOS 2.3.4 (scroll animations)
- Lucide React + React Icons
- react-router-dom v6 (frontend routing)
- React Context + localStorage (state management)
- Pure frontend — no backend, no database

## Screens

| Screen | Status | Notes |
|--------|--------|-------|
| Landing / Splash | ✗ Not built | App opens directly to Profile Select |
| Profile Selection | ✓ Done | `/profile` — 6 profiles (Denan, Zefanya, Angel, Dinda, Grace, Abi), avatar with color, localStorage persist |
| Home Page | ✓ Done | `/home` — Hero + 10 dynamic rows incl. Phase 2 personalized rows |
| Memory Detail Page | ✓ Done | `/memory/:id` — full dynamic detail, seasons, episodes, related, reactions |
| Media Viewer / Player | ✓ Done | Fullscreen overlay — photo slideshow + video, keyboard nav, thumbnails |
| Search | ✓ Done | SearchOverlay — searches title, description, genre, tags, people, location, year |
| My Memories | ✓ Done | `/my-memories` — saved list with localStorage, remove button |
| Timeline | ✓ Done | `/timeline` — chronological vertical timeline grouped by year |
| Profile / Stats Page | ✓ Done | `/stats` — friendship statistics, highlights, profile-specific counts |
| Notifications Center | ✓ Done | Bell dropdown in Navbar, unread count badge, mark all read |
| Seasons / Episodes View | ✓ Done | EpisodeList inside MemoryDetail page |

## Components

| Component | Status | Notes |
|-----------|--------|-------|
| Navbar | ✓ Done | Scroll-aware bg, all nav links, SurpriseMe, NotificationCenter, profile dropdown |
| HeroBanner | ✓ Done | Dynamic data, autoplay video bg, mute toggle, progress bar |
| MemoryRow | ✓ Done | default / continue / top10 variants, navigate on click |
| CardImage | ✓ Done | Navigate to detail on click |
| HoverPopup | ✓ Done | Wired: play→detail, +/✓ toggles myList, reaction badge overlay |
| MediaViewer | ✓ Done | Fullscreen, photo+video, thumbnails, keyboard nav, progress tracking |
| SearchOverlay | ✓ Done | Live search, grid results, navigate on select, Escape to close |
| EpisodeList | ✓ Done | Season header, episodes list, progress bars, navigate on click |
| Footer | ✓ Done | Simple footer |
| ProfileSelector | ✓ Done | `pages/ProfileSelect.jsx` |
| MemoryDetail | ✓ Done | `pages/MemoryDetail.jsx` |
| MyMemoriesPage | ✓ Done | `pages/MyMemoriesPage.jsx` |
| TimelinePage | ✓ Done | `pages/TimelinePage.jsx` |
| StatsPage | ✓ Done | `pages/StatsPage.jsx` |
| NotificationCenter | ✗ Replaced | Replaced by AchievementCenter |
| AchievementCenter | ✓ Done | Trophy dropdown, 10 dynamic achievements, per-achievement progress bars, overall % |
| ReactionPicker | ✓ Done | 5 emoji reactions, compact/full modes, localStorage persist |
| SurpriseMe | ✓ Done | Dice modal: selecting animation → reveal random memory |
| Modal | ⚠ Legacy | Old generic modal, no longer used in main flow |
| MemoryCardLarge | ✗ Not built | Phase 3 candidate |
| SeasonSelector | ✗ Not built | Phase 3 candidate |

## Features

| Feature | Phase | Status | Notes |
|---------|-------|--------|-------|
| Profile switching | 1 | ✓ Done | localStorage, 3 profiles, greeting per profile |
| Hero section | 1 | ✓ Done | Dynamic, video bg, mute, progress bar, CTAs |
| Horizontal memory rows | 1 | ✓ Done | 10 dynamic rows on Home |
| Card hover popup | 1 | ✓ Done | Actions wired, reaction badge |
| Top 10 cards | 1 | ✓ Done | Data-driven |
| Continue Watching row | 1 | ✓ Done | localStorage progress, only shows if progress > 0 |
| Memory detail page | 1 | ✓ Done | Full dynamic, trivia, quotes, tags, people, reactions |
| Media viewer | 1 | ✓ Done | Photo slideshow + video player |
| Search | 1 | ✓ Done | Full-text search across all memory fields |
| My Memories (save) | 1 | ✓ Done | localStorage, toggle, dedicated page |
| Seasons / Episodes | 1 | ✓ Done | 3 seasons, 12 episodes total |
| Routing (multi-page) | 1 | ✓ Done | react-router-dom v6, protected routes |
| localStorage persistence | 1 | ✓ Done | profile, myList, watchProgress, recentlyWatched, reactions, readNotifs |
| "Are you still reminiscing?" | 1 | ✓ Done | Fires after 7+ memories touched |
| Personalized rows | 1 | ✓ Done | "Because [Name] Was There" row |
| Personalized recommendations | 2 | ✓ Done | "Trending", "Paling Sering Diputar", "Karena Kamu Menyukainya", "Because You Watched" |
| Reactions | 2 | ✓ Done | 5 emoji reactions, localStorage persist, influences recommendations |
| Timeline view | 2 | ✓ Done | `/timeline` — vertical, grouped by year, month label, progress bars |
| Friendship statistics | 2 | ✓ Done | `/stats` — global + profile-specific counts, highlights, genre, co-person |
| Surprise Me | 2 | ✓ Done | Dice icon in Navbar, animation → reveal random memory |
| Notifications | 2 | ✗ Replaced | Replaced by dynamic Achievement system |
| Achievements | 2 | ✓ Done | 10 dynamic achievements (common/uncommon/rare/legendary), per-achievement progress bars, overall %, unseen badge on Trophy icon, localStorage persist via `nfm_seen_achievements` + `nfm_visited` |
| Easter eggs | 3 | ✓ Done | Konami code (↑↑↓↓←→←→BA) + logo 5× click → EasterEggModal reveals hidden memory |
| Hidden memories | 3 | ✓ Done | Memory id:99 (`hidden:true`) — only in `memories.js`, excluded from all public lists, accessible via easter egg or direct URL |
| Final season experience | 3 | ✓ Done | `/finale` — cinematic multi-phase THE END screen → Season 4 Coming Soon → CTA |
| Coming Soon row | 3 | ✓ Done | `ComingSoonRow` on Home — 4 gradient teaser cards, navigate to /finale on click |
| Advanced animations | 3 | ✓ Done | FinaleScreen multi-phase fade transitions, EasterEggModal animated reveal |

## Data Architecture

| Item | Status | Notes |
|------|--------|-------|
| Memory data model | ✓ Done | `src/data/memories.js` — full model + `hidden:true` flag for easter egg memory (id:99) |
| Public/hidden split | ✓ Done | `publicMemories` export excludes hidden; `memories` array includes all; all UI uses `publicMemories` |
| Profiles data | ✓ Done | `src/data/profiles.js` — 3 profiles with id, color, greeting |
| Seasons/Episodes data | ✓ Done | `src/data/seasons.js` — 3 seasons |
| People data | ✓ Done | `src/data/profiles.js` (people object) |
| Notifications data | ✗ Unused | `src/data/notifications.js` — superseded by achievements |
| Achievements data | ✓ Done | `src/data/achievements.js` — 10 achievement definitions with dynamic `getProgress()` |
| Coming Soon data | ✓ Done | `src/data/comingSoon.js` — 4 future memory teasers |
| Easter egg state | ✓ Done | localStorage key `nfm_eggs` — array of discovered egg types |
| Genres data | ✗ Not built | Genres are inline strings in memory objects |
