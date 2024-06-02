import React, { useEffect, useState } from 'react'
import Filters from './Filters';
import ProductCard from './ProductCard';
import { IoIosSearch } from "react-icons/io";

const categories = ["electronics","jewelery","men's clothing","women's clothing"]

const Search = () => {
    const [products, setProducts] = useState([])
    const [query, setQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(null)
    const [priceFilter, setPriceFilter] = useState(null)
    const [ratingFilter, setRatingFilter] = useState(null)
    const [priceSorting, setPriceSorting] = useState('asc')
    const [isFocused, setIsFocused] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const fetchProducts = async () => {
            
            const requestBody = {}
            if (query) {
                requestBody.query = query
            }
            if (categoryFilter) {
                requestBody.categoryFilter = categoryFilter
            }
            if (priceFilter) {
                requestBody.priceFilter = priceFilter
            }
            if (ratingFilter) {
                requestBody.ratingFilter = ratingFilter
            }
            if (priceSorting) {
                requestBody.priceSorting = priceSorting
            }
            
            const response = await fetch('https://ecommerce-api-depeche.onrender.com/api/products/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                    categoryFilter: categoryFilter,
                    priceFilter: priceFilter,
                    ratingFilter: ratingFilter,
                    priceSorting: priceSorting
                })
            })
            if (response.ok) {
                const data = await response.json()
                setProducts(data)
            }
        }
        fetchProducts()
    }, [query, categoryFilter, priceFilter, ratingFilter, priceSorting])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderProducts = () => {
        return products.map((product, index) => {
            return <ProductCard key={index} product={product}/>
        })
    }

    const handleCategoryChange = (e) => {
        if (e.target.value === 'all'){
            setCategoryFilter(null)
        } else {
            setCategoryFilter(e.target.value);
        }
    };

    const handlePriceChange = (e) => {
        if (e.target.value === 'all') {
            setPriceFilter(null)
        } else if (e.target.value === 'ten'){
            setPriceFilter({min: 0, max: 10});
        } else if (e.target.value === 'twenty'){
            setPriceFilter({min: 10, max: 20});
        } else if (e.target.value === 'forty'){
            setPriceFilter({min: 20, max: 40});
        } else if (e.target.value === 'sixty'){
            setPriceFilter({min: 40, max: 60});
        } else if (e.target.value === 'one-twenty'){
            setPriceFilter({min: 60, max: 120});
        } else if (e.target.value === 'over'){
            setPriceFilter({min: 120, max: 9999999});
        }
    }

    const handleRatingChange = (e) => {
        if (e.target.value === 'all') {
            setRatingFilter(null)
        } else {
            setRatingFilter(e.target.value)
        }
    }

    const handleSortingChange = (e) => {
        if (e.target.value === 'asc') {
            setPriceSorting('asc');
        } else if (e.target.value === 'desc') {
            setPriceSorting('desc');
        }
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(window.innerWidth > 768);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className='container mx-auto my-2 '>
            
            <div className="flex flex-col md:flex-row md:space-x-4">
                {/* left side container */}
                {isMobile && (
                    <button onClick={toggleDropdown} className="bg-blue-500 text-white p-2 w-fit mx-auto mb-2">
                        Toggle Filters
                    </button>
                )}
                {isDropdownOpen && <Filters 
                    handleCategoryChange={handleCategoryChange} 
                    categoryFilter={categoryFilter}
                    handlePriceChange={handlePriceChange}
                    priceFilter={priceFilter}
                    handleRatingChange={handleRatingChange}
                    ratingFilter={ratingFilter}
                />}

                {/* right side container */}
                <div className="flex flex-col w-full">
                    
                    {/* search bar and sorting box container */}
                    <div className="flex justify-between mb-2 px-1">
                        <div className={`border-2 ${isFocused ? 'border-black' : 'border-gray-400'} flex w-fit items-center focus:border-black`}>
                            <input 
                                type="text" 
                                value={query} 
                                placeholder=' Search products...'
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className='border-none focus:outline-none'
                            />
                            <IoIosSearch size={20}/>
                        </div>

                        <select id="sorting" name="price-sorting" onChange={handleSortingChange} className="border border-gray-500 py-2 w-fit">
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Product card container */}
                    <div className={`p-2 space-y-4 md:flex md:flex-wrap md:space-y-4 ${products !== null && products.length > 2 ? 'md:justify-between' : ''} `}>
                        {products.length > 0 ? renderProducts() : <div>No products match the criteria.</div>}
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Search