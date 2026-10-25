"use strict";

const STORAGE_KEY = "intelligentDictionary.trie.v1";
const SEED_KEY = "intelligentDictionary.starterWords.v1";
const STARTER_WORDS = `
ability able about above abroad absence absolute absorb abstract absurd abuse access accident account achieve acid acoustic acquire across act action active actor actual adapt add address adjust admire admit adopt adult advance advice advise affair afford afraid after again agency agenda agent agree ahead aim air airport aisle alarm album alert alien align alike alive allow almost alone alpha already also alter always amazing ambition among amount amused analyst anchor ancient anger angle animal annual answer antenna antique anxiety any apart apology appear apple apply appoint approve april arch archive area argue arise arm around arrange arrest arrive art article artist artwork ask aspect assess asset assist assume athlete atom attack attend attitude attract auction audit august aunt author auto autumn available average avoid awake aware awesome
baby back background backup badge balance balcony ball banana band bank banner bar barely bargain barrel basic basket bath battery battle beach bean beauty because become bedroom before begin behave behind believe bell belong below benefit best better between beyond bicycle biology bird birth biscuit bitter black blade blame blanket blend bless blind block blood bloom blue board boat body bold book border borrow boss bottle bottom bounce boundary box boy brain branch brave bread break breakfast breathe brick bridge brief bright bring broad broken brother brown brush budget build bulb bullet bundle burden burger burn burst bus business busy button buy
cabin cable cafe calculate calendar calm camera camp campaign campus cancel cancer candidate candle candy canvas capable capital captain capture carbon card career careful cargo carpet carry cartoon case cash castle casual catalog catch category cause caution cave ceiling celebrate cell center central century ceremony certain chain chair challenge chance change chaos chapter character charge charity charm chart chase chat cheap check cheer cheese chef chemical chemistry chest chief child choice choose chronic cinema circle city civil claim class clean clear clever click client climate climb clinic clock close cloud clue cluster coach coast code coffee cognitive cold collect college color column combine comfort comic command comment common communicate community company compare compass compete compile complete complex computer concept concern concert conclude concrete condition conduct confidence connect conscious consent consider consist constant construct contact contain content contest context continue contract control convert cook cool cooperate copy coral corner correct cost cotton couch country courage course court cousin cover craft crash crazy cream create creative creature credit crew crime crisp criteria critic crop cross crowd crucial cruel crush culture curious current curtain curve custom customer cycle
daily damage dance danger daring dark data database date daughter dawn day debate debt decade decide decision declare decline decorate decrease deep defeat defend define degree delay delete deliver demand demonstrate denial dense dentist deny depart depend deposit depth design desk despair destroy detail detect develop device devote diagram dialogue diamond diary dictionary differ digital dignity dilemma dinner direct discover discuss disease dish display distance distinct divide doctor document dog domain door double doubt down draft drama draw dream dress drift drink drive drop drum dry duck during dust duty dynamic
each eager eagle early earn earth easily east easy echo ecology economic economy edit educate effect effort egg eight either elastic elder elect elegant element elevator eliminate elite else email embrace emerge emotion employ empower empty enable encourage end endless enemy energy engage engine enhance enjoy enough enrich enter entire entrance entry envelope environment equal equip era erase error escape essay essence establish estate estimate ethics evaluate evening event every evidence exact example excellent exchange excite exclude execute exercise exhibit exist expand expect expense experience experiment expert explain explore express extend extra eye
fabric face fact factor fade fail fair faith fall false familiar family famous fan fancy fantasy farm fashion fast fat father fault favor favorite feature federal feedback feel female fence festival fetch fever few fiber fiction field fierce figure file fill film filter final finance find fine finger finish fire firm first fish fit five fix flag flame flash flat flavor fleet flesh flight flip float floor flower fluid focus fold follow food foot force forest forever forget formal format former formula forward foundation frame free freedom freeze frequent fresh friend front fruit fuel fun function fund funny future
gain galaxy game gap garage garden garlic garment gas gate gather general generate gentle genuine geography gesture ghost giant gift ginger girl give glad glance glass global globe glory glove go goal gold golden good govern grace grade grain grammar grand grant grape graph grateful grave gray great green grid grocery ground group grow growth guard guess guest guide guitar gym
habit hair half hall hand handle happy harbor hard harm harvest hat have hawk head health heart heat heavy hello help hero hidden high highlight history hobby hold holiday home honest honey honor hope horizon horror horse hospital host hotel hour house hover human humble humor hundred hungry hunt hurry hurt hybrid
ice idea ideal identify identity idle ignore image imagine impact implement important improve include income increase index indicate industry infant influence inform initial innovation input inquiry inside insight inspire install instance instant instead instrument insurance integrate intelligence intelligent intend interest interface internal internet interview introduce invent invest invite involve iron island issue item ivory
jacket jaguar jam jar jazz jealous jeans jelly jewel job join joke journey joy judge juice jump jungle junior just
keen keep kernel key keyboard kick kid kind kingdom kitchen kite knee knife knock know knowledge known
label labor laboratory ladder lady lake lamp language laptop large laser last late laugh launch layer lead learn leather leave lecture left leg legal legend leisure lemon lend length lesson letter level library license life lift light like limit line link lion liquid list listen little live load local locate location lock logic lonely long look loop loss loud love loyal lucky lunch luxury
machine magazine magic magnet main maintain major make manage manner manual many map marble march margin marine mark market master match material math matter maximum maybe meadow mean measure meat mechanic medal media medical medium meet melody member memory mental mention menu merge message method middle might mild military milk mind mineral minimum minor minute mirror mission mistake mix mobile model modern modest modify module moment monitor monkey month mood moral morning motion motor mountain mouse mouth move movie much multiply muscle museum music mutual mystery
name narrow nation native natural nature near neat necessary neck need negative negotiate neighbor neither nerve network neutral never new news next nice night nine noble noise normal north note novel number nurse nut
object objective observe obtain obvious occasion ocean october odd offer office often oil okay old olive once one online only open operate opinion opportunity option orange orbit order ordinary organize origin original other outcome output outside outstanding oven over own oxygen
pace package page pain paint pair palace pale pan panel paper parent park part partner party pass passion patient pattern pause peace peak pearl pencil people pepper perfect perform period person personal phase phone photo phrase physical piano picture piece pile pilot pink pioneer pipe place plan planet plant plastic plate play pleasant please plot plug plus pocket poem poet point polar police policy polite popular population position positive possible post potato potential power practice praise predict prefer prepare present press pressure pretty prevent previous price pride primary print priority private prize problem process produce product profession profile program progress project promise promote proof proper property protect proud prove provide public publish pull pulse purpose push puzzle python
quality quantity quarter queen query question quick quiet quit quiz quote
rabbit race radio rail rain raise range rapid rare rate rather reach react read ready real reason receive recent recipe recognize recommend record recover reduce refer reflect reform refresh refuse region register regular relate relax release relief rely remain remember remove render renew rent repair repeat replace reply report request require research reserve resist resource respect respond result return reveal review reward rhythm rice rich ride right ring rise risk river road robot rock role roll roof room root rose rough round route routine row royal rule run rural rush
sacred safe sail salad salary sale salt same sample sand satisfy sauce save scale scan scene schedule school science score screen script search season seat second secret section secure see seed seek select self sell send sense sentence separate series serious serve service session set settle setup seven shade shadow shape share sharp sheet shelf shell shift shine ship shirt shock shoe shoot shop short show shrink sick side sight sign signal silence silver simple since sing single sister site situation size skill skin sky sleep slice slide slight smart smile smoke smooth snake social soft software soil solar solution solve some someone song soon sort sound source south space speak special species specific speech speed spell spend sphere spice spider spirit split sport spot spread spring square stable staff stage standard star start state station stay steady steam steel step stick still stock stone stop storage story strategy stream street strength stress strict strike string strong structure student study style subject submit success successful sudden suffer suggest summary summer sun supply support sure surface surprise surround survey survive suspect sustain sweet swift switch symbol system
table tackle tail take talent talk tall task taste teach team technology tell temperature temporary tend term test text thank theme theory there thick thin thing think third thorough thought thread three thrive throw thumb thunder ticket tidy tie tiger time tiny tip title today together token tomorrow tone tool top topic torch total touch tough tour toward tower town track trade tradition traffic train transfer transform translate travel tree trend trial tribe trick trigger trim trip trouble true trust truth try tube tune turn tutorial twin type typical
umbrella unable unaware uncle uncover under understand undo unfair unfold unfortunate uniform unique unit universe unknown unlock until unusual update upgrade uphold upon upper urban urge use useful user usual utility utilize
vacation valid valley valuable value vanish variety various vast vector vehicle venture version very vessel veteran viable vibrant video view village vintage virtual visible vision visit visual vital voice volume volunteer vote voyage
wage wait wake walk wall want warm warn wash waste watch water wave way wealth weapon weather web wedding week welcome well west wet whale what wheel when where whether which while whisper white whole wide wild will win wind window winter wise wish witness woman wonder wonderful wood word work world worry worth wrap write writer writing wrong
yard year yellow yes yesterday yield yoga young youth
zeal zebra zero zone zoo
`.trim().split(/\s+/);

function normalizeWord(value) {
  return String(value ?? "").trim().toLocaleLowerCase().replace(/\s+/g, "");
}

class TrieNode {
  constructor() { this.children = new Map(); this.isEndOfWord = false; this.frequency = 0; }
}
class TrieDictionary {
  constructor() { this.root = new TrieNode(); this.size = 0; }
  insert(input, frequency = 0) {
    const word = normalizeWord(input);
    if (!word || /\s/.test(word)) return false;
    let node = this.root;
    for (const character of word) {
      if (!node.children.has(character)) node.children.set(character, new TrieNode());
      node = node.children.get(character);
    }
    if (node.isEndOfWord) return false;
    node.isEndOfWord = true;
    node.frequency = Math.max(0, Number.isFinite(Number(frequency)) ? Math.floor(Number(frequency)) : 0);
    this.size++;
    return true;
  }
  getNode(input) {
    let node = this.root;
    for (const character of normalizeWord(input)) {
      node = node.children.get(character);
      if (!node) return null;
    }
    return node;
  }
  contains(input) { const node = this.getNode(input); return Boolean(node && node.isEndOfWord); }
  search(input) {
    const node = this.getNode(input);
    if (!node || !node.isEndOfWord) return null;
    node.frequency++;
    return node.frequency;
  }
  delete(input) {
    const word = normalizeWord(input);
    if (!word) return false;
    const chars = Array.from(word);
    let deleted = false;
    const prune = (node, index) => {
      if (index === chars.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false; node.frequency = 0; deleted = true;
        return node.children.size === 0;
      }
      const ch = chars[index], child = node.children.get(ch);
      if (!child) return false;
      if (prune(child, index + 1)) node.children.delete(ch);
      return !node.isEndOfWord && node.children.size === 0;
    };
    prune(this.root, 0);
    if (deleted) this.size--;
    return deleted;
  }
  wordsWithPrefix(prefix = "") {
    const normalized = normalizeWord(prefix), start = this.getNode(normalized);
    if (!start) return [];
    const results = [];
    const collect = (node, current) => {
      if (node.isEndOfWord) results.push({ word: current, frequency: node.frequency });
      for (const [ch, child] of [...node.children].sort(([a], [b]) => a.localeCompare(b))) collect(child, current + ch);
    };
    collect(start, normalized);
    return results;
  }
  allWords() { return this.wordsWithPrefix(""); }
  countNodes() {
    let count = 0;
    const visit = node => { count++; for (const child of node.children.values()) visit(child); };
    visit(this.root); return count;
  }
}

function loadDictionary() {
  const trie = new TrieDictionary();
  let loadedSavedData = false;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const entries = JSON.parse(saved);
      if (Array.isArray(entries)) {
        for (const entry of entries) {
          if (Array.isArray(entry) && typeof entry[0] === "string") trie.insert(entry[0], entry[1]);
        }
        loadedSavedData = true;
      }
    }
  } catch { /* Use starter words if saved data is unavailable or invalid. */ }
  // Seed the expanded vocabulary once, including for people who already had the earlier demo version.
  // A marker prevents intentionally deleted starter words from reappearing on every reload.
  let seeded = false;
  try { seeded = localStorage.getItem(SEED_KEY) === "done"; } catch { /* storage may be unavailable */ }
  if (!seeded) {
    STARTER_WORDS.forEach(word => trie.insert(word));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trie.allWords().map(({ word, frequency }) => [word, frequency])));
      localStorage.setItem(SEED_KEY, "done");
    } catch { /* starter words remain available for this session */ }
  }
  return { trie, loadedSavedData };
}

const loaded = loadDictionary();
const dictionary = loaded.trie;
let sortMode = "alpha";
let activePrefix = "";

const $ = selector => document.querySelector(selector);
const searchInput = $("#search-input");
const suggestionList = $("#suggestion-list");
const searchFeedback = $("#search-feedback");
const manageInput = $("#manage-input");
const manageFeedback = $("#manage-feedback");
const dictionaryFilter = $("#dictionary-filter");

function saveDictionary() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dictionary.allWords().map(({ word, frequency }) => [word, frequency]))); }
  catch { /* The app remains usable for this session if browser storage is disabled. */ }
}
function sortWords(words) {
  return words.sort((a, b) => sortMode === "frequency" && a.frequency !== b.frequency ? b.frequency - a.frequency : a.word.localeCompare(b.word));
}
function appendHighlightedWord(container, word, prefix) {
  if (!prefix || !word.startsWith(prefix)) { container.textContent = word; return; }
  const mark = document.createElement("mark");
  mark.textContent = word.slice(0, prefix.length);
  container.append(mark, document.createTextNode(word.slice(prefix.length)));
}
function renderSuggestions(prefix = activePrefix) {
  activePrefix = normalizeWord(prefix);
  const matches = activePrefix ? sortWords(dictionary.wordsWithPrefix(activePrefix)) : [];
  $("#prefix-label").textContent = activePrefix ? `Prefix “${activePrefix}”` : "Start with a prefix";
  $("#suggestion-count").textContent = `${matches.length} ${matches.length === 1 ? "MATCH" : "MATCHES"}`;
  $("#clear-search").classList.toggle("visible", Boolean(searchInput.value));
  suggestionList.replaceChildren();
  if (!activePrefix) {
    const empty = document.createElement("div");
    empty.className = "suggestion-empty";
    empty.innerHTML = "Type a prefix to see matching words.<br><b>Try app, cre, des, tre, or com.</b>";
    suggestionList.append(empty); return;
  }
  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "suggestion-empty";
    empty.textContent = `No suggestions for “${activePrefix}”. Add a word with this prefix to get started.`;
    suggestionList.append(empty); return;
  }
  for (const entry of matches.slice(0, 100)) {
    const row = document.createElement("button");
    row.className = "suggestion-row"; row.type = "button";
    row.setAttribute("aria-label", `Search for ${entry.word}, searched ${entry.frequency} times`);
    const word = document.createElement("span"); word.className = "suggestion-word";
    appendHighlightedWord(word, entry.word, activePrefix);
    const meta = document.createElement("span"); meta.className = "suggestion-meta";
    meta.textContent = `${entry.frequency} ${entry.frequency === 1 ? "search" : "searches"}`;
    const arrow = document.createElement("span"); arrow.className = "suggestion-arrow"; arrow.setAttribute("aria-hidden", "true"); arrow.textContent = "↗";
    row.append(word, meta, arrow);
    row.addEventListener("click", () => searchExact(entry.word));
    suggestionList.append(row);
  }
}
function renderStats() {
  const words = dictionary.allWords();
  const total = words.reduce((sum, entry) => sum + entry.frequency, 0);
  const popular = [...words].sort((a, b) => b.frequency - a.frequency || a.word.localeCompare(b.word))[0];
  $("#stat-words").textContent = String(dictionary.size);
  $("#stat-searches").textContent = String(total);
  $("#stat-popular").textContent = popular && popular.frequency > 0 ? popular.word : "—";
}
function renderDictionary() {
  const tbody = $("#word-list");
  const allWords = sortWords(dictionary.allWords());
  const query = normalizeWord(dictionaryFilter.value);
  const hasQuery = query.length > 0;
  // Keep the large vocabulary in the Trie, but do not show the full list on page load.
  const visible = hasQuery ? allWords.filter(entry => entry.word.includes(query)) : [];
  tbody.replaceChildren();

  $("#dictionary-count").textContent = hasQuery
    ? `${visible.length} ${visible.length === 1 ? "word" : "words"} found`
    : `${dictionary.size} words available`;
  $("#dictionary-empty").hidden = dictionary.size !== 0;
  $("#filter-empty").hidden = !(hasQuery && dictionary.size > 0 && visible.length === 0);

  let browseHint = $("#dictionary-browse-hint");
  if (!browseHint) {
    browseHint = document.createElement("div");
    browseHint.id = "dictionary-browse-hint";
    browseHint.className = "dictionary-browse-hint";
    browseHint.textContent = "Your words will appear here when you search. Try typing a few letters above.";
    $(".word-table-wrap").append(browseHint);
  }
  browseHint.hidden = dictionary.size === 0 || hasQuery;

  for (const entry of visible) {
    const row = document.createElement("tr");
    const wordCell = document.createElement("td"); wordCell.textContent = entry.word;
    const freqCell = document.createElement("td"); freqCell.textContent = String(entry.frequency);
    const actionCell = document.createElement("td");
    const remove = document.createElement("button"); remove.type = "button"; remove.className = "row-delete";
    remove.textContent = "×"; remove.setAttribute("aria-label", `Delete ${entry.word}`); remove.title = `Delete ${entry.word}`;
    remove.addEventListener("click", () => deleteWord(entry.word));
    actionCell.append(remove); row.append(wordCell, freqCell, actionCell); tbody.append(row);
  }
}
function render() { renderSuggestions(); renderStats(); renderDictionary(); }
function setFeedback(element, message, kind = "") { element.textContent = message; element.dataset.kind = kind; }
function searchExact(input) {
  const word = normalizeWord(input);
  if (!word) { setFeedback(searchFeedback, "Enter a word or prefix to search.", "error"); searchInput.focus(); return; }
  searchInput.value = word; activePrefix = word;
  const frequency = dictionary.search(word);
  render(); saveDictionary();
  if (frequency !== null) setFeedback(searchFeedback, `“${word}” found · searched ${frequency} ${frequency === 1 ? "time" : "times"}.`, "success");
  else setFeedback(searchFeedback, `“${word}” is not a complete word in the dictionary. Suggestions are shown for its prefix.`, "error");
}
function addWord() {
  const word = normalizeWord(manageInput.value);
  if (!word) { setFeedback(manageFeedback, "Enter a word to add.", "error"); manageInput.focus(); return; }
  if (/\s/.test(String(manageInput.value).trim())) { setFeedback(manageFeedback, "Enter one word at a time, without spaces.", "error"); manageInput.focus(); return; }
  if (!dictionary.insert(word)) { setFeedback(manageFeedback, `“${word}” is already in the dictionary.`, "error"); return; }
  saveDictionary(); manageInput.value = ""; render(); setFeedback(manageFeedback, `Added “${word}” to the dictionary.`, "success");
}
function deleteWord(input) {
  const word = normalizeWord(input);
  if (!word) { setFeedback(manageFeedback, "Enter a word to delete.", "error"); manageInput.focus(); return; }
  if (!dictionary.delete(word)) { setFeedback(manageFeedback, `“${word}” was not found as a complete word.`, "error"); return; }
  saveDictionary(); render(); setFeedback(manageFeedback, `Deleted “${word}” from the dictionary.`, "success");
}
searchInput.addEventListener("input", () => {
  activePrefix = normalizeWord(searchInput.value); renderSuggestions(activePrefix);
  setFeedback(searchFeedback, activePrefix ? "Choose a suggestion to record a search, or press Enter for an exact word." : "Type a prefix or try one of the examples below.");
});
searchInput.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); searchExact(searchInput.value); } });
$("#clear-search").addEventListener("click", () => { searchInput.value = ""; activePrefix = ""; renderSuggestions(""); setFeedback(searchFeedback, "Search cleared. Type a prefix to begin."); searchInput.focus(); });
document.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => {
  sortMode = button.dataset.sort;
  document.querySelectorAll("[data-sort]").forEach(item => { const selected = item === button; item.classList.toggle("is-active", selected); item.setAttribute("aria-pressed", String(selected)); });
  renderSuggestions(); renderDictionary();
}));
document.querySelectorAll("[data-prefix]").forEach(button => button.addEventListener("click", () => {
  searchInput.value = button.dataset.prefix; activePrefix = normalizeWord(button.dataset.prefix);
  renderSuggestions(activePrefix); setFeedback(searchFeedback, `Showing words that start with “${activePrefix}”.`); searchInput.focus();
}));
$("#add-button").addEventListener("click", addWord);
$("#delete-button").addEventListener("click", () => deleteWord(manageInput.value));
manageInput.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); addWord(); } });
dictionaryFilter.addEventListener("input", renderDictionary);

render();
if (!loaded.loadedSavedData) saveDictionary();
