// ZenduIT Mini-Hackathon starter — Node + Express, no DB server required.
// Run: npm install, then npm start, then open http://localhost:3000
// Data lives in data/fleet.json (mock JSON standing in for MongoDB documents).
// Ranking is DETERMINISTIC on purpose — see JD: "Keep numbers and
// safety-critical logic deterministic" — never let an LLM invent a score.
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function loadFleet() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'fleet.json'), 'utf8'));
}

// Deterministic ranking — edit the weights, don't let AI invent them:
// safety (40) > non-reporting (30) > GPS-frozen (20) > fault/maintenance (15) > ops (5)
// Duplicates are removed by eventId BEFORE scoring.
function rankFleet(vehicles) {
  const seenEvents = new Set();
  return vehicles
    .map((v) => {
      let score = 0;
      const reasons = [];
      const uniqueEvents = (v.events || []).filter((e) => {
        if (e.id && seenEvents.has(e.id)) return false;
        if (e.id) seenEvents.add(e.id);
        return true;
      });
      v = { ...v, events: uniqueEvents };
      if (uniqueEvents.some((e) => e.type === 'safety')) { score += 40; reasons.push('Safety event'); }
      if (v.status === 'not-reporting') { score += 30; reasons.push('Not reporting — cannot see vehicle'); }
      if (v.status === 'gps-frozen') { score += 20; reasons.push('GPS frozen, cellular OK — GPS problem, not cellular'); }
      if (uniqueEvents.some((e) => e.type === 'fault' || e.type === 'maintenance')) { score += 15; reasons.push('Fault / maintenance due'); }
      if (uniqueEvents.some((e) => e.type === 'ops')) { score += 5; reasons.push('Ops / coaching item'); }
      return { ...v, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

app.get('/api/fleet', (req, res) => {
  res.json(rankFleet(loadFleet()));
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
