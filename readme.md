# Checklist LocalStorage Hook

## Overview
This project includes a reusable React hook called **`useLocalStorage`**, which allows any checklist component to automatically save and restore selections using **localStorage**. It supports both:

- **Boolean checklists** (one-and-done checkboxes)
- **Multi-status checklists** (items with multiple states that can change over time)

All localStorage operations include robust error handling to prevent application crashes if storage is restricted or unavailable.

---

## Features
- ✔ Automatically loads saved checklist state from `localStorage`
- ✔ Automatically saves changes to `localStorage`
- ✔ Initializes the full localStorage schema if no existing data is found
- ✔ Works with any data type: boolean, string, number, object
- ✔ Provides helpers: 
  - `toggle(id)` for booleans
  - `update(id, value)` for any type
- ✔ Easy to integrate into existing React components
- ✔ Fully wrapped in `try...catch` for safe operation

---

##  Installation
Add the hook file to your project:

```
.../
    useLocalStorage.js
```

---

##  Usage

### 1. Import the hook
```jsx
import useLocalStorage from "../hooks/useLocalStorage";
```

### 2. Initialize it inside your component
```jsx
const { checked, toggle, update } = useLocalStorage("myChecklist", defaultState);
```

**Arguments:**

| Name | Type | Description |
|------|------|-------------|
| `storageKey` | string | A unique key for localStorage |
| `defaultState` | object | Initial schema with default values (booleans, strings, numbers, etc.) |

---

## 🖊 Rendering Checklists

### Boolean checklist (one-and-done)
```jsx
const items = [
  { id: "task1", label: "Task 1" },
  { id: "task2", label: "Task 2" }
];

{items.map(item => (
  <label key={item.id}>
    <input
      type="checkbox"
      checked={checked[item.id] || false}
      onChange={() => toggle(item.id)}
    />
    {item.label}
  </label>
))}
```

### Multi-status checklist
```jsx
const items = [
  { id: "task1", label: "Task 1" },
  { id: "task2", label: "Task 2" }
];

const cycleStatus = (id) => {
  const nextStatus = checked[id] === "none" ? "inProgress"
                   : checked[id] === "inProgress" ? "done"
                   : "none";
  update(id, nextStatus);
};

{items.map(item => (
  <button key={item.id} onClick={() => cycleStatus(item.id)}>
    {item.label}: {checked[item.id]}
  </button>
))}
```

---

## 🧪 Tips for Integration
- Use different `storageKey` values for multiple checklists.
- Works with booleans, strings, numbers, or objects.
- All localStorage operations are wrapped in `try...catch` to prevent crashes.
- To manually reset storage: `localStorage.removeItem("myChecklist")`

