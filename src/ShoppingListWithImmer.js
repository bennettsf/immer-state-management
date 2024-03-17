import { produce } from "immer";
import React from "react";
import { useImmer } from "use-immer";
import './ShoppingListWithImmer.css'

function ShoppingListWithImmer() {
    // shopping list state
    const [shoppingList, setShoppingList] = useImmer([]);
    // increments each time a new item is added
    const [itemId, setItemId] = useImmer(1)

    // states used for adding a new item with a form
    const [newName, setNewName] = useImmer('')
    const [newQuantity, setNewQuantity] = useImmer('')
    const [newCategory, setNewCategory] = useImmer('')
    const [newDescription, setNewDescription] = useImmer('')

    // states used for updating an existing item with a form
    const [idToUpdate, setIdToUpdate] = useImmer('');
    const [updateName, setUpdateName] = useImmer('')
    const [updateQuantity, setUpdateQuantity] = useImmer('')
    const [updateCategory, setUpdateCategory] = useImmer('')
    const [updateDescription, setUpdateDescription] = useImmer('') 

    // handle all form changes by setting states
    const handleNewNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNewQuantityChange = (e) => {
        setNewQuantity(e.target.value)
    }

    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value)
    }

    const handleNewDescriptionChange = (e) => {
        setNewDescription(e.target.value)
    }

    const handleUpdateIdChange = (e) => {
        setIdToUpdate(e.target.value)
    }

    const handleUpdateNameChange = (e) => {
        setUpdateName(e.target.value)
    }

    const handleUpdateQuantityChange = (e) => {
        setUpdateQuantity(e.target.value)
    }

    const handleUpdateCategoryChange = (e) => {
        setUpdateCategory(e.target.value)
    }

    const handleUpdateDescriptionChange = (e) => {
        setUpdateDescription(e.target.value)
    }


    const addItem = (e) => {
        e.preventDefault()
        setShoppingList(produce(shoppingList, draft => {
            draft.push({
                id: itemId,
                name: newName,
                quantity: newQuantity,
                details: {
                    category: newCategory,
                    description: newDescription
                }
            })
            
        }))
        setItemId(itemId + 1);
    }

    const updateItem = (e) => {
        e.preventDefault()
        setShoppingList(produce(shoppingList, draft => {

            const idx = draft.findIndex(item => item.id === parseInt(idToUpdate))
            
            if (idx !== -1) {
                draft[idx].name = updateName
                draft[idx].quantity = updateQuantity
                draft[idx].details.category = updateCategory
                draft[idx].details.description = updateDescription
            } else {
                alert("The item ID does't exist!")
            }
        }))
    }

    const deleteItem = (itemName) => {
        setShoppingList(produce(shoppingList, draft => {
            const idx = draft.findIndex(item => itemName === item.name)
            draft.splice(idx, 1)
        }))    
    }
    return  <div>
                <div className="item-forms">
                <div>
                    <form className='add-item' onSubmit={addItem}>
                        <h2>Add An Item</h2>
                        <label>
                            Name:
                            <input type="text" value={newName} onChange={handleNewNameChange} />
                        </label><br/>
                        <label>
                            Quantity:
                            <input type="text" value={newQuantity} onChange={handleNewQuantityChange} />
                        </label><br/>
                        <label>
                            Category:
                            <input type="text" value={newCategory} onChange={handleNewCategoryChange} />
                        </label><br/>
                        <label>
                            Description:
                            <input type="text" value={newDescription} onChange={handleNewDescriptionChange} />
                        </label><br/>
                        <button type="submit">Add Item</button>
                    </form>
                </div>
                <div>
                    <form className='update-item' onSubmit={updateItem}>
                        <h2>Update An Item</h2>
                        <label>
                            ID:
                            <input type="text" value={idToUpdate} onChange={handleUpdateIdChange} />
                        </label><br/>
                        <label>
                            Name:
                            <input type="text" value={updateName} onChange={handleUpdateNameChange} />
                        </label><br/>
                        <label>
                            Quantity:
                            <input type="text" value={updateQuantity} onChange={handleUpdateQuantityChange} />
                        </label><br/>
                        <label>
                            Category:
                            <input type="text" value={updateCategory} onChange={handleUpdateCategoryChange} />
                        </label><br/>
                        <label>
                            Description:
                            <input type="text" value={updateDescription} onChange={handleUpdateDescriptionChange} />
                        </label><br/>
                        <button type="submit">Update Item</button>
                    </form>
                </div>
                </div>
                <div>
                    {shoppingList.map(item => (
                        <div key={item.id} className="item">
                            <h3>Name: {item.name}</h3>
                            <h3>Quantity: {item.quantity}</h3>
                            <h3>{item.details.category}</h3>
                            <p>{item.details.description}</p>
                            <p className="item-id">Item ID: {item.id}</p>
                            <button className="delete-button" onClick={() => deleteItem(item.name)}>Delete Item</button>
                        </div>
                    ))}   
                </div>
            </div>;
}

export default ShoppingListWithImmer;
