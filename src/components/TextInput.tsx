import { useState } from "react";




export interface TextInputProps {
  onTextChange: (text: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function TextInput({
  onTextChange,
  placeholder = "Start typing...",
  initialValue = "",
  }: TextInputProps) {
  
    const [text, setText = useState(initialValue)]

    return (
        <div>
            <h1>Text Input</h1>
            <input
            type="text"
            placeholder="Type a word"
            onChange={(e) => onTextChange(e.target.value)}/>
        </div>
    )

 // const id = useId();
 // const [text, setText] = useState<string>(initialValue);
  //const [stats, setStats] = useState<TextStats>(() => getTextStats(initialValue));

export default TextInput;