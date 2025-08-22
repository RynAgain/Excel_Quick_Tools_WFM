# Modular Tampermonkey Architecture Guide for AI Coding Agents

## Overview

This documentation provides a comprehensive guide for AI coding agents to understand and implement advanced modular Tampermonkey script architectures. The Excel Quick Tools WFM project serves as a reference implementation demonstrating sophisticated patterns for building scalable, maintainable browser automation scripts.

## Architecture Patterns Covered

### Core Patterns
1. **@require Dependency Injection** - External module loading via GitHub URLs
2. **UI Registry System** - Modular component registration with `TM_UI.registerPanel()`
3. **Shared State Management** - Centralized state with `TM_FileState` pub/sub pattern
4. **Event-Driven Communication** - Custom events for inter-module messaging
5. **Full-Page DOM Override** - Complete application takeover for SPA-like experience
6. **Dependency Resolution** - `onReady()` patterns for module initialization

### Performance Patterns
7. **Lazy Loading Strategies** - Deferred module initialization
8. **Memory Management** - Large dataset handling patterns
9. **Performance Monitoring** - Profiling and optimization techniques

## Documentation Structure

```
Documentation & Notes/
├── README.md                           # This overview
├── 01-Architecture-Analysis/           # Core pattern documentation
├── 02-Implementation-Templates/        # Code templates for AI generation
├── 03-Decision-Trees/                  # AI decision logic flows
├── 04-Validation-Rules/               # Implementation validation
├── 05-Performance-Optimization/       # Performance guidelines
└── 06-Troubleshooting/               # Common issues and solutions
```

## Quick Start for AI Agents

1. **Assess Complexity**: Use decision trees to determine if modular architecture is needed
2. **Choose Patterns**: Select appropriate architectural patterns based on requirements
3. **Generate Code**: Use templates to scaffold modular structure
4. **Validate Implementation**: Run validation checklists to ensure correctness
5. **Optimize Performance**: Apply performance patterns for complex scenarios

## Key Benefits for AI Agents

- **Systematic Approach**: Clear decision logic for architectural choices
- **Reusable Templates**: Code scaffolds with placeholder patterns
- **Validation Rules**: Programmatic verification of implementations
- **Performance Guidelines**: Optimization strategies for complex scripts
- **Error Prevention**: Common pitfalls and how to avoid them

## Reference Implementation

The Excel Quick Tools WFM project demonstrates these patterns in action:
- [`main.user.js`](../main.user.js) - Main orchestrator with @require statements
- [`excelEditFun.js`](../excelEditFun.js) - Example module implementation
- [`splitBy.js`](../splitBy.js) - Advanced module with state management

## Next Steps

1. Review the Architecture Analysis section for detailed pattern explanations
2. Use Implementation Templates to generate modular code
3. Follow Decision Trees for systematic architectural choices
4. Apply Validation Rules to verify correct implementation
5. Implement Performance Optimization for complex scenarios

---

*This documentation is specifically designed for AI coding agents to understand and replicate complex modular Tampermonkey architectures.*