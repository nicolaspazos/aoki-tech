/* =====================================================================
 * build-en.js
 * ---------------------------------------------------------------------
 * Generates /en/index.html from index.html + TRANS.en in js/main.js.
 *
 * Run: node build-en.js
 *
 * Zero dependencies. Uses only Node built-ins. Safe to run repeatedly.
 *
 * How it works:
 *   1. Reads js/main.js and pulls the TRANS object literal from between
 *      the /*__I18N_START__* / and /*__I18N_END__* / sentinel comments.
 *      Evaluates it in a sandboxed Function call (no eval, no imports).
 *   2. Reads index.html and walks it with targeted regex/string surgery:
 *        - <html lang/data-lang>         → 'en'
 *        - <title>                       → TRANS.en['meta.title']
 *        - <meta name="description">     → TRANS.en['meta.description']
 *        - <meta property="og:title">    → TRANS.en['meta.title']
 *        - <meta property="og:description"> → TRANS.en['meta.description']
 *        - <meta property="og:locale">   → en_US
 *        - <meta property="og:locale:alternate"> → es_AR
 *        - <meta property="og:url">      → https://aokitech.com.ar/en/
 *        - <link rel="canonical">        → https://aokitech.com.ar/en/
 *        - JSON-LD description           → English variant
 *        - <img data-logo-swap>          → src = data-logo-en
 *        - [data-i18n]           (text)         → TRANS.en[key]
 *        - [data-i18n-html]      (innerHTML)    → TRANS.en[key]
 *        - [data-i18n-placeholder] (attr)       → TRANS.en[key]
 *   3. Writes the result to en/index.html.
 *
 * This script is the single source of truth for the /en/ file — never
 * hand-edit en/index.html, always re-run the script after changing copy.
 * ===================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC_HTML = path.join(ROOT, 'index.html');
const SRC_JS = path.join(ROOT, 'js', 'main.js');
const OUT_DIR = path.join(ROOT, 'en');
const OUT_HTML = path.join(OUT_DIR, 'index.html');

const CANONICAL_HOST = 'https://aokitech.com.ar';

// --- 1. Extract TRANS from js/main.js -------------------------------------

function extractTrans() {
  const js = fs.readFileSync(SRC_JS, 'utf8');
  const startMarker = '/*__I18N_START__*/';
  const endMarker = '/*__I18N_END__*/';
  const start = js.indexOf(startMarker);
  const end = js.indexOf(endMarker);
  if (start === -1 || end === -1) {
    throw new Error(
      'Could not find I18N sentinel comments in js/main.js. ' +
      'Expected /*__I18N_START__*/ ... /*__I18N_END__*/ around const TRANS = { ... };'
    );
  }
  const literal = js.slice(start + startMarker.length, end).trim();
  // The literal is a JS object expression with quoted keys and string values.
  // new Function is safer than eval — it has no closure access to local scope.
  try {
    return new Function('return (' + literal + ')')();
  } catch (e) {
    throw new Error('Failed to parse TRANS object: ' + e.message);
  }
}

// --- 2. HTML surgery helpers ----------------------------------------------

function escapeHTML(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Replace the plain text content of every element tagged with
 * data-i18n="key". The element must contain only text (no nested tags).
 */
function replaceDataI18n(html, dict) {
  return html.replace(
    /(<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?\bdata-i18n=(["'])([^"']+)\3[^>]*?>)([^<]*)(<\/\2>)/g,
    (match, open, tag, quote, key, text, close) => {
      if (dict[key] === undefined) return match;
      return open + escapeHTML(dict[key]) + close;
    }
  );
}

/**
 * Replace the innerHTML of every element tagged with data-i18n-html="key".
 * Uses a depth-counting walk to find the matching close tag so nested
 * elements of the same tag name don't confuse us.
 */
function replaceDataI18nHtml(html, dict) {
  const attrRe = /<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?\bdata-i18n-html=(["'])([^"']+)\2[^>]*?>/g;
  let result = '';
  let cursor = 0;
  let m;
  while ((m = attrRe.exec(html)) !== null) {
    const tag = m[1];
    const key = m[3];
    const openStart = m.index;
    const openEnd = attrRe.lastIndex;

    // Append everything up to and including the opening tag.
    result += html.slice(cursor, openEnd);

    if (dict[key] === undefined) {
      cursor = openEnd;
      continue;
    }

    // Walk forward to find the matching close, counting nested opens.
    const openTagRe = new RegExp('<' + tag + '(?:[\\s>/])', 'gi');
    const closeTagRe = new RegExp('</' + tag + '\\s*>', 'gi');
    let depth = 1;
    let scan = openEnd;
    let closeIndex = -1;
    while (depth > 0) {
      openTagRe.lastIndex = scan;
      closeTagRe.lastIndex = scan;
      const nextOpen = openTagRe.exec(html);
      const nextClose = closeTagRe.exec(html);
      if (!nextClose) break;
      if (nextOpen && nextOpen.index < nextClose.index) {
        depth++;
        scan = nextOpen.index + nextOpen[0].length;
      } else {
        depth--;
        if (depth === 0) {
          closeIndex = nextClose.index;
        }
        scan = nextClose.index + nextClose[0].length;
      }
    }

    if (closeIndex === -1) {
      // Give up on this element and keep scanning from after the opening tag.
      cursor = openEnd;
      continue;
    }

    // Inject the English HTML as the new innerHTML, then skip past the close.
    result += dict[key];
    result += html.slice(closeIndex, scan); // the </tag> itself
    cursor = scan;
    attrRe.lastIndex = cursor;
  }
  result += html.slice(cursor);
  return result;
}

/**
 * Replace the placeholder attribute on every element tagged with
 * data-i18n-placeholder="key". Matches the entire opening tag as a
 * single blob, then does a narrow in-place replace of only the
 * placeholder= value — every other byte (whitespace, attribute order,
 * self-closing slash) is preserved untouched.
 */
function replaceDataI18nPlaceholder(html, dict) {
  return html.replace(
    /<[a-zA-Z][a-zA-Z0-9]*\b[^>]*>/g,
    (tagMatch) => {
      const keyMatch = tagMatch.match(/\bdata-i18n-placeholder=(["'])([^"']+)\1/);
      if (!keyMatch) return tagMatch;
      const key = keyMatch[2];
      if (dict[key] === undefined) return tagMatch;
      return tagMatch.replace(
        /\bplaceholder=(["'])[^"']*\1/,
        'placeholder="' + escapeHTML(dict[key]) + '"'
      );
    }
  );
}

/**
 * Rewrite relative asset paths to root-absolute so they resolve correctly
 * from /en/index.html. Only paths starting with one of the known top-level
 * asset prefixes are rewritten; hash links (#foo), fully-qualified URLs
 * (https://...), protocol-relative URLs (//...), and already-absolute
 * paths (/foo) are left alone.
 */
function rewriteAssetPaths(html) {
  const assetPrefixes = ['css/', 'js/', 'fonts/', 'images/', 'aoki-'];
  return html.replace(
    /(\b(?:href|src|content)=)(["'])([^"'#]+?)\2/g,
    (match, attrEq, quote, url) => {
      // Skip URLs that are already absolute, protocol-relative, or external
      if (url.startsWith('/') || url.startsWith('http') || url.startsWith('//') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        return match;
      }
      const matchesPrefix = assetPrefixes.some((p) => url.startsWith(p));
      if (!matchesPrefix) return match;
      return attrEq + quote + '/' + url + quote;
    }
  );
}

/**
 * Swap img src for logos that have both data-logo-es and data-logo-en.
 * In the pre-rendered EN file, the src should already be the English file
 * so Googlebot / non-JS renders show the right asset immediately.
 *
 * We match every <img ... > tag and only rewrite the src attribute on those
 * that carry data-logo-en — preserving the full original attribute order,
 * whitespace, and the self-closing " />" if present.
 */
function swapLogoSrc(html) {
  return html.replace(
    /<img\b([^>]*?)>/g,
    (match, attrs) => {
      const enMatch = attrs.match(/\bdata-logo-en=(["'])([^"']+)\1/);
      if (!enMatch) return match;
      const enFile = enMatch[2];
      const rewritten = attrs.replace(
        /\bsrc=(["'])[^"']*\1/,
        'src="' + enFile + '"'
      );
      return '<img' + rewritten + '>';
    }
  );
}

/**
 * Replace a single-attribute meta tag identified by its property/name.
 * Handles both <meta property="..."> and <meta name="...">.
 */
function replaceMetaContent(html, selectorAttr, selectorValue, newContent) {
  const re = new RegExp(
    '<meta\\s+' + selectorAttr + '=(["\'])' + escapeRegex(selectorValue) + '\\1\\s+content=(["\'])([^"\']*)\\2',
    'i'
  );
  return html.replace(re, (match, q1, q2) => {
    return '<meta ' + selectorAttr + '=' + q1 + selectorValue + q1 + ' content=' + q2 + escapeHTML(newContent) + q2;
  });
}

// --- 3. Transform ---------------------------------------------------------

function build() {
  const TRANS = extractTrans();
  if (!TRANS || !TRANS.en) {
    throw new Error('TRANS.en is empty or missing');
  }
  const en = TRANS.en;

  let html = fs.readFileSync(SRC_HTML, 'utf8');

  // <html lang="es" data-lang="es">  →  "en"
  html = html.replace(
    /<html\s+lang=(["'])es\1\s+data-lang=(["'])es\2>/i,
    '<html lang=$1en$1 data-lang=$2en$2>'
  );

  // <title>
  if (en['meta.title']) {
    html = html.replace(
      /<title>[\s\S]*?<\/title>/i,
      '<title>' + escapeHTML(en['meta.title']) + '</title>'
    );
  }

  // <meta name="description">
  if (en['meta.description']) {
    html = replaceMetaContent(html, 'name', 'description', en['meta.description']);
  }

  // Open Graph
  if (en['meta.title']) {
    html = replaceMetaContent(html, 'property', 'og:title', en['meta.title']);
  }
  if (en['meta.description']) {
    html = replaceMetaContent(html, 'property', 'og:description', en['meta.description']);
  }
  html = replaceMetaContent(html, 'property', 'og:locale', 'en_US');
  html = replaceMetaContent(html, 'property', 'og:locale:alternate', 'es_AR');
  html = replaceMetaContent(html, 'property', 'og:url', CANONICAL_HOST + '/en/');

  // Canonical — point at /en/ so it's self-canonical, not a duplicate of /
  html = html.replace(
    /<link\s+rel=(["'])canonical\1\s+href=(["'])[^"']*\2\s*\/?>/i,
    '<link rel=$1canonical$1 href=$2' + CANONICAL_HOST + '/en/' + '$2 />'
  );

  // JSON-LD — swap the Spanish description field for an English equivalent.
  // The rest of the JSON-LD block (schema.org @context, URLs, etc.) stays.
  html = html.replace(
    /"description":\s*"Plataforma l[^"]*"/,
    '"description": "The leading AI conversational automation platform for LATAM."'
  );

  // Walk every data-i18n* attribute and substitute the EN value.
  html = replaceDataI18nHtml(html, en);
  html = replaceDataI18n(html, en);
  html = replaceDataI18nPlaceholder(html, en);

  // Swap logo <img src> to the English asset.
  html = swapLogoSrc(html);

  // Rewrite relative asset paths to absolute. Without this, a resource
  // referenced as "css/styles.css" from /en/index.html would resolve to
  // /en/css/styles.css — which doesn't exist. Prepending "/" makes every
  // path root-relative so both /index.html and /en/index.html share the
  // same asset URLs. Hash links, absolute URLs, and protocol-relative
  // URLs are left untouched.
  html = rewriteAssetPaths(html);

  // Make sure the output directory exists, then write.
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_HTML, html, 'utf8');

  console.log(
    'Wrote ' + path.relative(ROOT, OUT_HTML) +
    ' (' + html.length + ' bytes, ' +
    Object.keys(en).length + ' translations applied)'
  );
}

build();
