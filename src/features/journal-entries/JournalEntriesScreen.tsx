import { PageHeader, PageContent } from "../../components/layout";
import { EmptyState } from "../../components/ui";

export const JournalEntriesScreen = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader
        title="Journal Entries"
        description="View and manage journal entries"
      />
      <PageContent>
        <EmptyState
          title="No journal entries found"
          description="Journal entries will appear here when tasks are executed"
        />
      </PageContent>
    </div>
  );
};
