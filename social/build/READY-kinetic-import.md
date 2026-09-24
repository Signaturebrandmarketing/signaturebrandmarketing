# Kinetic import — DONE, all six scheduled and verified

**Imported 2026-09-23 night.** Four separate imports into the Signature Branding & Marketing sub-account (`BRJc9fh3GQOimVGYkvxX`). Every post re-read from the planner afterward — date, status and social count all confirmed against what was intended.

| Caption opens with | Date | Time | Socials | Status |
|---|---|---|---|---|
| Every insurance agent I talk to… | Mon 28 Sep 2026 | 8:00 AM | 1 · Ken's LinkedIn | Scheduled ✓ |
| Four words that sort… | Tue 29 Sep 2026 | 12:00 PM | 2 · FB + LI agency | Scheduled ✓ |
| $3,500 a month… | Thu 1 Oct 2026 | 12:00 PM | 1 · Instagram | Scheduled ✓ |
| You already do this for free. | Fri 2 Oct 2026 | 12:00 PM | 1 · FB AI Branding | Scheduled ✓ |
| Two weeks. No phone, no laptop. | Tue 6 Oct 2026 | 12:00 PM | 1 · Instagram | Scheduled ✓ |
| A brand over here… | Thu 8 Oct 2026 | 12:00 PM | 2 · FB + LI agency | Scheduled ✓ |

Every one lands on a day that surface was previously empty — one extra post per surface per week, no flooding. All weekdays checked individually; one placement had drifted to Sat 3 Oct and was moved to Fri 2 Oct before import.

Media: all six `.mp4` live and returning 200 at `https://signaturebrandmarketing.com/social/ads/`.

---

## ⚠️ The account is on billing hold

GHL: *"Your account is currently on hold because we've been unable to charge your card."* The login wall has a **"Want to pay later? Go to dashboard"** button that gets you past it — that's how these imports were done, at Ken's instruction, and the bypass persists as `lockoutSkipped` in localStorage.

**Unknown and worth watching: whether scheduled posts actually publish while the account is on hold.** The planner accepts imports fine, but accepting a schedule and executing it are different systems. The social-post monitor runs daily at 9:19am and checks post outcomes — if publishing is blocked, the Sep 28 post is the first one that would show it, and the monitor will report it on the 29th.

Fix the card and the question goes away.

---

## Gotchas paid for during this import (read before the next one)

- **"Select all" ignores the search filter.** Filtering to two accounts and clicking Select all selected *all ten*. Caught it on the review screen. **Always tick the boxes individually**, or verify the avatar count in "Post to" before clicking Create.
- **Don't emulate a viewport.** `resize_window` to 1440×900 made GHL paint into a tiny corner and clicks landed nowhere. Clearing emulation (`preset: desktop`) and using `scroll_to` on a ref to bring the button into the narrow pane worked every time.
- **The New Post dropdown sometimes needs a second click** if the first one lands while a scroll is still settling.
- **File injection:** build a `File`, drop a real `DragEvent` + `DataTransfer` on `input.closest('.hr-upload')`, then set `input.files` and fire `change` as a fallback. `input.files.length` reads **0** afterward because the component consumes the drop — that is not a failure; check the filename in the UI instead.
- **Verification:** the planner's caption search box is the fastest check. Row cells are `[1]=caption [3]=status [5]=date [6]=socials`, and the socials cell holds **two images per account** (avatar + platform badge), so divide by two.
