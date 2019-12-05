import axios from 'axios'

const pending = '_PENDING'
const fulfilled = '_FULFILLED'

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export function requestBudgetData(){
    let budget = axios.get('/api/budget-data').then(res => res.data)

    return{
        type: REQUEST_BUDGET_DATA,
        payload: budget
    }
}

export function addPurchase(price, description, category){
    let purchase = axios.post('/api/budget-data/purchase', {price, description, category}).then(res => res.data)

    return{
        type: ADD_PURCHASE,
        payload: purchase
    }
}

export function removePurchase(id){
    let remove = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)

    return{
        type: REMOVE_PURCHASE,
        payload: remove
    }
}

export default function budgetReducer(state = initialState, action){
    switch(action.type){
        case REQUEST_BUDGET_DATA + pending:
            return {...state, loading: true}
        case REQUEST_BUDGET_DATA + fulfilled:
            return {...state, ...action.payload, loading: false}
        case ADD_PURCHASE + pending:
            return {...state, loading: true}
        case ADD_PURCHASE + fulfilled:
            return {...state, purchases: action.payload, loading: false}
        case REMOVE_PURCHASE + pending:
            return {...state, loading: true}
        case REMOVE_PURCHASE + fulfilled:
            return {...state, purchases: action.payload, loading: false}
        default:
            return state
    }
}