interface MyListBoxProps {
    inputValue: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options: string[];
  }
  
  const MyListBox: React.FC<MyListBoxProps> = ({ inputValue, onInputChange, options }) => {
    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          placeholder="Type to add options"
        />
        <ul>
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MyListBox;
  