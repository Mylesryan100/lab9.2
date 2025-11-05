//import { useState } from 'react'
import { useCallback, useState } from "react";
import "./App.css";
//import ColorPicker from "./components/ColorPicker";
//import Toggler from "./components/Toggler";
import { CharacterCounter } from "./components/CharacterCounter";
import TextInput from "./components/TextInput";

function getWordCount(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).filter(Boolean).length : 0;
}

function App() {

  const [text, setText] = useState<string>("");
  const handleTextChange = useCallback((next: string) => {
    setText(next);
  }, []);

  const charCount = text.length;
  const wordCount = getWordCount(text);

  return (
    <div className="p-4 space-y-4">
      <h1>Character Counter App</h1>

      <CharacterCounter />

      <TextInput
        onTextChange={handleTextChange}
        placeholder="Type here to see live stats below…"
        initialValue=""
      />

      <section aria-label="Live stats" className="space-y-1">
        <div><strong>Characters:</strong> {charCount}</div>
        <div><strong>Words:</strong> {wordCount}</div>
      </section>

      <hr />

    </div>
  );
}

export default App;