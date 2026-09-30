# Soundcheck audio catalogue

The player no longer searches Apple or any remote catalogue. `public/sound-tracks.json` is the answer list; `public/sound-sources.json` contains only installed recordings. It is currently empty: no real OST playback has been verified.

To activate a track, add an authorized recording under `public/audio/soundcheck/` and an entry keyed by the corresponding track ID:

```json
{
  "1": {
    "src": "/audio/soundcheck/recording.mp3",
    "startSeconds": 0,
    "sourceUrl": "https://rightsholder.example/permission",
    "attribution": "Required credits and permission notice"
  }
}
```

This is a schema example, not an installed recording or permission. Supported extensions: mp3, m4a, ogg, wav. Filenames must use letters, numbers, underscores or hyphens. The source must have at least 12 seconds after the starting offset. Confirm source/permission and test real playback, including mobile, before enabling a recording. The player checks metadata but this alone does not prove successful decoding or audible content.

Runs contain up to five configured recordings, without repeats. Failed recordings can be skipped without score penalties; the run length shrinks if necessary. With no recordings, no round starts and the page links to other modes.

Run `node scripts/check-sound-player.cjs` for simulated media-event checks. These do not validate real files or rights. `/api/soundtrack` returns 410 with a reload message for old cached clients and performs no upstream requests.
