'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NewNote } from '@/types/note';

import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();

      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      router.back();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values: NewNote = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NewNote['tag'],
    };

    createMutation.mutate(values);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={(event) =>
            setDraft({
              ...draft,
              title: event.target.value,
            })
          }
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(event) =>
            setDraft({
              ...draft,
              content: event.target.value,
            })
          }
          maxLength={500}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(event) =>
            setDraft({
              ...draft,
              tag: event.target.value as NewNote['tag'],
            })
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
