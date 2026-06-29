# Superbinary Scroll Animation Concepts

## Principle

Use Apple-like motion as product storytelling, not decoration. The page should
feel calm, expensive, and inevitable: slow pinning, gentle opacity, word-level
reveals, and interface motion that explains the product.

Avoid busy parallax, bouncy easing, glow effects, particle trails, and generic AI
visuals.

## Lead Concept: Ghost To Thought

### Idea

As the user scrolls, a sentence sits pinned in the center of the viewport. The
typed and accepted text is black. The caret blinks at the boundary between what
the user has accepted and what Superbinary is suggesting. Suggested words stay
after the caret in ghost grey. Scroll progress accepts the suggestion word by
word: each ghost word turns black, the caret moves after that accepted word, and
a tiny Tab key hint appears.

This mirrors the product interaction directly: ghost text becomes accepted text.

### Why It Feels Apple-Like

- One focused product behavior.
- Large, quiet composition.
- Slow scroll-linked transformation instead of flashy animation.
- The interaction explains itself without instructional copy.

### Example Sequence

Initial state:

```
I think the cleanest way to explain this is |to show it where people already write.
```

Visual state:

- Typed text: black.
- Caret: after "is".
- Suggested text: soft grey.
- Tab pill: barely visible.

Scroll states:

1. "to" turns black.
2. Caret moves after "to".
3. Tab pill gives a small press state.
4. "show" turns black.
5. Caret moves after "show".
6. Continue word by word.

End state:

```
I think the cleanest way to explain this is to show it where people already write.|
```

### Copy Pairing

Headline:

```
Tap Tab. The next word lands.
```

Subcopy:

```
Accept one word at a time. Keep what fits. Keep typing when it does not.
```

## Concept 2: Thought Catches Up

### Idea

A pinned typing surface shows a user typing letter by letter. The suggestion
updates subtly as the typed phrase gains meaning. It should not look like a chat
completion. It should look like the sentence is gently catching up with the user.

### Motion

- Typed letters appear at natural speed.
- Ghost suggestion fades in only after enough context exists.
- Suggestion changes once, not constantly.
- The caret remains at the end of accepted text.
- Final accepted phrase turns black word by word as the caret advances.

### Best Section

"It follows the shape of your thought."

## Concept 3: Highlights As Product Moments

### Idea

Instead of generic feature cards, use short pinned highlight panels. Each one has
one sentence and one tiny product motion.

### Highlight Motions

- The next words, right where you type: ghost text appears at cursor.
- Tab through your thought: three words turn from grey to black.
- Works across your Mac: app surfaces pass behind one pinned writing field.
- MindSignal understands the moment: subtle context lines fade in around the
  active sentence.
- Offline by design: network line fades out, suggestion continues.
- Protected by your Mac: local data tile locks with a Keychain label.

### Rule

Each highlight gets one motion only.

## Concept 4: MindSignal, Quietly

### Idea

Show context awareness without making it feel creepy. Around the pinned typing
surface, nearby context fragments softly appear as blurred/secondary text. They
resolve just enough to imply relevance, then fold into the suggestion.

### Motion

- Context fragments appear at 10-20% opacity.
- One or two relevant words become slightly clearer.
- A thin line or soft mask guides the eye toward the cursor.
- The final suggestion appears.

### Copy Pairing

```
Context that stays with you.
```

```
MindSignal helps Superbinary understand the context around your cursor, so the
next words can feel like they came from the thought you were already holding.
```

### Guardrail

Do not show the app "reading everything." Show context as a quiet signal, not a
surveillance map.

## Concept 5: Works Across Apps, Soft Marquee

### Idea

Two slow logo/app-surface marquees intersect behind a pinned writing demo. The
foreground remains the product behavior; the app logos are ambient proof that it
works across ordinary Mac writing surfaces.

### Motion

- Horizontal row of app surfaces moves left slowly.
- Vertical or diagonal row moves more slowly.
- Product demo remains fixed above them.
- Logos/surfaces are desaturated and secondary.

### Copy Pairing

```
Not another place to write. A better way to keep writing.
```

## Concept 6: Privacy Scroll Lock

### Idea

The privacy chapter uses a three-step scroll sequence. Each step removes a trust
objection without drama.

### Step 1: Offline

The Wi-Fi symbol fades out. The sentence still completes.

Copy:

```
Works offline.
```

### Step 2: Firewall-Testable

A simple outgoing connection line disappears. The typing surface remains active.

Copy:

```
Block outgoing connections. Keep writing.
```

### Step 3: Keychain Protected

A small local data tile closes into a Mac-style lock. No vault imagery. No
"military grade" language.

Copy:

```
Private app data is protected by macOS Keychain.
```

## Concept 7: Native Mac Simplicity

### Idea

As the user scrolls, the full product surface reduces down to a menu bar icon,
then expands briefly into the small control menu.

### Motion

- Inline suggestion fades out.
- Menu bar icon stays.
- Compact menu appears with simple toggles.
- Menu closes.

### Copy Pairing

```
Nothing flashy. Nothing extra. Just there when you write.
```

## Recommended Motion Arc

Use only four major scroll moments:

1. Hero: animated typing demo.
2. Ghost To Thought: scroll accepts ghost words from grey to black.
3. MindSignal: context quietly informs the next words.
4. Privacy Scroll Lock: offline, firewall-testable, Keychain protected.

The app-logo marquee can run quietly between sections, but it should not become a
major animation set piece.

## Caret As Main Actor

The blinking caret is the page's quiet guide. It should always represent the
same product truth:

```
accepted text | ghost suggestion
```

The caret never floats ahead of the suggestion and never sits after unaccepted
ghost text. It is always the boundary between "already mine" and "suggested
next."

### Scroll Behavior

1. Caret blinks at the end of accepted text.
2. Ghost suggestion appears after the caret.
3. Scroll progress simulates a Tab accept.
4. The next ghost word turns black.
5. The caret moves after the accepted word.
6. Remaining ghost words stay grey after the caret.

Example:

```
I think we should |finish this today
I think we should finish |this today
I think we should finish this |today
I think we should finish this today|
```

This makes the page itself behave like Superbinary: the user is always in
control, and suggestions become text only when accepted.

## Implementation Notes For Later

- Prefer scroll-linked CSS/JS progress over autoplay-heavy video when possible.
- Use pinned sections with clear start/end points.
- Respect `prefers-reduced-motion`; show the final accepted sentence and static
  proof cards when reduced motion is enabled.
- Keep transforms small: opacity, color, mask, y-translation under 24px.
- Use Apple-like easing: slow in, confident settle, no bounce.
- Avoid scroll-jacking. The page should still feel like normal scrolling.
- The text animation must remain readable on mobile; use shorter demo sentences
  on small screens.

## Best First Prototype

Build the Ghost To Thought section first.

Acceptance criteria:

- At rest, the suggestion is visibly grey ghost text.
- As the user scrolls, words turn black one at a time.
- The caret advances with each accepted word.
- The caret always sits between accepted black text and unaccepted grey text.
- The Tab pill gives a subtle press state.
- The effect still reads clearly with reduced motion disabled, and degrades to a
  static before/after state with reduced motion enabled.
