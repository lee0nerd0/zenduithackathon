# Mini-Hackathon Starter — copy this into your repo tonight, test it, then stop tinkering

## Run it
```
npm install
npm start
# open http://localhost:3000
```

## What this is
Node + Express serving a static page. Data is `data/fleet.json` — mock JSON
standing in for MongoDB documents. No database server to start, no auth,
no build step. That is deliberate for a 90-minute build.

## On the day — adapt in this order
1. Replace `data/fleet.json` with the data they give you (paste / convert CSV to JSON).
2. Edit the ranking weights in `server.js` — keep them deterministic and explainable.
3. Edit `public/index.html` / `app.js` only for the one demo flow: ranked queue → detail → next action.
4. Do NOT add auth, a real DB, or a second user role in the 90 minutes.

## Fill this in at minute 80 (reviewers will ask)
- Problem (one sentence):
- User:
- Success metric:
- What I cut and why:
- What I'd build with another day / week:
- AI use + verification log: what I asked Claude, what I checked by hand / against the data:

## Git (tonight, in your repo)
```
git status
git add .
git commit -m "Add starter kit"
git push
```
