// components/CheckboxGroup.tsx
import { useState, ChangeEvent } from 'react';

type CheckboxGroupProps = {
    options: object[],
    checked: string[],
    onChange: (selectedOptions: string[]) => void
}

const CheckBoxGroup: React.FC<CheckboxGroupProps> = ({ options, checked, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(checked);

    const handleCheckboxChange = async (option: string) => {
        let test = [...selectedOptions];
        if (selectedOptions.includes(option)) {
            test = test.filter((item) => item !== option)
        } else {
            console.log(option);
            
            test.push(option)
        }
        setSelectedOptions(test)
        onChange(test);
    };


    return (
        <div className='flex flex-wrap'>
            {options.map((option: any, i: number) => (
                <div key={i}>
                    <label className="text-gray-700 mr-5">
                        <input
                            type="checkbox"
                            value={option.name}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
                            checked={selectedOptions.includes(option.value)}
                            onChange={() => handleCheckboxChange(option.value)}
                        />
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckBoxGroup;
