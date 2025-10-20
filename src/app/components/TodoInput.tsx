import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type TodoInputProps = {
  text: string;
  setText: (value: string) => void;
  //　ボタンをクリックするだけなので何も返す必要はない
  onAdd: () => void;
};

export function TodoInput(props: TodoInputProps) {
  const { text, setText, onAdd } = props;
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="やることを入力"
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/* 追加 */}
      <button
        onClick={onAdd}
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md transition-colors hover:bg-blue-600"
      >
        追加
      </button>
    </div>
  );
}
