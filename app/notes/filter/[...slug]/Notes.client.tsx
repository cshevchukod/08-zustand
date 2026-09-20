'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { deleteNote, fetchNotes } from '@/lib/api';

import css from '../../NotesPage.module.css';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const handleChange = (value: string) => {
    setInputValue(value);
    handleSearch(value);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleChange} />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data?.notes && <NoteList notes={data.notes} onDelete={handleDelete} />}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </main>
  );
}
