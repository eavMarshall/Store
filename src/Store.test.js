import renderer from 'react-test-renderer';
import Store from "./Store";

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

class DropdownStoryStore extends Store {
    setSelectedOption = (option) => {
        this.setState({
            selectedOption: option.value,
        });
    };
}

test('testStore init state', () => {
    const store = new DropdownStoryStore(initialState);
    const state = store.getState()
    expect(state).toEqual(initialState);
});

test('selected state should change', () => {
    const store = new DropdownStoryStore(initialState);
    store.setSelectedOption({value: 'two', label: 'Two'});
    const state = store.getState();
    expect(state.selectedOption).toEqual('two');
});

test('updating state should trigger react to re-render', async () => {
    const store = new DropdownStoryStore(initialState);
    const useStore = store.useStore();
    const TestView = () => {
        const selectedOption = useStore((state) => state.selectedOption);
        return <>
            <div className={`selectedOption`}>{selectedOption}</div>
            <button className={`btn`} onClick={() => store.setSelectedOption({value: 'two', label: 'Two'})}></button>
        </>
    };

    const component = renderer.create(
        <TestView />
    );
    var tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`
[
  <div
    className="selectedOption"
  >
    one
  </div>,
  <button
    className="btn"
    onClick={[Function]}
  />,
]
`);
});
