# Module Interaction Flow Diagrams

## Overview for AI Agents

These diagrams show how modules interact in the Excel Quick Tools WFM architecture. AI agents can use these patterns to understand communication flows and implement similar architectures.

## Core System Architecture

```mermaid
graph TB
    subgraph "Browser Environment"
        Main[main.user.js<br/>Orchestrator]
        
        subgraph "External Dependencies"
            XLSX[XLSX Library<br/>CDN]
            JSZip[JSZip Library<br/>CDN]
        end
        
        subgraph "Core Systems"
            UI[TM_UI Registry<br/>Panel Management]
            State[TM_FileState<br/>Shared State]
            Preview[File Preview<br/>Persistent Panel]
        end
        
        subgraph "Feature Modules"
            Excel[excelEditFun.js<br/>Excel Processing]
            Split[splitBy.js<br/>Data Splitting]
            Daily[dailyBuyReport.js<br/>Report Generation]
            Seller[sellerCustomUploads.js<br/>Upload Processing]
        end
    end
    
    Main --> XLSX
    Main --> JSZip
    Main --> UI
    Main --> State
    Main --> Preview
    
    Excel --> UI
    Excel --> State
    Split --> UI
    Split --> State
    Daily --> UI
    Daily --> State
    Seller --> UI
    Seller --> State
    
    UI --> Preview
    State --> Preview
```

## Module Initialization Flow

```mermaid
sequenceDiagram
    participant Browser
    participant Main as main.user.js
    participant XLSX as XLSX Library
    participant UI as TM_UI System
    participant State as TM_FileState
    participant Module as Feature Module
    
    Browser->>Main: Load main script
    Main->>XLSX: Load via @require
    XLSX-->>Main: Library ready
    
    Main->>UI: Initialize UI system
    UI-->>Main: TM_UI_READY event
    
    Main->>State: Initialize state system
    State-->>Main: TM_FileState ready
    
    Main->>Module: Load via @require
    Module->>Module: Check dependencies
    
    alt Dependencies ready
        Module->>UI: Register panel
        Module->>State: Subscribe to changes
        UI-->>Module: Panel registered
    else Dependencies not ready
        Module->>Module: Wait and retry
    end
```

## File Processing Flow

```mermaid
flowchart TD
    Upload[User Uploads File] --> FileRead[FileReader API]
    FileRead --> Parse[XLSX.read]
    Parse --> StateUpdate[TM_FileState.setWorkbook]
    
    StateUpdate --> Notify[Notify All Subscribers]
    
    Notify --> Preview[Update Preview Panel]
    Notify --> Module1[Update Module 1 UI]
    Notify --> Module2[Update Module 2 UI]
    Notify --> ModuleN[Update Module N UI]
    
    Preview --> Display[Display Data Table]
    Module1 --> Enable1[Enable Module Features]
    Module2 --> Enable2[Enable Module Features]
    ModuleN --> EnableN[Enable Module Features]
```

## State Management Communication

```mermaid
graph LR
    subgraph "State Mutations"
        Upload[File Upload]
        Process[Data Processing]
        Transform[Data Transform]
    end
    
    subgraph "TM_FileState"
        State[(Shared State)]
        Persist[localStorage<br/>Persistence]
    end
    
    subgraph "State Consumers"
        Preview[Preview Panel]
        Excel[Excel Module]
        Split[Split Module]
        Daily[Daily Module]
    end
    
    Upload --> State
    Process --> State
    Transform --> State
    
    State --> Persist
    State --> Preview
    State --> Excel
    State --> Split
    State --> Daily
    
    Preview --> Display1[Update Display]
    Excel --> Display2[Update UI]
    Split --> Display3[Update UI]
    Daily --> Display4[Update UI]
```

## UI Panel Registration Flow

```mermaid
sequenceDiagram
    participant Module
    participant UI as TM_UI Registry
    participant Sidebar
    participant MainContent
    
    Module->>UI: registerPanel({id, title, render})
    UI->>UI: Validate panel config
    UI->>UI: Add to panel registry
    UI->>Sidebar: Update feature list
    Sidebar->>Sidebar: Render panel buttons
    
    Note over Module,MainContent: User clicks panel button
    
    Sidebar->>UI: setActivePanel(id)
    UI->>Module: Call render() function
    Module-->>UI: Return DOM element
    UI->>MainContent: Display panel content
    MainContent->>MainContent: Show rendered panel
```

## Event-Driven Communication

```mermaid
graph TB
    subgraph "Event Sources"
        FileUpload[File Upload Event]
        StateChange[State Change Event]
        UserAction[User Action Event]
        ModuleAction[Module Action Event]
    end
    
    subgraph "Event Bus"
        Browser[Browser Event System]
        Custom[Custom Events]
    end
    
    subgraph "Event Listeners"
        Preview[Preview Panel]
        Modules[Feature Modules]
        UI[UI System]
        State[State Manager]
    end
    
    FileUpload --> Browser
    StateChange --> Custom
    UserAction --> Browser
    ModuleAction --> Custom
    
    Browser --> Preview
    Browser --> Modules
    Custom --> Preview
    Custom --> Modules
    Custom --> UI
    Custom --> State
```

## Data Flow Patterns

### Pattern 1: File Upload to Processing
```mermaid
flowchart LR
    A[User Selects File] --> B[FileReader.readAsArrayBuffer]
    B --> C[XLSX.read workbook]
    C --> D[TM_FileState.setWorkbook]
    D --> E[Notify all subscribers]
    E --> F[Modules update UI]
    F --> G[User sees updated interface]
```

### Pattern 2: Module Processing to Output
```mermaid
flowchart LR
    A[User Clicks Process] --> B[Get current state]
    B --> C[Process data]
    C --> D[Generate output]
    D --> E[Download file]
    E --> F[Update status message]
```

### Pattern 3: Cross-Module Communication
```mermaid
flowchart LR
    A[Module A Action] --> B[Update shared state]
    B --> C[State notifies subscribers]
    C --> D[Module B receives update]
    D --> E[Module B updates UI]
```

## Error Handling Flow

```mermaid
flowchart TD
    Start[Module Operation] --> Check{Dependencies Available?}
    Check -->|No| Wait[Wait for dependencies]
    Wait --> Check
    Check -->|Yes| Execute[Execute operation]
    
    Execute --> Success{Operation Success?}
    Success -->|Yes| Update[Update UI/State]
    Success -->|No| Error[Handle Error]
    
    Error --> Log[Log error message]
    Log --> Display[Display user message]
    Display --> Recover[Attempt recovery]
    
    Update --> End[Operation complete]
    Recover --> End
```

## Memory Management Flow

```mermaid
sequenceDiagram
    participant Module
    participant State as TM_FileState
    participant DOM
    participant Browser
    
    Module->>State: Subscribe to changes
    Module->>DOM: Add event listeners
    Module->>DOM: Create UI elements
    
    Note over Module,Browser: Module is active
    
    DOM->>Module: DOMNodeRemoved event
    Module->>State: Unsubscribe from changes
    Module->>DOM: Remove event listeners
    Module->>Browser: Clean up references
    
    Note over Module,Browser: Memory freed
```

## Performance Optimization Flow

```mermaid
graph TB
    subgraph "Data Loading"
        Large[Large File Detected] --> Lazy[Lazy Loading Strategy]
        Lazy --> Preview[Preview First 30 Rows]
        Preview --> Background[Load Full Data in Background]
    end
    
    subgraph "UI Updates"
        Frequent[Frequent Updates] --> Debounce[Debounce Updates]
        Debounce --> Batch[Batch DOM Changes]
        Batch --> RAF[Use requestAnimationFrame]
    end
    
    subgraph "Memory Management"
        Heavy[Heavy Operations] --> Worker[Consider Web Workers]
        Worker --> Cleanup[Aggressive Cleanup]
        Cleanup --> GC[Trigger Garbage Collection]
    end
```

## AI Agent Implementation Guide

### Step 1: Understand the Flow
1. Study the main architecture diagram
2. Identify which modules you need
3. Understand the initialization sequence

### Step 2: Follow the Patterns
1. Use the file processing flow for data handling
2. Follow the UI registration flow for panels
3. Implement state management communication

### Step 3: Handle Edge Cases
1. Follow error handling flow
2. Implement memory management
3. Apply performance optimizations

### Key Takeaways for AI Agents

1. **Dependencies Load First**: Libraries before modules
2. **Wait for Systems**: Check TM_UI and TM_FileState availability
3. **Subscribe and Cleanup**: Always unsubscribe from state changes
4. **Event-Driven**: Use events for loose coupling
5. **Performance Aware**: Implement lazy loading for large data

These diagrams provide AI agents with visual guides for implementing similar modular architectures in their own Tampermonkey scripts.