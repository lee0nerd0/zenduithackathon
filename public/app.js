// Fetches the ranked queue from /api/fleet and renders it.
// Keep this file boring on purpose: the interesting logic is the ranking in server.js.
async function load() {
  const res = await fetch('/api/fleet');
  const items = await res.json();
  const board = document.getElementById('board');
  board.innerHTML = items.map((v, i) => `
    <div class="card">
      <div><strong>${i + 1}. ${v.vehicle}</strong> — ${v.driver} · ${v.device} · last report ${v.lastReport}</div>
      <div class="score">Score: ${v.score} — ${v.reasons.join('; ') || 'No exceptions'}</div>
      <div>${(v.events || []).map(e => e.label).join('<br>') || 'Nothing to do.'}</div>
      <button onclick="this.textContent='✓ Action logged (demo)'; this.disabled=true">Log next action</button>
    </div>`).join('');
}
load();
