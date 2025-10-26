import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { JournalEntry } from "../../types";

const journalEntries: JournalEntry[] = [];

export const journalEntriesApi = createApi({
  reducerPath: "journalEntriesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["JournalEntry"],
  endpoints: (builder) => ({
    getJournalEntries: builder.query<JournalEntry[], void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return { data: journalEntries };
      },
      providesTags: ["JournalEntry"],
    }),
  }),
});

export const { useGetJournalEntriesQuery } = journalEntriesApi;
