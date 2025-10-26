# Journal Entry Management System

This is a React + TypeScript application for automating accounting journal entry workflows. This system allows users to create and manage tasks that automatically post or reverse journal entries.

<img width="2802" height="1150" alt="CleanShot 2025-10-26 at 01 37 36@2x" src="https://github.com/user-attachments/assets/a026a732-17c7-4f87-9b6d-1b67569ea9a6" />


## 📖 What is a Journal Entry?

In accounting, a **Journal Entry** is a record of a financial transaction in the accounting system. Each entry consists of:

- **Entry Number**: Unique identifier (e.g., "JE-001")
- **Date**: When the transaction occurred
- **Description**: What the transaction is about (optional)
- **Line Items**: Individual debits and credits that make up the entry

### Journal Entry Line Items

Each line item contains:

- **Account**: The account name (e.g., "Cash", "Revenue", "Salaries Expense")
- **Debit**: Amount debited (left side of accounting equation)
- **Credit**: Amount credited (right side of accounting equation)
- **Memo**: Optional note about this line item

**Important Rule**: Total debits must equal total credits (the accounting equation must balance).

### Real-Life Examples

**Example 1: Monthly Payroll**

```
Date: 2025-10-31
Description: October 2025 Payroll

Line Items:
  Salaries Expense    | Debit: $12,500 | Credit: $0
  Cash                | Debit: $0      | Credit: $12,500
```

**Example 2: Office Rent Payment with Utilities**

```
Date: 2025-10-01
Description: October Rent and Utilities

Line Items:
  Rent Expense        | Debit: $3,500  | Credit: $0
  Utilities Expense   | Debit: $450    | Credit: $0
  Accounts Payable    | Debit: $0      | Credit: $3,500
  Cash                | Debit: $0      | Credit: $450
```

**Example 3: Revenue Recognition with Service Fee**

```
Date: 2025-10-15
Description: Client invoice payment with processing fee

Line Items:
  Cash                | Debit: $4,850  | Credit: $0
  Service Fee Expense | Debit: $150    | Credit: $0
  Revenue             | Debit: $0      | Credit: $5,000

```

## 🤖 How the System Works

This application simulates an **LLM-powered accounting automation system**. In a real implementation, an AI would analyze accounting data and execute tasks. For this project, all backend functionality is mocked in the frontend.

### Task Types

1. **POST_JOURNAL_ENTRY** ("Post Entry")

   - Creates a new journal entry
   - When run: Generates a proposed journal entry and sets status to `PENDING_ACTION`
   - User reviews the proposed entry and can execute it

2. **REVERSE_JOURNAL_ENTRY** ("Reverse Entry")

   - Reverses an existing journal entry (creates offsetting entry)
   - When run: Generates a proposed reversal and sets status to `PENDING_ACTION`
   - User reviews and can execute the reversal

3. **OTHER**
   - Generic task type
   - When run: Changes status to `COMPLETED`
   - No proposed action generated

### Task Workflow

```
1. User clicks "Run" on a task
   ↓
2. Status changes to "RUNNING" (simulates AI processing)
   ↓
3. After 5 seconds, status changes to "PENDING_ACTION"
   (or "COMPLETED" for OTHER tasks) - LLM returns a proposed action
   ↓
4. User clicks "View" to see the proposed action
   ↓
5. User clicks "Execute Action" to apply the changes
   ↓
6. Journal entry is posted/reversed, status changes to "COMPLETED"
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## 🏗️ Technical Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **RTK Query** for API calls (mocked)
- **React Router** for routing
- **React Aria Components** for accessible UI primitives
- **Tailwind CSS** for styling
- **react-reflex** for resizable split panels
- **Flowbite React Icons** for icons

## 📋 Your Tasks

You have **3 hours** to complete as many tasks as possible, starting with high priority items.

### ⚠️ Important Architectural Rule

**Feature-Based Folder Structure**: If a type, constant, or function is only used within one module, it MUST live in that module's folder. Avoid creating "global" folders like `/utils`, `/helpers`, `/constants` unless the code is truly shared across multiple features.

Example:

- ❌ `/src/utils/taskHelpers.ts` (only used in tasks)
- ✅ `/src/features/tasks/taskHelpers.ts`

Please enforce this rule throughout your implementation.

---

## 🔴 High Priority Tasks

### 1. Fix View Details Panel UX

**Problem**: The split panel cuts the table and doesn't display nicely. The splitter appears but the layout is broken.

**Requirements**:

- When "View" is clicked, the detail panel should occupy the full-width of its side
- The splitter should work correctly for resizing
- Both panels should be scrollable independently. The user should be able to horizontally scroll the table

---

### 2. Create Random Journal Entry Generator Algorithm

**Problem**: Currently, the `SAMPLE_PROPOSED_ENTRY` in `mockData.ts` is hardcoded. We need a function that generates random, balanced journal entries, that better simulates what an LLM would return. This function must replace `SAMPLE_PROPOSED_ENTRY`.

**Requirements**:

Create a function `generateRandomJournalEntry()` that:

- Generates a random journal entry with 2-5 line items
- **ALWAYS ensures total debits equal total credits** (accounting equation must balance)
- Uses random accounts from the `ACCOUNTS` array in types
- Generates random amounts between $100 and $10,000
- Returns a `ProposedJournalEntry` object

**Examples of Valid Generated Entries**:

✅ **Example 1: Simple 2-item entry**

```javascript
{
  date: "2025-10-26",
  description: "Automated entry",
  lineItems: [
    { account: "Cash", debit: 5000, credit: 0 },
    { account: "Revenue", debit: 0, credit: 5000 }
  ]
}
// Total Debits: $5,000 | Total Credits: $5,000 ✓
```

✅ **Example 2: Complex 4-item entry**

```javascript
{
  date: "2025-10-26",
  description: "Automated entry",
  lineItems: [
    { account: "Equipment", debit: 3000, credit: 0 },
    { account: "Salaries Expense", debit: 2000, credit: 0 },
    { account: "Cash", debit: 0, credit: 4500 },
    { account: "Accounts Payable", debit: 0, credit: 500 }
  ]
}
// Total Debits: $5,000 | Total Credits: $5,000 ✓
```

❌ **Example 3: INVALID - Don't allow this**

```javascript
{
  date: "2025-10-26",
  description: "Automated entry",
  lineItems: [
    { account: "Cash", debit: 5000, credit: 0 },
    { account: "Revenue", debit: 0, credit: 3000 }  // ❌ Doesn't balance!
  ]
}
// Total Debits: $5,000 | Total Credits: $3,000 ✗ UNBALANCED
```

---

### 3. Display Proposed Actions in View Mode

**Problem**: The View panel shows basic task info but doesn't display the proposed action.

**Requirements**:

- When a task has a `proposedAction`, display it clearly in the detail panel
- For **POST_JOURNAL_ENTRY** tasks:
  - Show the proposed journal entry (date, description, line items)
  - Display line items in a table with columns: Account, Debit, Credit, Memo
  - Show if the entry balances (total debits = total credits)
- For **REVERSE_JOURNAL_ENTRY** tasks:
  - Show which journal entry will be reversed
    - Make sure that the LLM is returning a random `journalEntryId` that exists
- Add an **"Execute Action"** button that:
  - Posts the journal entry (for POST tasks)
  - Removes the journal entry (for REVERSE tasks)
  - Updates task status to `COMPLETED`

---

### 4. Implement Create Task Form

**Problem**: The "Create Task" button doesn't do anything.

**Requirements**:

- Clicking "Create Task" should open a form using **react-reflex** (similar to View mode)
- Form fields depend on task type:
  - **Common fields**: Title, Description, Type (dropdown)
- Form validation is **required** (use vanilla validation or react-hook-form + zod)
- After submission:
  - Create the task using RTK Query mutation
  - Close the form panel
- Add a close button (X icon) to cancel creating a task

**Validation Rules**:

- Title: Required
- Description: Optional
- Type: Required

---

### 5. Implement Journal Entries Screen

**Problem**: The Journal Entries page is just a placeholder.

**Requirements**:

- Display journal entries as **cards**
- Each card should show:
  - Entry number (large, prominent)
  - Date (formatted nicely)
  - Description (if present)
  - Line items table inside the card (consider using the Table component)
- Line items table columns: Account, Debit, Credit, Memo
- Format currency properly ($1,234.56)

---

## 🟡 Medium Priority Tasks

### 6. Shareable URLs

**Problem**: Opening a task detail doesn't update the URL.

**Requirements**:

- When a task is selected, update URL: `/tasks?taskId=task-1`
- When a journal entry is selected, update URL: `/journal-entries?entryId=je-001`
- On page load, if URL contains an ID, open that detail panel automatically
- URLs should be shareable (copying and opening in new tab works)

---

### 7. Implement Bulk Run

**Requirements**:

- Add "Run Selected" button to task table header (appears when tasks are selected via checkboxes)
- Create a new RTK Query mutation: `useRunTasksBulkMutation`
- Run all selected tasks in parallel

**Important**: Don't just call `runTask` multiple times. Create a dedicated bulk endpoint.

---

### 8. Fix ESLint Errors

**Problem**: There are ESLint errors (some related to enums), but they're not showing in the Vite dev server.

**Requirements**:

- Configure Vite to show ESLint errors during development
- Fix all ESLint errors
- **Keep the enums** (don't convert to const objects)

---

## ⭐ Bonus Tasks

### 9. Implement Filters

**Requirements**:

- Add filter UI above the task table:
  - Search input (filters by task title)
  - Type dropdown (filters by task type)
- Persist filters in URL: `/tasks?search=payroll&type=POST_JOURNAL_ENTRY`
- Filters should be shareable (copying URL preserves filters)
- Clear filters button

---

### 10. Persist Data in Local Storage

**Requirements**:

- Save tasks and journal entries to `localStorage` on every change
- Load from `localStorage` on app startup

---

## 💡 Tips

1. **Start with High Priority tasks** - They build on each other
2. **Read the existing code** - Many patterns are already established
3. **Use existing components** - Table, Button, Badge, etc. are already built
4. **Quality over quantity** - It's better to complete high priority tasks well than to rush through everything

Good luck! 🚀
