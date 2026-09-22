import { useState, useEffect } from 'react';
import { Shield, BookOpen, Download, ChevronDown, ChevronUp, Copy, Check, Zap, AlertTriangle, ExternalLink } from 'lucide-react';

// The bookmarklet script that runs on nursingplex.com
const BOOKMARKLET_SCRIPT = `javascript:void(function(){
  /* NursingPlex Unlock - Remove paywall restrictions */
  (function(){
    'use strict';
    
    /* Remove all upsell/unlock banners */
    var banners = document.querySelectorAll('[class*="unlock"], [class*="upsell"], [class*="paywall"], [class*="premium"], [class*="blurred"]');
    banners.forEach(function(el){ el.remove(); });
    
    /* Remove blur filters from all elements */
    var allElements = document.querySelectorAll('*');
    allElements.forEach(function(el){
      var style = window.getComputedStyle(el);
      if(style.filter && style.filter.indexOf('blur') !== -1){
        el.style.filter = 'none';
        el.style.webkitFilter = 'none';
      }
      if(style.backdropFilter && style.backdropFilter.indexOf('blur') !== -1){
        el.style.backdropFilter = 'none';
      }
      /* Remove opacity restrictions */
      if(parseFloat(style.opacity) < 1 && el.closest && !el.closest('nav') && !el.closest('header')){
        /* Only remove opacity on content areas */
      }
    });
    
    /* Remove CSS blur classes */
    var styleSheets = document.styleSheets;
    try {
      for(var i = 0; i < styleSheets.length; i++){
        try {
          var rules = styleSheets[i].cssRules || styleSheets[i].rules;
          for(var j = rules.length - 1; j >= 0; j--){
            var rule = rules[j];
            if(rule.selectorText && (
              rule.selectorText.indexOf('blur') !== -1 ||
              rule.selectorText.indexOf('locked') !== -1 ||
              rule.selectorText.indexOf('premium') !== -1 ||
              rule.selectorText.indexOf('paywall') !== -1 ||
              rule.selectorText.indexOf('upsell') !== -1 ||
              rule.selectorText.indexOf('overlay') !== -1
            )){
              styleSheets[i].deleteRule(j);
            }
          }
        } catch(e){}
      }
    } catch(e){}
    
    /* Inject override styles */
    var css = document.createElement('style');
    css.id = 'nursingplex-unlock-styles';
    css.textContent = [
      '* { filter: none !important; -webkit-filter: none !important; }',
      '[class*="blur"], [class*="locked"], [class*="premium"], [class*="paywall"], [class*="upsell"], [class*="overlay"] { ',
      '  filter: none !important; ',
      '  -webkit-filter: none !important; ',
      '  opacity: 1 !important; ',
      '  pointer-events: auto !important; ',
      '  user-select: auto !important; ',
      '  visibility: visible !important; ',
      '}',
      '[class*="unlock-banner"], [class*="upsell-banner"], [class*="paywall-banner"], [class*="premium-banner"] { display: none !important; }',
      '.rationale, [class*="rationale"], [class*="explanation"], [class*="answer"] { display: block !important; opacity: 1 !important; filter: none !important; }',
      'body { overflow: auto !important; }',
      '[class*="modal"], [class*="dialog"] { display: none !important; }',
      '[style*="blur"] { filter: none !important; -webkit-filter: none !important; }',
      '[style*="opacity: 0"] { opacity: 1 !important; }',
      '[style*="pointer-events: none"] { pointer-events: auto !important; }'
    ].join('\\n');
    document.head.appendChild(css);
    
    /* Reveal hidden rationales */
    var rationaleElements = document.querySelectorAll('[class*="rationale"], [class*="explanation"], [data-testid*="rationale"], [class*="answer-key"]');
    rationaleElements.forEach(function(el){
      el.style.display = 'block';
      el.style.opacity = '1';
      el.style.filter = 'none';
      el.style.visibility = 'visible';
      el.style.maxHeight = 'none';
      el.style.overflow = 'visible';
    });
    
    /* Remove click handlers that block interaction */
    var blockedElements = document.querySelectorAll('[class*="locked"], [class*="premium"], [class*="blurred"]');
    blockedElements.forEach(function(el){
      el.style.pointerEvents = 'auto';
      el.classList.remove('locked', 'premium', 'blurred', 'blur');
    });
    
    /* Remove fixed/sticky overlays */
    var fixedElements = document.querySelectorAll('[class*="sticky"], [class*="fixed"]');
    fixedElements.forEach(function(el){
      if(el.textContent && (
        el.textContent.indexOf('Unlock') !== -1 ||
        el.textContent.indexOf('upgrade') !== -1 ||
        el.textContent.indexOf('premium') !== -1 ||
        el.textContent.indexOf('subscribe') !== -1
      )){
        el.remove();
      }
    });
    
    /* Show notification */
    var notification = document.createElement('div');
    notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#10b981;color:white;padding:12px 20px;border-radius:8px;font-family:system-ui;font-size:14px;font-weight:600;z-index:999999;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:opacity 0.3s;';
    notification.textContent = '✓ NursingPlex Unlock activated - Restrictions removed!';
    document.body.appendChild(notification);
    setTimeout(function(){ notification.style.opacity = '0'; }, 3000);
    setTimeout(function(){ notification.remove(); }, 3500);
    
    /* Mutation observer to keep restrictions removed */
    var observer = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
        mutation.addedNodes.forEach(function(node){
          if(node.nodeType === 1){
            var el = node;
            if(el.className && typeof el.className === 'string'){
              if(el.className.indexOf('blur') !== -1 || el.className.indexOf('locked') !== -1 || el.className.indexOf('premium') !== -1){
                el.style.filter = 'none';
                el.style.opacity = '1';
                el.style.pointerEvents = 'auto';
              }
              if(el.className.indexOf('unlock') !== -1 || el.className.indexOf('upsell') !== -1 || el.className.indexOf('paywall') !== -1){
                el.remove();
              }
            }
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    console.log('[NursingPlex Unlock] All restrictions removed. MutationObserver active.');
  })();
})()`;

function App() {
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(BOOKMARKLET_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "How does this work?",
      a: "This tool injects a small script into the NursingPlex page that removes CSS blur filters, hides upsell banners, and reveals content that the site sends to your browser but visually obscures. It works similarly to how ad-blockers remove unwanted elements from pages."
    },
    {
      q: "Is this legal?",
      a: "This tool only reveals content that is already sent to your browser by the NursingPlex server. It does not bypass server-side authentication or access content that isn't loaded. However, using it may violate NursingPlex's Terms of Service. Use at your own risk."
    },
    {
      q: "Will it show answers/rationales?",
      a: "If the rationales are loaded in the page HTML but visually hidden (via CSS blur or display:none), this tool will reveal them. If the rationales are not sent to your browser at all (server-side restriction), they cannot be revealed by any client-side tool."
    },
    {
      q: "Does it work on all NursingPlex pages?",
      a: "It is designed to work on NursingPlex review/exam pages where content is partially visible but blurred or locked behind upsell banners. It may not work on pages where content is entirely server-side gated."
    },
    {
      q: "Why does it stop working after a site update?",
      a: "When NursingPlex updates their CSS class names or page structure, the selectors in the script may need to be updated. Check back for updates or modify the script's selectors to match the new class names."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">NursingPlex Unlock</h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remove paywall restrictions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <a
              href="https://github.com/danieltyukov/studocuhack"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Inspired by StudocuHack</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Works with NursingPlex.com</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Unlock all nursing exam
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> questions</span>
            </h2>
            <p className={`text-lg md:text-xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Remove blur effects, upsell banners, and paywall overlays from NursingPlex review pages. 
              Based on the StudocuHack approach, adapted for nursing exam preparation.
            </p>
            
            {/* Target URL */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm mb-8 ${darkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <code className="text-xs md:text-sm">nursingplex.com/review/rn-hesi-exit-exam-mcphs-1775539819</code>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">How to Use</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xl mb-4">1</div>
              <h4 className="font-semibold text-lg mb-2">Copy the Script</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Click the copy button below to copy the unlock script to your clipboard.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xl mb-4">2</div>
              <h4 className="font-semibold text-lg mb-2">Open NursingPlex</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Navigate to the NursingPlex review page you want to unlock. Wait for it to fully load.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xl mb-4">3</div>
              <h4 className="font-semibold text-lg mb-2">Paste in Console</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Press F12, go to the Console tab, paste the script, and press Enter. Done!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Script Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">The Unlock Script</h3>
          <p className={`text-center mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Copy this script and paste it into your browser console on any NursingPlex page.
          </p>

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
              {copied ? 'Copied!' : 'Copy Script to Clipboard'}
            </button>
          </div>

          {/* Script Preview */}
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
            <div className={`flex items-center gap-2 px-4 py-3 border-b ${darkMode ? 'bg-gray-800/50 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className={`text-xs ml-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Browser Console</span>
            </div>
            <pre className={`p-4 overflow-x-auto text-xs md:text-sm leading-relaxed max-h-64 overflow-y-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <code>{`// Paste this in the browser console (F12 → Console) on NursingPlex
// It removes blur, unlocks content, and hides upsell banners

(function() {
  'use strict';
  
  // Remove all upsell/unlock banners
  var banners = document.querySelectorAll(
    '[class*="unlock"], [class*="upsell"], ' +
    '[class*="paywall"], [class*="premium"]'
  );
  banners.forEach(function(el) { el.remove(); });
  
  // Remove blur filters from all elements
  document.querySelectorAll('*').forEach(function(el) {
    var style = window.getComputedStyle(el);
    if (style.filter && style.filter.indexOf('blur') !== -1) {
      el.style.filter = 'none';
    }
  });
  
  // Inject override styles
  var css = document.createElement('style');
  css.textContent = \`
    * { filter: none !important; }
    [class*="blur"], [class*="locked"],
    [class*="premium"], [class*="paywall"] {
      filter: none !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    [class*="unlock-banner"],
    [class*="upsell-banner"] {
      display: none !important;
    }
  \`;
  document.head.appendChild(css);
  
  // Keep restrictions removed (MutationObserver)
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeType === 1 && node.className) {
          if (node.className.indexOf('blur') !== -1) {
            node.style.filter = 'none';
          }
          if (node.className.indexOf('unlock') !== -1) {
            node.remove();
          }
        }
      });
    });
  });
  observer.observe(document.body, {
    childList: true, subtree: true
  });
  
  console.log('[NursingPlex Unlock] Active!');
})();`}</code>
            </pre>
          </div>

          {/* Bookmarklet Method */}
          <div className={`mt-8 p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-400" />
              Alternative: Bookmarklet Method
            </h4>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Create a new bookmark in your browser and paste the full script as the URL. 
              Then click it whenever you're on a NursingPlex page.
            </p>
            <div className={`p-3 rounded-lg text-xs font-mono break-all ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
              javascript:void(function(){"{"}/* Full script from clipboard */{"}"})()
            </div>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">What It Does</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🔓', title: 'Removes Blur Effects', desc: 'Strips CSS blur filters from all page elements, revealing content that was visually obscured.' },
              { icon: '🚫', title: 'Hides Upsell Banners', desc: 'Removes "Unlock the blurred questions" banners and premium upgrade prompts.' },
              { icon: '👁️', title: 'Reveals Hidden Content', desc: 'Makes rationales and explanations visible if they are loaded but hidden in the DOM.' },
              { icon: '🛡️', title: 'Persistent Protection', desc: 'Uses a MutationObserver to keep restrictions removed even as the page dynamically updates.' },
              { icon: '🖱️', title: 'Restores Interactivity', desc: 'Re-enables click events and text selection on previously locked content areas.' },
              { icon: '🧹', title: 'Clean Experience', desc: 'Removes modals, overlays, and sticky elements that block access to content.' },
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-3">Important Limitations</h3>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>This tool only works on content that is already sent to your browser. If NursingPlex does not send the rationale text to your browser at all, it cannot be revealed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>The script may need updates if NursingPlex changes their CSS class names or page structure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>Using this tool may violate NursingPlex's Terms of Service. You are responsible for your own actions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>This is for educational purposes only. Consider supporting NursingPlex if you find their content valuable.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to unlock?</h3>
          <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Copy the script and paste it in your browser console on any NursingPlex page.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <ExternalLink className="w-5 h-5" />
              Open NursingPlex
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Inspired by <a href="https://github.com/danieltyukov/studocuhack" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">StudocuHack</a> by danieltyukov.
            This project is not affiliated with or endorsed by NursingPlex.
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            For educational purposes only. Use responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
