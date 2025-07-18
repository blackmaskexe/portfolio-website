# Components Folder Structure

This document outlines the reorganized components folder structure for better maintainability and organization.

## New Structure

```
components/
├── desktop/              # Main desktop environment
│   ├── desktop.tsx      # Main desktop component
│   ├── desktop-icons.tsx # Desktop icons component
│   └── index.ts         # Barrel export
├── dock/                # macOS-style dock
│   ├── dock.tsx         # Dock component
│   └── index.ts         # Barrel export
├── menu-bar/            # macOS-style menu bar
│   ├── menu-bar.tsx     # Menu bar component
│   └── index.ts         # Barrel export
├── window-manager/      # Window management system
│   ├── window-manager.tsx        # Main window manager
│   ├── app-content.tsx           # Generic app content
│   ├── app-opening-animation.tsx # Window opening animations
│   └── index.ts                  # Barrel export
├── ios-simulator/       # iOS simulator and apps
│   ├── ios-simulator-window.tsx  # iOS simulator window
│   ├── gains-chat.tsx        # Motivation app content
│   ├── habitmentor-ai-app.tsx     # Habit tracker app content
│   └── index.ts                  # Barrel export
├── control-center/      # macOS-style control center
│   ├── control-center.tsx        # Control center component
│   └── index.ts                  # Barrel export
├── providers/           # Context providers
│   ├── theme-provider.tsx        # Theme provider component
│   └── index.ts                  # Barrel export
└── ui/                  # Shared UI components (unchanged)
    ├── button.tsx
    ├── card.tsx
    └── ... (all existing UI components)
```

## Organization Principles

### 1. **Feature-Based Grouping**

Each major UI feature has its own folder:

- `desktop/` - Desktop environment and desktop icons
- `dock/` - Dock functionality
- `menu-bar/` - Menu bar functionality
- `window-manager/` - Window management and related animations
- `ios-simulator/` - iOS simulator and all app content
- `control-center/` - Control center functionality

### 2. **Related Components Together**

Components that are closely related or used together are grouped in the same folder:

- iOS apps (`gains-chat.tsx`, `habitmentor-ai-app.tsx`) are with the simulator
- Window animations (`app-opening-animation.tsx`) are with the window manager
- Desktop icons are with the main desktop component

### 3. **Barrel Exports**

Each folder includes an `index.ts` file that exports its public API, making imports cleaner:

```typescript
// Instead of:
import { Desktop } from "@/components/desktop/desktop";

// You can use:
import { Desktop } from "@/components/desktop";
```

### 4. **Preserved UI Components**

The `ui/` folder remains unchanged as it contains shared UI components that are used across all features.

## Import Examples

```typescript
// Main app components
import { Desktop } from "@/components/desktop";
import { Dock } from "@/components/dock";
import { MenuBar } from "@/components/menu-bar";
import { WindowManager } from "@/components/window-manager";
import { ControlCenter } from "@/components/control-center";

// iOS simulator components
import {
  IOSSimulatorWindow,
  MotivationApp,
  HabitTrackerApp,
} from "@/components/ios-simulator";

// Types
import type { AppWindow } from "@/components/desktop";

// Providers
import { ThemeProvider } from "@/components/providers";

// UI components (unchanged)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

## Benefits

1. **Better Organization**: Related components are grouped together logically
2. **Easier Maintenance**: Changes to a feature affect only its folder
3. **Clear Dependencies**: Import statements clearly show component relationships
4. **Scalability**: Easy to add new features or components to appropriate folders
5. **Reduced Coupling**: Each major component has its own namespace

## Migration Notes

All import statements have been updated to use the new folder structure. The application builds successfully and maintains all existing functionality.
