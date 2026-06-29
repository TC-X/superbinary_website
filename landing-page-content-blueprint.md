# Superbinary Landing Page Content Blueprint

## Working Positioning

Superbinary: Autocomplete Your Thoughts

A private, native Mac autocomplete layer that works across the apps you already
write in.

## Assumptions To Lock Before Launch

- The launch build ships with the local model bundled.
- Superbinary can complete text fully offline after install.
- The app can pass an outgoing-connection firewall test with LuLu, Little
  Snitch, or Radio Silence while suggestions continue working.
- Private local app data is encrypted with keys protected by macOS Keychain.
- Trial and pricing are final: 14-day free trial, no credit card required;
  $49.99 early bird price, regular $89.99.
- Primary CTA is singular: download. No secondary CTA in the hero.

## Page Goal

Convert Mac users who write constantly into trial downloads by making three ideas
obvious within the first screen:

1. Superbinary helps finish thoughts anywhere they write on Mac.
2. It feels native, fast, and controlled.
3. It is private by design, with offline completion and local protection.

## Hero

### On-Screen Copy

Superbinary

Autocomplete your thoughts.

A private, native Mac autocomplete layer that works across the apps you already
write in.

Download for Mac

14-day free trial. No credit card required.

### Visual Direction

Show a clean Mac writing surface with the cursor mid-sentence. Ghost text appears
letter by letter, then the user accepts one word at a time with Tab. The visual
should communicate "it knew what I was going to say" without making the page look
like a chatbot.

### Animation Beat

Typed text:

```
I think the cleanest way to explain this is
```

Ghost suggestion:

```
 to show it where people already write.
```

Acceptance:

```
Tab -> to
Tab -> show
Tab -> it
Tab -> where
Tab -> people
Tab -> already
Tab -> write.
```

## Section 1: Install And Write

### Intent

Make setup feel simple. The user should believe this is not a productivity system
they need to maintain.

### Headline

Install it. Start writing.

### Copy

Batteries included. No setup ritual. Open Superbinary, start typing, and
suggestions appear where your cursor already is.

### Visual Direction

Small sequence:

1. Download opens.
2. Superbinary appears in the menu bar.
3. User types in a familiar app.
4. Inline suggestion appears.

Keep this visual sparse and native. It should feel like a normal Mac app, not a
dashboard.

## Section 2: It Follows Your Thought

### Intent

Explain the emotional aha moment: the app helps complete the thought, not merely
save keystrokes.

### Headline

It follows the shape of your thought.

### Copy

Letter by letter, Superbinary follows what you are writing and offers the next
few words before you reach for them.

It does not pull you into a chat box. It stays at the cursor, where the thought
is already happening.

### Visual Direction

Use a sentence that evolves naturally. Show the ghost suggestion changing as the
typed phrase becomes clearer.

Example:

```
I wanted to follow up on
```

Then ghost:

```
 the launch notes from yesterday.
```

## Section 3: Tab, Tab, Tab

### Intent

Show control. The user should feel that Superbinary helps, but never takes over.

### Headline

Accept only what feels right.

### Copy

Tap Tab to accept the next word. Tap again to keep going. If the suggestion is
not your thought, keep typing and Superbinary gets out of the way.

### Visual Direction

Show word-by-word acceptance with a compact Tab pill. The movement should be
fast, crisp, and satisfying.

### Microcopy Candidates

- Tab accepts the next word.
- Keep typing to replace the suggestion.
- Esc dismisses it instantly.

## Section 4: Works Across Apps

### Intent

Make "system-wide" feel real without overexplaining implementation.

### Headline

Across the apps you already write in.

### Copy

Messages, notes, docs, email, project tools, browser fields. Superbinary is a Mac
autocomplete layer, not another place to write.

### Visual Direction

Use two intersecting logo marquees. One horizontal, one vertical or diagonal.
They should imply breadth without becoming noisy.

Possible logos to include only if legally/design-appropriate:

- Mail
- Messages
- Notes
- Safari
- Chrome
- Slack
- Notion
- Linear
- VS Code
- Google Docs

### Important Constraint

Do not imply official integrations or partnerships. This section should say the
app works across normal editable Mac fields, not that those companies endorse or
integrate with Superbinary.

## Section 5: MindSignal

### Intent

Give the context-awareness layer a proprietary name, Apple-style, without making
the product feel gimmicky.

### Feature Name

MindSignal

### Headline

Context, without the cloud.

### Copy

MindSignal helps Superbinary understand the context around your cursor, so
suggestions feel less like autocomplete and more like the thought you were
already reaching for.

It is built to notice enough to help, and stay quiet when it should.

### Visual Direction

Show subtle contextual hints flowing into the active line: current sentence,
nearby text, app context, and optional context signals. Keep it abstract enough
to feel premium, but not vague enough to look like generic AI decoration.

### Notes

This section should avoid saying "reads everything." The story is context
awareness with user control.

## Section 6: Privacy

### Intent

Answer trust objections calmly. This should feel like Apple privacy storytelling:
simple headline, confident claims, proof close by.

### Headline

Private means your thoughts stay with you.

### Copy

Superbinary completes your writing on your Mac. No cloud completion loop. No
training on your private text. No hidden dependency on a server.

The model ships with the app, so suggestions keep working offline. Private app
data is encrypted locally, with keys protected by macOS Keychain.

Unlock your Mac, unlock your workspace.

### Proof Blocks

#### Works Offline

The model is included with Superbinary. Turn off the internet and keep writing.

#### Firewall-Testable

Block outgoing connections with LuLu, Little Snitch, or Radio Silence.
Superbinary still completes your thoughts.

#### Locked To Your Mac

Private app data is encrypted locally with keys protected by macOS Keychain. Only
your Mac user account can unlock it.

### Visual Direction

Use a calm, high-contrast privacy chapter. Avoid fake badges. Prefer a simple
Mac-like privacy panel with three states:

- Offline
- No outgoing connections
- Keychain protected

### Claims That Must Be True Before Publishing

- "The model is included with Superbinary."
- "Turn off the internet and keep writing."
- "Block outgoing connections ... Superbinary still completes your thoughts."
- "Private app data is encrypted locally with keys protected by macOS Keychain."
- "No training on your private text."

## Section 7: Built Like A Mac App

### Intent

Differentiate from gimmicky AI tools and subscription-heavy competitors.

### Headline

Built like it belongs on your Mac.

### Copy

Quiet menu bar presence. Native behavior. Minimal surface area. Nothing flashy.
It just feels like it should have been there all along.

### Visual Direction

Show the menu bar icon, a compact settings/control menu, and the inline
suggestion in a familiar Mac window. The UI should look restrained, not
marketing-heavy.

## Section 8: Pricing

### Intent

Make the offer simple and low-friction.

### Headline

Try it free for 14 days.

### Copy

No credit card required.

Early birds get Superbinary for $49.99. Regular price $89.99.

### CTA

Download for Mac

### Optional Fine Print

For macOS. Built for Apple Silicon.

## Section 9: FAQ

### Does Superbinary work offline?

Yes. The launch version ships with the model included, so suggestions work
without an internet connection.

### Does my writing leave my Mac?

No. Superbinary completes your writing locally on your Mac. There is no cloud
completion loop and your private text is not used for training.

### Can I test that?

Yes. Block outgoing connections with LuLu, Little Snitch, or Radio Silence and
keep writing.

### Why does it need Mac permissions?

Superbinary needs permission to see the text field you are writing in and place
suggestions at the cursor. The page should explain each permission plainly during
onboarding, with controls to pause or quit the app.

### Is my local data encrypted?

Yes. Private app data is encrypted locally, with keys protected by macOS
Keychain.

### What happens if I do not like a suggestion?

Keep typing. Superbinary replaces the suggestion and follows your new direction.
You can also dismiss suggestions instantly.

### How do I accept a suggestion?

Tap Tab to accept the next word. Tap again to keep going.

### Who is Superbinary for?

Mac users who write constantly across apps: founders, builders, engineers,
creators, support teams, and anyone who wants thoughts to become text faster.

### Is this for teams?

Superbinary is starting as a personal Mac productivity tool. It is not positioned
as an enterprise admin or compliance platform.

## Final CTA

### Headline

Autocomplete your thoughts.

### Copy

Try Superbinary free for 14 days. No credit card required.

### CTA

Download for Mac

## Words To Avoid

- Revolutionary
- Magical
- Autonomous agent
- Reads everything
- Perfect everywhere
- Military-grade
- Enterprise-ready
- Copilot as primary positioning
- AI-powered as the main promise
- 10x
- Game changer
- Supercharge
- Future of productivity
- All-in-one
- Effortless unless tied to a specific interaction
- Zero-knowledge unless technically and legally verified
- No tracking unless audited and reflected in policy

## Tone Rules

- Premium, calm, native, and precise.
- Warm but not cute.
- Technically credible without sounding like a security product.
- Product-led before philosophy-led.
- Use Apple-style restraint, not Apple imitation.
- Prefer proof over badges.
- Prefer "works on your Mac" over abstract privacy slogans.

## Visual System Notes

- First viewport must show the product behavior, not a decorative hero.
- Use real or realistic Mac UI surfaces.
- Avoid generic AI glows, gradient orbs, or abstract brain imagery.
- The animated typing demo is the main asset.
- App logo marquees should support "works across apps," not dominate the page.
- Privacy visuals should look inspectable and calm.

## Open Decisions

- Final downloadable build format: `.dmg`, `.pkg`, or zipped `.app`.
- Exact macOS version requirement to show publicly.
- Whether to say Apple Silicon only or Apple Silicon recommended.
- Whether to mention Cotypist and Typeahead in comparison copy or keep
  competitors out of the page.
- Whether MindSignal appears on the main page or only in deeper product copy.
- Whether the first launch has a permission/privacy walkthrough.
