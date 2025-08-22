# Simple Validation Checklist for AI Agents

## Overview for AI Agents

This is a straightforward checklist based on the Excel Quick Tools WFM patterns. AI agents should verify these basic requirements when implementing modular Tampermonkey scripts.

## Basic Module Structure Checklist

### ✅ Every Module Must Have:

1. **IIFE Wrapper**
   ```javascript
   (function() {
       'use strict';
       // module code here
   })();
   ```

2. **Path Check** (copy from main script)
   ```javascript
   if (!/\/editor($|\?)/.test(window.location.pathname)) return;
   ```

3. **Dependency Wait** (if using TM_UI or TM_FileState)
   ```javascript
   function onReady(fn) {
       if (window.TM_UI && window.TM_FileState) {
           fn();
       } else {
           let count = 0;
           function check() {
               if (window.TM_UI && window.TM_FileState) {
                   fn();
               } else if (++count < 50) {
                   setTimeout(check, 100);
               }
           }
           check();
       }
   }
   ```

## Main Script Checklist

### ✅ Main Script Must Have:

1. **Correct @require Order**
   ```javascript
   // Libraries first
   // @require https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js
   // @require https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
   
   // Then modules
   // @require https://github.com/user/repo/raw/main/module1.js
   // @require https://github.com/user/repo/raw/main/module2.js
   ```

2. **Path Check**
   ```javascript
   if (!/\/editor($|\?)/.test(window.location.pathname)) return;
   ```

3. **TM_UI System** (if using panels)
4. **TM_FileState System** (if sharing data)

## UI Panel Module Checklist

### ✅ Panel Module Must Have:

1. **Wait for TM_UI**
   ```javascript
   function onReady(fn) {
       if (window.TM_UI && typeof window.TM_UI.registerPanel === 'function') {
           fn();
       } else {
           window.addEventListener('TM_UI_READY', fn, { once: true });
       }
   }
   ```

2. **Panel Registration**
   ```javascript
   window.TM_UI.registerPanel({
       id: 'kebab-case-id',
       title: 'Human Readable Title',
       render: function() {
           // return DOM element
       }
   });
   ```

3. **Scoped Styles** (optional but recommended)
   ```javascript
   if (!document.getElementById('my-panel-style')) {
       const style = document.createElement('style');
       style.id = 'my-panel-style';
       style.textContent = `/* styles */`;
       document.head.appendChild(style);
   }
   ```

## State Integration Checklist

### ✅ If Using TM_FileState:

1. **Wait for Both TM_UI and TM_FileState**
2. **Subscribe to State Changes**
   ```javascript
   let unsub = null;
   function subscribe() {
       if (unsub) window.TM_FileState.unsubscribe(unsub);
       unsub = function(state) {
           // handle state change
       };
       window.TM_FileState.subscribe(unsub);
   }
   ```

3. **Cleanup Subscription**
   ```javascript
   root.addEventListener('DOMNodeRemoved', function(e) {
       if (e.target === root && unsub) {
           window.TM_FileState.unsubscribe(unsub);
       }
   });
   ```

## Quick Validation Questions

### For AI Agents - Ask These Questions:

1. **Does the module start with `(function() { 'use strict';`?**
2. **Does it have the path check from the main script?**
3. **If it uses TM_UI, does it wait for TM_UI to be ready?**
4. **If it uses TM_FileState, does it wait for both TM_UI and TM_FileState?**
5. **Does the panel have a unique kebab-case ID?**
6. **If it subscribes to state, does it clean up the subscription?**

## Common Mistakes to Avoid

### ❌ Don't Do This:

1. **Missing Path Check**
   ```javascript
   // BAD - no path validation
   (function() {
       'use strict';
       // module runs on all pages
   })();
   ```

2. **Wrong Dependency Order**
   ```javascript
   // BAD - module before library
   // @require https://github.com/user/repo/raw/main/excelModule.js
   // @require https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js
   ```

3. **No Dependency Wait**
   ```javascript
   // BAD - assumes TM_UI exists immediately
   window.TM_UI.registerPanel({...}); // might fail
   ```

4. **Missing Cleanup**
   ```javascript
   // BAD - subscription without cleanup
   window.TM_FileState.subscribe(handler);
   // no unsubscribe = memory leak
   ```

## File Naming Rules

### ✅ Simple Naming Convention:

- **Main script**: `main.user.js`
- **Feature modules**: `featureName.js` (camelCase)
- **System modules**: `systemName.js` (camelCase)

Examples from Excel Quick Tools:
- `main.user.js` - main orchestrator
- `excelEditFun.js` - excel editing features
- `splitBy.js` - splitting functionality
- `preview.js` - preview functionality

## Testing Checklist

### ✅ Basic Tests:

1. **Script loads without console errors**
2. **UI panels appear in sidebar**
3. **File upload works (if applicable)**
4. **State changes update all panels**
5. **No memory leaks after using features**

## Example Validation Process

```javascript
// AI Agent Validation Process
function validateModule(moduleCode, moduleName) {
    const checks = [
        moduleCode.includes('(function()'),
        moduleCode.includes("'use strict'"),
        moduleCode.includes('window.location.pathname'),
        moduleCode.includes('})();')
    ];
    
    console.log(`${moduleName}: ${checks.every(Boolean) ? 'PASS' : 'FAIL'}`);
    return checks.every(Boolean);
}
```

This simple checklist covers the essential patterns from the Excel Quick Tools example without overcomplicating the validation process.