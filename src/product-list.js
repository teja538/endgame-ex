import { productData } from "./data";
import {useReducer} from "react";
import "./product-list.css"
const allProducts = productData.productList;
const ReducerFun = (state,action) =>
{
    switch(action.type)
    {
        case "CLOTHING":
            return {
                ...state,
                categories:{
                    ...state["categories"],
                    clothing: !state.categories.clothing
                }
            }
        case "WALLART":
            return{
                ...state,
                categories:{
                    ...state["categories"],
                    wallart: !state.categories.wallart
                }
            }
        case "RATING":
            return{
                ...state,
                rating:action.value
            }
        case "SORTBY":
            return{
                ...state,
                sortBy:action.value
            }
        case "default":
            return state
    }
}

const getFilterBycaterogy = (allProducts,clothing,wallart) =>
{
    if(clothing && wallart)
    {
        return allProducts.filter((pro)=>pro.category === "clothing" || pro.category === "wallart")
    }
    else if(clothing)
    {
        return allProducts.filter((pro)=>pro.category === "clothing")
    }
    else if(wallart)
    {
        return allProducts.filter((pro)=>pro.category === "wallart")
    }
    return allProducts
}

const getFilterByRating = (allProducts,rating) =>
{
    return allProducts.filter((pro) => pro.rating >= rating)
}

const getSortBy = (allProducts,sortby) =>
{
    if(sortby === "lowToHigh")
    {
        return allProducts.sort((item1,item2) => item1.price-item2.price)
    }
    if(sortby === "highToLow")
    {
        return allProducts.sort((item1,item2) => item2.price-item1.price)
    }
    return allProducts
}


const ProductList = () => {
    const [state,dispatch] = useReducer(ReducerFun,{
        categories:{clothing:false,wallart:false},
        rating:0,
        sortBy:""
    })
    const ratingList = getFilterByRating(allProducts,state.rating)
    const sortList = getSortBy(ratingList,state.sortBy)
    const finalList = getFilterBycaterogy(sortList,state.categories.clothing,state.categories.wallart)
    return(
        <div>
            <div className="side-nav">
            <div className="filter">
                <h3>Filters</h3>
                <p>Clear</p>
            </div>
            <div className="filter-item price">
                <h4>Price</h4>
                <input type="range" id="price" name="price" step="100"
                min="50" max="1000" />
            </div>
            <div className="filter-item category">
                <h3>Category</h3>
                <input 
                type="checkbox" 
                className="check-box"
                value="clothing"
                checked={state.categories.clothing}
                onChange={(e)=>dispatch({type:"CLOTHING"})}
                
                /><label for="clothing">clothing</label><br />
                <input 
                type="checkbox" 
                className="check-box"
                value="wallart" 
                checked={state.categories.wallart}
                onChange = {(e)=>dispatch({type:"WALLART"})}
                /><label for="wallart">wallart</label>
                
            </div>
            <div className="filter-item rating">
                <h3>Rating</h3>
                <input type="radio" 
                className="radio-btn" 
                name="rating"
                checked = {state.rating === 4}
                onChange = {(e)=>dispatch({type:"RATING",value:4})}
                /><label for="">4 Stars and above</label><br />
                <input type="radio" 
                className="radio-btn"
                name="rating"
                checked = {state.rating === 3}
                onChange = {(e)=>dispatch({type:"RATING",value:3})}
                /><label for="">3 Stars and above</label><br />
                <input type="radio"
                 className="radio-btn"
                 name="rating"
                 checked = {state.rating === 2}
                 onChange = {(e)=>dispatch({type:"RATING",value:2})}
                  /><label for="">2 Stars and above</label><br />
                <input type="radio"
                 className="radio-btn"
                 name="rating"
                 checked = {state.rating === 1}
                 onChange = {(e)=>dispatch({type:"RATING",value:1})}
                  /><label for="">1 Stars and above</label><br />
            </div>
            <div className="filter-item sortby">
                <h3>Sort by</h3>
                <input type="radio"
                 className="radio-btn"
                 name="sortby"
                 checked = {state.sortBy === "lowToHigh"}
                 onChange = {(e)=>dispatch({type:"SORTBY",value:"lowToHigh"})}
                
                  /><label for="">Price-Low to High</label><br />
                <input type="radio" 
                className="radio-btn"
                name="sortby"
                checked = {state.sortBy === "highToLow"}
                onChange = {(e)=>dispatch({type:"SORTBY",value:"highToLow"})}
                 /><label for="">Price-High to Low</label>
            </div>           
            </div>
            <h1>Products are:</h1>
            <div className="flex-row">
            {
                finalList.map((item) => 
                <div key={item.id} className="productCard">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                    <p>{item.category}</p>
                    <p>{item.rating}</p>
                    <button>add to cart</button>
                </div>
                )
            }
            </div>
        </div>
    )
}

export {ProductList}