import { useState } from 'react';
import './App.css';
import ShoppingList from './ShoppingList';

function App() {
    const [shoppingList, setShoppingList] = useState([]);
    const [budget] = useState(100);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const addItem = (event) => {
        event.preventDefault();
        let form = event.target;
        let formData = new FormData(form);
        let formDataObj = Object.fromEntries(formData.entries());

        formDataObj.purchased = false;
        formDataObj.cost = parseFloat(formDataObj.cost || 0);
        formDataObj.category = formDataObj.category || 'Other';

        setShoppingList([...shoppingList, formDataObj]);
        form.reset();
    };

    const removeItem = (event) => {
        const name = event.target.value;
        setShoppingList(shoppingList.filter(item => item.name !== name));
    };

    const categories = ['All', 'Grocery', 'School', 'Electronics', 'Other'];

    const filteredList = selectedCategory === 'All'
        ? shoppingList
        : shoppingList.filter(item => item.category === selectedCategory);

    return (
        <>
            <h1>Shopping List Manager</h1>

            <div className='card'>
                <form onSubmit={addItem} className='flex-apart'>
                    <input type="text" name="name" placeholder='Add item to list...' required />
                    <input type="number" name="cost" placeholder='Add price to item...' step="0.01" />
                    <select name="category">
                        <option value="">Select category</option>
                        <option value="Grocery">Grocery</option>
                        <option value="School">School</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="date" name="dueDate" />
                    <button className='btn purple' type='submit'>Add</button>
                </form>
            </div>

            <div className='category-filters'>
                {categories.map(category => (
                    <button
                        key={category}
                        className={`btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <ShoppingList
                shoppingList={filteredList}
                removeItem={removeItem}
                budget={budget}
            />
        </>
    );
}

export default App;