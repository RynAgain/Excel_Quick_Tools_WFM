# Modular Code Templates for AI Generation

## Overview for AI Agents

These templates provide standardized scaffolds for AI agents to generate modular Tampermonkey scripts. Each template includes placeholder patterns that can be systematically replaced with specific implementation details.

## Template Categories

1. **Main Orchestrator Templates** - Entry point scripts with @require statements
2. **Module Templates** - Individual feature modules
3. **System Templates** - Core infrastructure components
4. **Integration Templates** - Inter-module communication patterns

## Main Orchestrator Templates

### Template 1: Basic Modular Orchestrator
```javascript
// ==UserScript==
// @name         {{SCRIPT_NAME}}
// @namespace    {{NAMESPACE}}
// @version      {{VERSION}}
// @description  {{DESCRIPTION}}
// @match        {{TARGET_URL_PATTERN}}
// @require      {{EXTERNAL_LIBRARY_1}}
// @require      {{EXTERNAL_LIBRARY_2}}
// @require      {{MODULE_1_URL}}
// @require      {{MODULE_2_URL}}
// @grant        none
// @updateURL    {{UPDATE_URL}}
// @downloadURL  {{DOWNLOAD_URL}}
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    // Path validation
    if (!{{PATH_VALIDATION_REGEX}}.test(window.location.pathname)) return;
    
    // Set browser tab title
    document.title = "{{APP_TITLE}}";
    
    // Dependency validation
    function checkDependencies() {
        const required = [{{REQUIRED_DEPENDENCIES}}];
        const missing = required.filter(dep => {
            try {
                return eval(dep) === undefined;
            } catch (e) {
                return true;
            }
        });
        
        if (missing.length > 0) {
            console.error('Missing dependencies:', missing);
            alert('Required dependencies not loaded. Please check @require statements.');
            return false;
        }
        return true;
    }
    
    if (!checkDependencies()) return;
    
    // Initialize application
    initializeApp();
    
    function initializeApp() {
        // {{INITIALIZATION_LOGIC}}
        console.log('{{SCRIPT_NAME}} initialized successfully');
    }
})();
```

### Template 2: Full Architecture Orchestrator
```javascript
// ==UserScript==
// @name         {{SCRIPT_NAME}}
// @namespace    {{NAMESPACE}}
// @version      {{VERSION}}
// @description  {{DESCRIPTION}}
// @match        {{TARGET_URL_PATTERN}}
// @require      https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
// @require      {{UI_SYSTEM_URL}}
// @require      {{STATE_MANAGER_URL}}
// @require      {{MODULE_1_URL}}
// @require      {{MODULE_2_URL}}
// @require      {{MODULE_N_URL}}
// @grant        none
// @updateURL    {{UPDATE_URL}}
// @downloadURL  {{DOWNLOAD_URL}}
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    // Path validation
    if (!{{PATH_VALIDATION_REGEX}}.test(window.location.pathname)) return;
    
    // Set browser tab title
    document.title = "{{APP_TITLE}}";
    
    // --- FULL PAGE APP OVERWRITE ---
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '{{BACKGROUND_COLOR}}';
    
    // Create app root
    const appRoot = document.createElement('div');
    appRoot.id = 'tm-app-root';
    appRoot.style.display = 'flex';
    appRoot.style.height = '100vh';
    appRoot.style.width = '100vw';
    appRoot.style.overflow = 'hidden';
    document.body.appendChild(appRoot);
    
    // --- Global Styles ---
    const style = document.createElement('style');
    style.textContent = `
        {{GLOBAL_STYLES}}
    `;
    document.head.appendChild(style);
    
    // --- Layout Components ---
    const sidebar = createSidebar();
    const mainContent = createMainContent();
    const previewPanel = createPreviewPanel();
    
    appRoot.appendChild(sidebar);
    appRoot.appendChild(mainContent);
    appRoot.appendChild(previewPanel);
    
    // --- Core Systems Initialization ---
    initializeUISystem();
    initializeStateManager();
    initializeFileHandling();
    
    // --- Module Registration ---
    // Modules will auto-register when their scripts load
    
    function createSidebar() {
        const sidebar = document.createElement('div');
        sidebar.id = 'tm-ui-sidebar';
        // {{SIDEBAR_IMPLEMENTATION}}
        return sidebar;
    }
    
    function createMainContent() {
        const mainContent = document.createElement('div');
        mainContent.id = 'tm-ui-main-content';
        // {{MAIN_CONTENT_IMPLEMENTATION}}
        return mainContent;
    }
    
    function createPreviewPanel() {
        const previewPanel = document.createElement('div');
        previewPanel.id = 'tm-file-preview';
        // {{PREVIEW_PANEL_IMPLEMENTATION}}
        return previewPanel;
    }
    
    function initializeUISystem() {
        // {{UI_SYSTEM_INITIALIZATION}}
    }
    
    function initializeStateManager() {
        // {{STATE_MANAGER_INITIALIZATION}}
    }
    
    function initializeFileHandling() {
        // {{FILE_HANDLING_INITIALIZATION}}
    }
})();
```

## Module Templates

### Template 1: Basic Feature Module
```javascript
// {{MODULE_NAME}}.js
(function() {
    'use strict';
    
    // Path validation
    if (!{{PATH_VALIDATION_REGEX}}.test(window.location.pathname)) return;
    
    // Wait for dependencies
    function onReady(fn) {
        if ({{DEPENDENCY_CHECK}}) {
            fn();
        } else {
            {{DEPENDENCY_WAIT_STRATEGY}}
        }
    }
    
    onReady(function() {
        // Module implementation
        {{MODULE_IMPLEMENTATION}}
        
        console.log('{{MODULE_NAME}} module loaded');
    });
})();
```

### Template 2: UI Panel Module
```javascript
// {{MODULE_NAME}}.js
(function() {
    'use strict';
    
    // Path validation
    if (!{{PATH_VALIDATION_REGEX}}.test(window.location.pathname)) return;
    
    // Wait for TM_UI system
    function onReady(fn) {
        if (window.TM_UI && typeof window.TM_UI.registerPanel === 'function') {
            fn();
        } else {
            window.addEventListener('TM_UI_READY', fn, { once: true });
        }
    }
    
    onReady(function() {
        window.TM_UI.registerPanel({
            id: '{{PANEL_ID}}',
            title: '{{PANEL_TITLE}}',
            render: function() {
                const root = document.createElement('div');
                root.id = '{{PANEL_ID}}-panel';
                
                // Scoped styles
                if (!document.getElementById('{{PANEL_ID}}-style')) {
                    const style = document.createElement('style');
                    style.id = '{{PANEL_ID}}-style';
                    style.textContent = `
                        {{SCOPED_STYLES}}
                    `;
                    document.head.appendChild(style);
                }
                
                // Panel HTML
                root.innerHTML = `
                    {{PANEL_HTML}}
                `;
                
                // Event handlers
                {{EVENT_HANDLERS}}
                
                // State integration (if needed)
                {{STATE_INTEGRATION}}
                
                // Cleanup
                root.addEventListener('DOMNodeRemoved', function(e) {
                    if (e.target === root) {
                        {{CLEANUP_LOGIC}}
                    }
                });
                
                return root;
            }
        });
    });
})();
```

### Template 3: State-Integrated Module
```javascript
// {{MODULE_NAME}}.js
(function() {
    'use strict';
    
    // Path validation
    if (!{{PATH_VALIDATION_REGEX}}.test(window.location.pathname)) return;
    
    // Wait for dependencies
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
    
    onReady(function() {
        window.TM_UI.registerPanel({
            id: '{{PANEL_ID}}',
            title: '{{PANEL_TITLE}}',
            render: function() {
                const root = document.createElement('div');
                root.id = '{{PANEL_ID}}-panel';
                
                // Scoped styles
                if (!document.getElementById('{{PANEL_ID}}-style')) {
                    const style = document.createElement('style');
                    style.id = '{{PANEL_ID}}-style';
                    style.textContent = `
                        {{SCOPED_STYLES}}
                    `;
                    document.head.appendChild(style);
                }
                
                // Panel HTML
                root.innerHTML = `
                    {{PANEL_HTML}}
                `;
                
                // Get UI elements
                {{UI_ELEMENT_REFERENCES}}
                
                // Event handlers
                {{EVENT_HANDLERS}}
                
                // State subscription
                let unsub = null;
                
                function handleStateChange(state) {
                    {{STATE_CHANGE_HANDLER}}
                }
                
                function subscribe() {
                    if (unsub) window.TM_FileState.unsubscribe(unsub);
                    unsub = handleStateChange;
                    window.TM_FileState.subscribe(unsub);
                    
                    // Initial state
                    const currentState = window.TM_FileState.getState();
                    handleStateChange(currentState);
                }
                
                subscribe();
                
                // Cleanup
                root.addEventListener('DOMNodeRemoved', function(e) {
                    if (e.target === root && unsub) {
                        window.TM_FileState.unsubscribe(unsub);
                    }
                });
                
                return root;
            }
        });
    });
})();
```

## System Component Templates

### Template 1: UI Registry System
```javascript
// uiSystem.js
(function() {
    'use strict';
    
    // Path validation
    if (!{{PATH_VALIDATION_REGEX}}.test(window.location.pathname)) return;
    
    // UI Registry Implementation
    const panelRegistry = [];
    let activePanelId = null;
    
    // DOM references
    let featureList = null;
    let panels = null;
    
    function renderFeatureList() {
        if (!featureList) return;
        
        featureList.innerHTML = '';
        panelRegistry.forEach((panel, idx) => {
            const btn = document.createElement('button');
            btn.className = 'tm-ui-feature-btn' + (panel.id === activePanelId ? ' active' : '');
            btn.textContent = panel.title;
            
            // Button styling
            {{BUTTON_STYLING}}
            
            btn.onclick = () => setActivePanel(panel.id);
            featureList.appendChild(btn);
        });
    }
    
    function renderPanels() {
        if (!panels) return;
        
        panels.innerHTML = '';
        const panel = panelRegistry.find(p => p.id === activePanelId);
        if (panel && typeof panel.render === 'function') {
            const panelContent = panel.render();
            if (panelContent instanceof HTMLElement) {
                panels.appendChild(panelContent);
            } else if (typeof panelContent === 'string') {
                panels.innerHTML = panelContent;
            }
        }
    }
    
    function setActivePanel(id) {
        activePanelId = id;
        // Persist last active panel
        try {
            localStorage.setItem('tm_last_active_panel', id);
        } catch (e) {}
        renderFeatureList();
        renderPanels();
    }
    
    // Public API
    window.TM_UI = {
        registerPanel(opts) {
            if (!opts || !opts.id || !opts.title || typeof opts.render !== 'function') return;
            if (panelRegistry.some(p => p.id === opts.id)) return; // Prevent duplicate
            
            panelRegistry.push(opts);
            
            // Handle first panel or restore last active
            if (panelRegistry.length === 1) {
                let restored = null;
                try {
                    restored = localStorage.getItem('tm_last_active_panel');
                } catch (e) {}
                
                if (restored && panelRegistry.some(p => p.id === restored)) {
                    activePanelId = restored;
                } else {
                    activePanelId = opts.id;
                }
            }
            
            renderFeatureList();
            renderPanels();
        },
        
        setActivePanel,
        
        getPanels() {
            return panelRegistry.slice();
        },
        
        // Internal method for main script to set DOM references
        _setDOMReferences(featureListEl, panelsEl) {
            featureList = featureListEl;
            panels = panelsEl;
        }
    };
    
    // Notify that UI system is ready
    window.dispatchEvent(new Event('TM_UI_READY'));
    
    console.log('TM_UI system initialized');
})();
```

### Template 2: State Manager System
```javascript
// stateManager.js
(function() {
    'use strict';
    
    // Path validation
    if (!{{PATH_VALIDATION_REGEX}}.test(window.location.pathname)) return;
    
    // State Management Implementation
    const FILESTATE_KEY = '{{STORAGE_KEY}}';
    
    let fileState = {
        {{STATE_STRUCTURE}}
    };
    
    const listeners = [];
    
    // Restore from localStorage if available
    (function restoreState() {
        try {
            const saved = localStorage.getItem(FILESTATE_KEY);
            if (saved) {
                const obj = JSON.parse(saved);
                {{STATE_RESTORATION_LOGIC}}
            }
        } catch (e) {
            console.warn('Failed to restore state:', e);
        }
    })();
    
    function notify() {
        listeners.forEach(fn => {
            try { 
                fn(window.TM_FileState.getState()); 
            } catch (e) {
                console.error('State listener error:', e);
            }
        });
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('TM_FILESTATE_UPDATED', { 
            detail: window.TM_FileState.getState() 
        }));
    }
    
    function persistState() {
        try {
            {{STATE_PERSISTENCE_LOGIC}}
        } catch (e) {
            console.warn('Failed to persist state:', e);
        }
    }
    
    // Public API
    window.TM_FileState = {
        getState({ previewRows = null } = {}) {
            {{GET_STATE_IMPLEMENTATION}}
        },
        
        {{STATE_SETTERS}}
        
        subscribe(fn) {
            if (typeof fn === 'function') {
                listeners.push(fn);
            }
        },
        
        unsubscribe(fn) {
            const idx = listeners.indexOf(fn);
            if (idx >= 0) listeners.splice(idx, 1);
        }
    };
    
    console.log('TM_FileState system initialized');
})();
```

## Integration Templates

### Template 1: Event Communication Pattern
```javascript
// Event-driven communication between modules
(function() {
    'use strict';
    
    // Custom event dispatcher
    function dispatchModuleEvent(eventType, data) {
        window.dispatchEvent(new CustomEvent(eventType, {
            detail: {
                timestamp: Date.now(),
                source: '{{MODULE_NAME}}',
                data: data
            }
        }));
    }
    
    // Event listener setup
    function setupEventListeners() {
        {{EVENT_LISTENERS}}
    }
    
    // Module-specific event handlers
    {{EVENT_HANDLERS}}
    
    // Initialize event system
    setupEventListeners();
})();
```

### Template 2: Performance Optimization Pattern
```javascript
// Performance optimization utilities
(function() {
    'use strict';
    
    // Debouncing utility
    function createDebouncer(delay = 300) {
        let timeoutId = null;
        return function(fn) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fn, delay);
        };
    }
    
    // Lazy loading utility
    function createLazyLoader() {
        const loaded = new Set();
        
        return function(key, loader) {
            if (loaded.has(key)) return;
            
            loaded.add(key);
            setTimeout(loader, 0);
        };
    }
    
    // Memory management utility
    function createCleanupManager() {
        const cleanupFunctions = [];
        
        return {
            add(fn) {
                cleanupFunctions.push(fn);
            },
            cleanup() {
                cleanupFunctions.forEach(fn => {
                    try { fn(); } catch (e) {}
                });
                cleanupFunctions.length = 0;
            }
        };
    }
    
    // Export utilities
    window.TM_Performance = {
        debounce: createDebouncer,
        lazyLoad: createLazyLoader,
        cleanup: createCleanupManager
    };
})();
```

## Template Usage Guidelines for AI Agents

### 1. Placeholder Replacement Rules
```javascript
// AI agents should replace placeholders systematically:
const placeholders = {
    '{{SCRIPT_NAME}}': 'Actual script name',
    '{{NAMESPACE}}': 'http://tampermonkey.net/',
    '{{VERSION}}': '1.0.0',
    '{{DESCRIPTION}}': 'Actual description',
    '{{TARGET_URL_PATTERN}}': 'https://example.com/*',
    '{{MODULE_NAME}}': 'kebab-case-module-name',
    '{{PANEL_ID}}': 'kebab-case-panel-id',
    '{{PANEL_TITLE}}': 'Human Readable Title'
};
```

### 2. Template Selection Logic
```javascript
function selectTemplate(requirements) {
    if (requirements.complexity === 'simple') {
        return 'basic-modular-orchestrator';
    }
    
    if (requirements.needsUI && requirements.needsState) {
        return 'full-architecture-orchestrator';
    }
    
    if (requirements.needsUI) {
        return 'ui-panel-module';
    }
    
    return 'basic-feature-module';
}
```

### 3. Validation After Generation
```javascript
function validateGeneratedCode(code, template) {
    const checks = [
        // Check for unreplaced placeholders
        !code.includes('{{'),
        // Check for required functions
        template.requiredFunctions.every(fn => code.includes(fn)),
        // Check for proper IIFE wrapping
        code.startsWith('(function()') || code.startsWith('//'),
        // Check for path validation
        code.includes('window.location.pathname')
    ];
    
    return checks.every(Boolean);
}
```

These templates provide AI agents with systematic scaffolds for generating consistent, well-structured modular Tampermonkey scripts following established architectural patterns.