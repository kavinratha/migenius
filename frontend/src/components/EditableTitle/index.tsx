import { useState, useEffect, useRef } from 'react';

interface Props {
  title: string;
  isEditing: boolean;
  onStartEditing: () => void;
  onFinishEditing: () => void;
  onChange: (newTitle: string) => void;
}

export const EditableTitle = ({ title, isEditing, onStartEditing, onFinishEditing, onChange }: Props) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange(editedTitle);
      onFinishEditing();
    } else if (e.key === 'Escape') {
      setEditedTitle(title);
      onFinishEditing();
    }
  };

  const handleBlur = () => {
    onChange(editedTitle);
    onFinishEditing();
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="text-xl font-semibold bg-transparent border-b-2 border-blue-500 outline-none w-full"
        placeholder="Besprechungstitel eingeben"
      />
    );
  }

  return (
    <h1
      onClick={onStartEditing}
      className="text-xl font-semibold cursor-pointer hover:text-blue-600 transition-colors"
      title="Klicken zum Bearbeiten"
    >
      {title}
    </h1>
  );
}; 