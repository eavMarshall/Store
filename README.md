# Store

A wrapper around Reacts useSyncExternalStore hook, with a simple API

Example usage:
```jsx
import Store from "/common/Store";

const initialState = {
    options: [
        {
            value: 'one',
            label: 'One',
        },
        {
            value: 'two',
            label: 'Two',
        },
        {
            value: 'three',
            label: 'Three',
        },
    ],
    selectedOption: 'one',
};

class MyStore extends Store {
    setSelectedOption = (option) => {
        this.setState({
            selectedOption: option.value,
        });
    };
}

const store = new MyStore(initialState);
const useMyStore = store.useStore();

const MyComponent = () => {
    const options = useMyStore((state) => state.options);
    const selectedOption = useMyStore((state) => state.selectedOption);
    <select
        value={selectedOption}
        onChange={(option) => store.setSelectedOption(option)}
    >
        {options.map((option) => {
            return (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            );
        })}
    </select>
}
```

License
MIT
