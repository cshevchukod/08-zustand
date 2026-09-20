import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

type Props = {
  note: Note;
};

export default function NotePreview({ note }: Props) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
