import { combineReducers } from 'redux';
import products from './../reducers/products'
import itemEditing from './../reducers/ItemEditing'

const appReducers = combineReducers({
    products,
    itemEditing
});
export default appReducers;