// World Clock SPA (vanilla JS)
// Responsibilities:
// - Maintain a minimal state (selected timezone)
// - Render a horizontal scroller with all available timezones
// - Update UI on user events (clicks) and refresh time every second

// ----- State & DOM cache -----
let selectedTimezone = 'Australia/Brisbane'; // default
const clockEl = document.getElementById('clock');
const cityNameEl = document.getElementById('city-name');
const dateEl = document.getElementById('date');
const coreCityButtons = Array.from(document.querySelectorAll('.city'));
const timezoneBarEl = document.getElementById('timezone-bar');

// ----- Helpers -----
function sanitizeTestId(tz){
  return tz.replace(/\//g, '-').replace(/\s+/g, '-').replace(/[^A-Za-z0-9-_]/g, '').toLowerCase();
}

function prettyLabelFromTimezone(tz){
  // show the last segment of the TZ (e.g., 'Australia/Brisbane' -> 'Brisbane')
  const part = tz.split('/').pop();
  return part ? part.replace(/_/g,' ') : tz;
}

function getAllTimeZones(){
  if (typeof Intl === 'object' && typeof Intl.supportedValuesOf === 'function'){
    try{ return Intl.supportedValuesOf('timeZone'); } catch(e){}
  }
  // Fallback: a reasonable subset if the runtime doesn't support supportedValuesOf
  return [
    'Pacific/Auckland','Australia/Brisbane','Asia/Tokyo','Asia/Kolkata',
    'Europe/London','Europe/Paris','Europe/Berlin','America/New_York',
    'America/Los_Angeles','America/Chicago','America/Denver','UTC'
  ];
}

function formatForTimezone(timezone){
  const now = new Date();
  const timeFormatter = new Intl.DateTimeFormat([], {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
    timeZone: timezone
  });
  const dateFormatter = new Intl.DateTimeFormat([], {
    year: 'numeric', month: 'short', day: 'numeric',
    timeZone: timezone
  });
  return { time: timeFormatter.format(now), date: dateFormatter.format(now) };
}

// ----- Rendering & UI updates -----
function updateClock(){
  const { time, date } = formatForTimezone(selectedTimezone);
  clockEl.textContent = time;
  dateEl.textContent = date;
}

function updateActiveStates(){
  // core city buttons (top row) - match by data-timezone if provided
  coreCityButtons.forEach(btn => {
    const tz = btn.dataset.timezone;
    if(tz === selectedTimezone){ btn.classList.add('active'); btn.setAttribute('aria-pressed','true'); }
    else { btn.classList.remove('active'); btn.setAttribute('aria-pressed','false'); }
  });

  // timezone bar buttons
  const tzButtons = Array.from(document.querySelectorAll('.tz-btn'));
  tzButtons.forEach(b => {
    const tz = b.dataset.timezone;
    if(tz === selectedTimezone) b.classList.add('active'); else b.classList.remove('active');
  });
}

function updateCityName(){
  cityNameEl.textContent = prettyLabelFromTimezone(selectedTimezone);
}

function selectTimezone(tz){
  // Event -> State change -> UI updates
  selectedTimezone = tz;
  updateCityName();
  updateActiveStates();
  updateClock();
}

// ----- Build timezone scroller -----
function buildTimezoneBar(){
  const zones = getAllTimeZones();
  timezoneBarEl.innerHTML = '';
  zones.forEach(tz => {
    const btn = document.createElement('button');
    btn.className = 'tz-btn';
    btn.type = 'button';
    btn.dataset.timezone = tz;
    btn.dataset.testid = sanitizeTestId(tz);
    btn.textContent = prettyLabelFromTimezone(tz);
    btn.title = tz;
    btn.addEventListener('click', () => selectTimezone(tz));
    timezoneBarEl.appendChild(btn);
  });
}

// ----- Event wiring for core top-row city buttons -----
function initCoreButtons(){
  coreCityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tz = btn.dataset.timezone;
      if(tz) selectTimezone(tz);
    });
  });
}

// ----- Initialization -----
function init(){
  buildTimezoneBar();
  initCoreButtons();
  updateCityName();
  updateActiveStates();
  updateClock();
  setInterval(updateClock, 1000);
}

init();

/* Summary comments:
 - When a timezone button is clicked, `selectTimezone` runs (Event).
 - `selectTimezone` updates the application state (`selectedTimezone`).
 - After state change it calls `updateCityName`, `updateActiveStates`, and
   `updateClock` to make the UI reflect the new state.
 - `setInterval` calls `updateClock` every second so time stays live.
*/
