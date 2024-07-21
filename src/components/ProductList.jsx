
// ProductList:
// יוצר רשימת מחלקות ומוצרים לפי מחלקה נבחרת

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { GetProductsByCategoryId } from "../utils/product";
import { GetCategories } from "../utils/categoryAPI";
import SingleProductDesktop from "./SingleProductDesktop";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategoryId } from '../features/categoriesSlice';

export default function ProductList({ setCategoryId }) {
    const [categories, setCategories] = useState([]);
    const selectedCategoryId = useSelector(state => state.categries.selectedCategoryId);
    // const [selectedCategory, setSelectedCategory] = useState(0);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        GetCategories().then((data) => {
            console.log("Categories:", data); // הוספת הודעת דיבאג
            setCategories(data)
        });
    }, []);

    const handleClickSelectedCategory = (categoryId) => {
        let value = (categoryId == selectedCategoryId) ? -1: categoryId;
        dispatch(setSelectedCategoryId(value));
    }

    return (
        <div>
            <div>
                {categories?.map(category =>
                    <Button style={{ margin: '12px' }} variant="contained" color={category.id == selectedCategoryId? "primary": "secondary"}
                        key={category.id} onClick={() => handleClickSelectedCategory(category.id)}>
                        {category.nameCategor}
                    </Button>
                )}
            </div>
            <div>
                {/* {products
                    .map((product) => (
                        <SingleProductDesktop key={product.id} product={product} />
                    ))
                    } */}
            </div>
        </div>
    );
}