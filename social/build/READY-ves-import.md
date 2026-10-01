# VES video import: done, four posts scheduled and verified

**Imported Wed 2026-09-30 evening** into the Signature Branding & Marketing sub-account (`BRJc9fh3GQOimVGYkvxX`). Each post was re-read from the planner afterward.

| Caption opens with | Date | Time | Surface | Media | Status |
|---|---|---|---|---|---|
| Most people with a vision… | Fri 2 Oct | 9:00 AM | YouTube (video, public) | `ves-16x9.mp4` + `/vision/img/poster.jpg` thumbnail | Scheduled ✓ |
| Most people with a vision… | Sat 3 Oct | 12:00 PM | FB agency + LI agency (Feed) | `ves-16x9.mp4` | Scheduled ✓ |
| Most people with a vision… | Sun 4 Oct | 12:00 PM | Instagram (Reel) | `ves-vertical-9x16.mp4` | Scheduled ✓ |
| Getting a bunch of tools… | Tue 6 Oct | 9:00 AM | YouTube (Short) | `ves-vertical-9x16.mp4` | Scheduled ✓ |

There are no prices in any caption. The CTA is signaturebrandmarketing.com/vision. Instagram shows that URL as plain text, because the bio link goes to the assessment, which doesn't route to VES. Ken's LinkedIn profile is left out because it's Agent OS only.

Every slot was empty for that surface: YouTube had nothing after 10/1, and Sat 10/3 (FB/LI) and Sun 10/4 (IG) were both open.

## Gotchas from this import
- **Instagram with a 9:16 video imports as "Feed" from a Basic CSV.** Switch it to **Reel** on the review screen, then click **Save** ("updated successfully") before Schedule. Feed triggered an extra warning.
- **In the narrow browser pane, ref clicks on the review screen land in the wrong spot.** Clicking the radio input in JS (`input[value=reel]` → `.click()`) worked.
- **One warning remained on FB/LI and IG and couldn't be opened in the narrow pane.** It didn't block the import. The daily social-post monitor will catch a failed publish.
- **The Tax ID modal appears on load.** Close it with the X. Never fill it.
