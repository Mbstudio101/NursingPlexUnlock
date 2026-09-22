import { useState, useEffect } from 'react';
import { Shield, BookOpen, ChevronDown, ChevronUp, Copy, Check, Zap, AlertTriangle, ExternalLink, Lock, Unlock, Eye, GraduationCap } from 'lucide-react';
import ScrapedQuestions from './ScrapedQuestions';
import QuizView from './QuizView';

// The bookmarklet script - TARGETED at actual NursingPlex DOM structure
const BOOKMARKLET_SCRIPT = `javascript:void(function(){
(function(){
  'use strict';
  
  /* ===== 1. Remove blur from locked question lists ===== */
  /* NursingPlex uses Tailwind classes on <ol> elements:
     [&>li]:blur-[3px] [&>li]:opacity-60 [&>li]:pointer-events-none [&>li]:select-none */
  var lockedLists = document.querySelectorAll('ol.review-questions-list');
  lockedLists.forEach(function(ol) {
    /* Remove blur, opacity, pointer-events, select-none from the ol and its li children */
    ol.style.cssText += ';filter:none!important;-webkit-filter:none!important;';
    ol.querySelectorAll(':scope > li').forEach(function(li) {
      li.style.filter = 'none';
      li.style.webkitFilter = 'none';
      li.style.opacity = '1';
      li.style.pointerEvents = 'auto';
      li.style.userSelect = 'auto';
      li.style.webkitUserSelect = 'auto';
    });
    /* Remove the Tailwind blur classes from the className */
    var cls = ol.className || '';
    cls = cls.replace(/\\[&>li\\]:blur-\\[3px\\]/g, '');
    cls = cls.replace(/\\[&>li\\]:opacity-60/g, '');
    cls = cls.replace(/\\[&>li\\]:pointer-events-none/g, '');
    cls = cls.replace(/\\[&>li\\]:select-none/g, '');
    ol.className = cls.trim();
  });
  
  /* ===== 2. Remove "Unlock the blurred questions" banners ===== */
  var allDivs = document.querySelectorAll('div');
  allDivs.forEach(function(div) {
    var h2 = div.querySelector('h2');
    if (h2 && h2.textContent && h2.textContent.indexOf('Unlock') !== -1) {
      /* This is the upsell banner container */
      var parent = div.parentElement;
      if (parent) parent.remove();
      else div.remove();
    }
  });
  
  /* ===== 3. Inject override stylesheet ===== */
  var existing = document.getElementById('npx-unlock-styles');
  if (existing) existing.remove();
  
  var css = document.createElement('style');
  css.id = 'npx-unlock-styles';
  css.textContent = [
    /* Force-remove blur on all review question list items */
    'ol.review-questions-list > li {',
    '  filter: none !important;',
    '  -webkit-filter: none !important;',
    '  opacity: 1 !important;',
    '  pointer-events: auto !important;',
    '  user-select: auto !important;',
    '  -webkit-user-select: auto !important;',
    '}',
    'ol.review-questions-list {',
    '  filter: none !important;',
    '  -webkit-filter: none !important;',
    '}',
    /* Hide all unlock/upsell banners */
    'div:has(> div > div > h2) { }',
    '/* Target the specific banner structure */',
    '[class*="z-10"][class*="my-5"] { display: none !important; }',
    /* Remove any remaining blur overlays */
    '.blur, [class*="blur-"] { filter: none !important; -webkit-filter: none !important; }',
    /* Allow text selection everywhere */
    '.review-shell, .review-shell * { user-select: auto !important; -webkit-user-select: auto !important; }',
    /* Remove any fixed/sticky paywall overlays */
    '[class*="fixed"][class*="inset"], [class*="fixed"][class*="top-0"][class*="left-0"] { ',
    '  display: none !important;',
    '}',
    /* Ensure page can scroll */
    'body { overflow: auto !important; }',
    'html { overflow: auto !important; }'
  ].join('\\n');
  document.head.appendChild(css);
  
  /* ===== 4. MutationObserver to keep restrictions removed ===== */
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        /* Check if a new locked list was added */
        if (node.tagName === 'OL' && node.classList.contains('review-questions-list')) {
          node.querySelectorAll(':scope > li').forEach(function(li) {
            li.style.filter = 'none';
            li.style.opacity = '1';
            li.style.pointerEvents = 'auto';
            li.style.userSelect = 'auto';
          });
          var cls = node.className || '';
          cls = cls.replace(/\\[&>li\\]:blur-\\[3px\\]/g, '');
          cls = cls.replace(/\\[&>li\\]:opacity-60/g, '');
          cls = cls.replace(/\\[&>li\\]:pointer-events-none/g, '');
          cls = cls.replace(/\\[&>li\\]:select-none/g, '');
          node.className = cls.trim();
        }
        /* Check if a new upsell banner was added */
        if (node.tagName === 'DIV') {
          var h2 = node.querySelector && node.querySelector('h2');
          if (h2 && h2.textContent && h2.textContent.indexOf('Unlock') !== -1) {
            node.remove();
          }
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
  /* ===== 5. Show notification ===== */
  var notification = document.createElement('div');
  notification.id = 'npx-unlock-toast';
  notification.style.cssText = 'position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#10b981,#06b6d4);color:white;padding:14px 22px;border-radius:12px;font-family:system-ui,-apple-system,sans-serif;font-size:14px;font-weight:600;z-index:999999;box-shadow:0 8px 32px rgba(16,185,129,0.4);transition:all 0.4s ease;max-width:320px;';
  notification.innerHTML = '✓ <strong>NursingPlex Unlock</strong><br><span style="font-weight:400;font-size:12px;opacity:0.9">All questions unblurred &amp; selectable</span>';
  document.body.appendChild(notification);
  setTimeout(function(){ notification.style.opacity = '0'; notification.style.transform = 'translateY(-10px)'; }, 3500);
  setTimeout(function(){ notification.remove(); }, 4000);
  
  /* Count results */
  var unblurred = document.querySelectorAll('ol.review-questions-list').length;
  console.log('[NursingPlex Unlock] Active! Unblurred ' + unblurred + ' question lists. MutationObserver running.');
})();
})()`;

// Cleaner display version of the script
const SCRIPT_DISPLAY = `(function() {
  'use strict';

  // 1. Remove blur from all locked question lists
  //    NursingPlex applies these Tailwind classes to <ol> elements:
  //    [&>li]:blur-[3px] [&>li]:opacity-60
  //    [&>li]:pointer-events-none [&>li]:select-none
  var lockedLists = document.querySelectorAll('ol.review-questions-list');
  lockedLists.forEach(function(ol) {
    ol.style.filter = 'none';
    ol.querySelectorAll(':scope > li').forEach(function(li) {
      li.style.filter = 'none';
      li.style.opacity = '1';
      li.style.pointerEvents = 'auto';
      li.style.userSelect = 'auto';
    });
    // Strip the Tailwind blur classes
    ol.className = ol.className
      .replace(/\\[&>li\\]:blur-\\[3px\\]/g, '')
      .replace(/\\[&>li\\]:opacity-60/g, '')
      .replace(/\\[&>li\\]:pointer-events-none/g, '')
      .replace(/\\[&>li\\]:select-none/g, '')
      .trim();
  });

  // 2. Remove "Unlock the blurred questions" banners
  document.querySelectorAll('div').forEach(function(div) {
    var h2 = div.querySelector('h2');
    if (h2 && h2.textContent.includes('Unlock')) {
      (div.parentElement || div).remove();
    }
  });

  // 3. Inject persistent override stylesheet
  var css = document.createElement('style');
  css.id = 'npx-unlock-styles';
  css.textContent = \`
    ol.review-questions-list > li {
      filter: none !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      user-select: auto !important;
    }
    [class*="z-10"][class*="my-5"] {
      display: none !important;
    }
  \`;
  document.head.appendChild(css);

  // 4. MutationObserver to keep restrictions removed
  new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        if (node.classList?.contains('review-questions-list')) {
          node.querySelectorAll(':scope > li').forEach(function(li) {
            li.style.filter = 'none';
            li.style.opacity = '1';
            li.style.pointerEvents = 'auto';
            li.style.userSelect = 'auto';
          });
        }
        if (node.querySelector?.('h2')?.textContent?.includes('Unlock')) {
          node.remove();
        }
      });
    });
  }).observe(document.body, { childList: true, subtree: true });

  console.log('[NursingPlex Unlock] Active!');
})();`;

function App() {
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'console' | 'bookmarklet'>('console');
  const [view, setView] = useState<'home' | 'scraped' | 'quiz'>('home');

  // Hooks must be called unconditionally - BEFORE any early returns
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

  if (view === 'scraped') {
    return <ScrapedQuestions onExit={() => setView('home')} onStartQuiz={() => setView('quiz')} />;
  }

  if (view === 'quiz') {
    return <QuizView onExit={() => setView('home')} />;
  }

  const handleCopyScript = () => {
    navigator.clipboard.writeText(BOOKMARKLET_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const faqs = [
    {
      q: "What exactly does this do?",
      a: "NursingPlex sends ALL questions to your browser but applies CSS blur (3px), reduced opacity (60%), and blocks pointer events on questions after the first 10. This script removes those CSS restrictions so you can read, select, and copy all questions. It also removes the 'Unlock the blurred questions' upsell banners."
    },
    {
      q: "Will it show me the correct answers?",
      a: "Partial answer: The correct answers for the first 10 questions are highlighted in cyan. For questions after that, the correct answers are NOT highlighted in the HTML — NursingPlex does not send answer highlighting for locked questions. However, all question text and answer choices ARE fully readable after unblurring."
    },
    {
      q: "Will it show rationales/explanations?",
      a: "No. The 'View Rationale' buttons and rationale text are only loaded for the first 10 free questions. The rationale content for locked questions is not sent to your browser at all — it's server-side gated. No client-side script can reveal content that isn't loaded."
    },
    {
      q: "Why does it stop working after a site update?",
      a: "NursingPlex uses Tailwind CSS utility classes like [&>li]:blur-[3px] for the blur effect. If they change these class names or the DOM structure, the selectors in the script need updating. The MutationObserver helps keep things working during the session, but major structural changes may require a script update."
    },
    {
      q: "Is this legal / does it violate ToS?",
      a: "This tool only modifies CSS properties on content already sent to your browser. It does not bypass authentication, access unauthorized API endpoints, or download content not sent to your machine. However, using it likely violates NursingPlex's Terms of Service. Use at your own discretion."
    },
    {
      q: "How is this different from StudocuHack?",
      a: "StudocuHack targets Studocu's pdf2htmlEX document viewer which has a different blur/paywall mechanism. This script is specifically written for NursingPlex's React-based review page structure, targeting the exact Tailwind classes and DOM patterns NursingPlex uses."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">NursingPlex Unlock</h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remove blur &amp; paywall restrictions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <a
              href="https://github.com/danieltyukov/studocuhack"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Inspired by StudocuHack</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Works on NursingPlex.com review pages</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Unblur all nursing
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> exam questions</span>
            </h2>
            <p className={`text-lg md:text-xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Removes CSS blur, upsell banners, and interaction locks from NursingPlex review pages. 
              All questions become readable and selectable.
            </p>
            
            {/* Target URL */}
            <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-6 ${darkMode ? 'bg-gray-800/50 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
              <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <code className="text-xs md:text-sm truncate max-w-[300px] md:max-w-none">nursingplex.com/review/rn-hesi-exit-exam-mcphs-1775539819</code>
            </div>
            
            {/* Proof it works */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setView('quiz')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
              >
                <GraduationCap className="w-5 h-5" />
                Start Quiz Mode →
              </button>
              <button
                onClick={() => setView('scraped')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20"
              >
                <Eye className="w-5 h-5" />
                View All 127 Questions →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BIG QUIZ CTA SECTION - Can't miss this */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-purple-600/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className={`rounded-3xl border-2 p-8 md:p-12 text-center ${darkMode ? 'bg-gray-900/80 border-purple-500/30' : 'bg-white border-purple-300'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-xl shadow-purple-500/30">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              🎓 Practice with all <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">127 Questions</span>
            </h3>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We scraped all 127 questions from the NursingPlex exam. Now practice them in an interactive quiz format with timer, flagging, and navigation.
            </p>
            
            <button
              onClick={() => setView('quiz')}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white text-xl font-bold hover:scale-110 transition-transform shadow-2xl shadow-purple-500/40 animate-pulse"
            >
              <GraduationCap className="w-7 h-7" />
              START QUIZ NOW
              <span className="text-2xl">→</span>
            </button>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Check className="w-4 h-4 text-emerald-400" /> 127 Questions
              </span>
              <span className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Check className="w-4 h-4 text-emerald-400" /> Timer
              </span>
              <span className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Check className="w-4 h-4 text-emerald-400" /> Flag for Review
              </span>
              <span className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Check className="w-4 h-4 text-emerald-400" /> Question Navigator
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Visual */}
      <section className={`py-12 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">How NursingPlex Locks Content</h3>
          <p className={`text-center mb-10 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            NursingPlex sends ALL questions to your browser but applies CSS restrictions to hide them. Here's what happens:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Before */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold">Before (Locked)</h4>
              </div>
              <div className={`rounded-lg p-4 font-mono text-xs space-y-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="text-red-400">filter: blur(3px);</div>
                <div className="text-red-400">opacity: 0.6;</div>
                <div className="text-red-400">pointer-events: none;</div>
                <div className="text-red-400">user-select: none;</div>
              </div>
              <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Questions are blurred, can't be clicked, and text can't be selected.
              </p>
            </div>

            {/* After */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Unlock className="w-5 h-5 text-emerald-400" />
                <h4 className="font-semibold">After (Unlocked)</h4>
              </div>
              <div className={`rounded-lg p-4 font-mono text-xs space-y-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="text-emerald-400">filter: none;</div>
                <div className="text-emerald-400">opacity: 1;</div>
                <div className="text-emerald-400">pointer-events: auto;</div>
                <div className="text-emerald-400">user-select: auto;</div>
              </div>
              <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                All questions are clear, clickable, and text is fully selectable.
              </p>
            </div>

            {/* What stays locked */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h4 className="font-semibold">Still Server-Gated</h4>
              </div>
              <div className={`rounded-lg p-4 text-xs space-y-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="text-amber-400">✗ Correct answer highlights</div>
                <div className="text-amber-400">✗ Rationale explanations</div>
                <div className="text-amber-400">✗ "View Rationale" buttons</div>
                <div className="text-gray-500">  (not sent by server)</div>
              </div>
              <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Answer keys and rationales for locked questions are not sent to your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">How to Use</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xl mb-4">1</div>
              <h4 className="font-semibold text-lg mb-2">Copy the Script</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Click the copy button below. The script is a single-line JavaScript snippet.
              </p>
            </div>
            
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xl mb-4">2</div>
              <h4 className="font-semibold text-lg mb-2">Open NursingPlex</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Go to the review page. Wait for it to fully load with the blurred questions visible.
              </p>
            </div>
            
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xl mb-4">3</div>
              <h4 className="font-semibold text-lg mb-2">Paste in Console</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Press <kbd className={`px-1.5 py-0.5 rounded text-xs ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>F12</kbd> → Console tab → Paste → Enter. Done!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Script Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">The Unlock Script</h3>
          <p className={`text-center mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Copy this and paste it into your browser console (F12) on any NursingPlex review page.
          </p>

          {/* Tab switcher */}
          <div className="flex justify-center mb-6">
            <div className={`inline-flex rounded-xl p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <button
                onClick={() => setActiveTab('console')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'console'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                Console Script
              </button>
              <button
                onClick={() => setActiveTab('bookmarklet')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'bookmarklet'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Bookmarklet
              </button>
            </div>
          </div>

          {/* Copy Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleCopyScript}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all ${
                copied 
                  ? 'bg-emerald-500 scale-105' 
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25'
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : `Copy ${activeTab === 'console' ? 'Console' : 'Bookmarklet'} Script`}
            </button>
          </div>

          {activeTab === 'console' ? (
            /* Console Script Preview */
            <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className={`flex items-center gap-2 px-4 py-3 border-b ${darkMode ? 'bg-gray-800/50 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className={`text-xs ml-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Browser Console (F12)</span>
              </div>
              <pre className={`p-4 overflow-x-auto text-xs md:text-sm leading-relaxed max-h-80 overflow-y-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <code>{SCRIPT_DISPLAY}</code>
              </pre>
            </div>
          ) : (
            /* Bookmarklet Instructions */
            <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="p-6 space-y-4">
                <h4 className="font-semibold text-lg">Create a Bookmarklet</h4>
                <ol className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Right-click your bookmarks bar → <strong>Add new bookmark</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Name it <strong>"NP Unlock"</strong> (or anything you like)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Paste the full script (starts with <code className={`px-1 py-0.5 rounded text-xs ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>javascript:void(...)</code>) as the URL</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
                    <span>Save it. Now click it whenever you're on a NursingPlex page!</span>
                  </li>
                </ol>
                <div className={`mt-4 p-3 rounded-lg text-xs font-mono break-all ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                  javascript:void(function(){"{"}(function(){"{"} /* ... full script from clipboard ... */ {"}"})(){"}"})()
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What it does */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">What the Script Does</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🔓', title: 'Removes CSS Blur', desc: 'Strips the 3px blur filter from all <ol> question lists, making locked questions fully readable.' },
              { icon: '🚫', title: 'Hides Upsell Banners', desc: 'Removes "Unlock the blurred questions" cards with lock icons and pricing links.' },
              { icon: '🖱️', title: 'Restores Interactivity', desc: 'Re-enables pointer-events and user-select so you can click, highlight, and copy text.' },
              { icon: '👁️', title: 'Fixes Opacity', desc: 'Sets opacity back to 100% so text is fully visible instead of faded at 60%.' },
              { icon: '🛡️', title: 'Persistent Protection', desc: 'MutationObserver watches for new locked content and auto-unlocks it as the page loads more.' },
              { icon: '🧹', title: 'Cleans CSS Classes', desc: 'Actually removes the Tailwind blur classes from the DOM, not just overriding with inline styles.' },
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-2xl border flex gap-4 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-3">Important Limitations</h3>
                <ul className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Correct answers are NOT revealed</strong> for locked questions. NursingPlex highlights correct answers in cyan (#00FFFF) but only for the first 10 free questions. The highlighting data for locked questions is not sent to your browser.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Rationales are NOT available</strong> for locked questions. The "View Rationale" buttons and explanation text only exist for the first 10 questions. They are server-side gated.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>May break after site updates.</strong> The script targets specific Tailwind CSS classes. If NursingPlex changes their class names, the script needs updating.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>May violate ToS.</strong> Using this tool likely violates NursingPlex's Terms of Service. You are responsible for your own actions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>What you DO get:</strong> All 127 questions fully readable, selectable, and copyable. No more blur. No more upsell banners interrupting your study flow.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">FAQ</h3>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-400" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className={`px-5 pb-5 text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start CTA */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to unblur?</h3>
          <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Copy the script, open NursingPlex, paste in the browser console, and all questions become readable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setView('quiz')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/25"
            >
              <GraduationCap className="w-5 h-5" />
              Start Quiz Mode
            </button>
            <button
              onClick={handleCopyScript}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all ${
                copied 
                  ? 'bg-emerald-500' 
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25'
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Unlock Script'}
            </button>
            <a
              href="https://nursingplex.com/review/rn-hesi-exit-exam-mcphs-1775539819"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all border ${
                darkMode 
                  ? 'border-gray-700 hover:bg-gray-800 text-gray-300' 
                  : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <ExternalLink className="w-5 h-5" />
              Open NursingPlex
            </a>
          </div>
        </div>
      </section>

      {/* Floating Quiz Button */}
      <button
        onClick={() => setView('quiz')}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform"
      >
        <GraduationCap className="w-6 h-6" />
        <span className="hidden sm:inline">Take Quiz</span>
      </button>

      {/* Footer */}
      <footer className={`py-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Inspired by <a href="https://github.com/danieltyukov/studocuhack" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">StudocuHack</a> by danieltyukov.
            This project is not affiliated with or endorsed by NursingPlex.
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            For educational purposes only. Use responsibly. Consider supporting NursingPlex if you find their content valuable.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
