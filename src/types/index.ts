export enum TaskType {
  POST_JOURNAL_ENTRY = "POST_JOURNAL_ENTRY",
  REVERSE_JOURNAL_ENTRY = "REVERSE_JOURNAL_ENTRY",
  OTHER = "OTHER",
}

export enum TaskStatus {
  PENDING_RUN = "pending_run",
  RUNNING = "running",
  PENDING_ACTION = "pending_action",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface LineItem {
  id: string;
  account: string;
  debit: number;
  credit: number;
  memo?: string;
}

// Base task interface with common properties
interface BaseTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  lastRunAt?: string;
  lastRunError?: string;
}

// Proposed Actions
export interface ProposedJournalEntry {
  date: string;
  description: string;
  lineItems: LineItem[];
}

export interface ReverseJournalEntryAction {
  journalEntryId: string;
}

// Task Union Types
export interface PostJournalEntryTask extends BaseTask {
  type: TaskType.POST_JOURNAL_ENTRY;
  proposedAction?: ProposedJournalEntry;
}

export interface ReverseJournalEntryTask extends BaseTask {
  type: TaskType.REVERSE_JOURNAL_ENTRY;
  proposedAction?: ReverseJournalEntryAction;
}

export interface OtherTask extends BaseTask {
  type: TaskType.OTHER;
  proposedAction?: Record<string, unknown>;
}

export type Task = PostJournalEntryTask | ReverseJournalEntryTask | OtherTask;

export interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  description?: string;
  lineItems: LineItem[];
  createdAt: string;
}

export const ACCOUNTS = [
  "Cash",
  "Accounts Payable",
  "Revenue",
  "Expenses",
  "Equipment",
  "Inventory",
  "Accounts Receivable",
  "Other",
  "Depreciation",
  "Interest Income",
  "Interest Expense",
  "Dividends",
  "Retained Earnings",
  "Common Stock",
  "Preferred Stock",
  "Additional Paid-in Capital",
  "Retained Earnings",
  "Common Stock",
  "Preferred Stock",
];
