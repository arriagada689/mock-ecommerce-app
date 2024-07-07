import React, { useEffect, useState } from 'react'
import Filters from './Filters';
import Filters2 from './Filters2';
import ProductCard from './ProductCard';
import { IoIosSearch } from "react-icons/io";
import { ColorRing } from 'react-loader-spinner'

const Search = () => {
    const [products, setProducts] = useState(null)
    const [query, setQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(null)
    const [priceFilter, setPriceFilter] = useState(null)
    const [ratingFilter, setRatingFilter] = useState(null)
    const [priceSorting, setPriceSorting] = useState('asc')
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/products/search`, {
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
                setLoading(false)
                setProducts(data)
            }
        }
        fetchProducts()
    }, [query, categoryFilter, priceFilter, ratingFilter, priceSorting])

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

    return (
        <div className='container mx-auto my-2 '>
            
            {/*Search section big screens */}
            <div className="hidden md:flex md:flex-row md:space-x-4">
                {/* left side container */}
                
                <Filters 
                    handleCategoryChange={handleCategoryChange} 
                    categoryFilter={categoryFilter}
                    handlePriceChange={handlePriceChange}
                    priceFilter={priceFilter}
                    handleRatingChange={handleRatingChange}
                    ratingFilter={ratingFilter}
                />

                {/* right side container */}
                <div className="flex flex-col w-full">
                    
                    {/* search bar and sorting box container */}
                    <div className="flex justify-between mb-2 px-1">
                        <div className={`border-2 ${isFocused ? 'border-black dark:border-white' : 'border-gray-400'} flex w-fit items-center focus:border-black`}>
                            <input 
                                type="text" 
                                value={query} 
                                placeholder='Search products...'
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className='border-none focus:outline-none pl-2 dark:bg-neutral-900'
                            />
                            <IoIosSearch size={20}/>
                        </div>

                        <select id="sorting" name="price-sorting" onChange={handleSortingChange} className="border border-gray-500 py-2 w-fit dark:bg-neutral-900">
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Product card container */}
                    {loading && 
                        <div className='flex items-center justify-center h-[250px]'>
                            <ColorRing
                                visible={true}
                                height="100"
                                width="100"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        </div>
                    }
                    <div className={`p-2 gap-y-4 md:flex md:items-center md:flex-wrap ${products && products.length > 0 && products.length > 2 ? 'md:justify-between' : ''} `}>
                        {products && products.length > 0 && renderProducts()}
                    </div>
                    
                </div>
            </div>

            {/*Search section for small screens */}
            <div className='flex flex-col md:hidden'>
                
                <button onClick={() => setIsDropdownOpen(prev => !prev)} className="bg-blue-500 text-white p-2 w-fit mx-auto mb-2">
                    Filter
                </button>

                {isDropdownOpen && 
                <Filters2 
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
                        <div className={`border-2 ${isFocused ? 'border-black dark:border-white' : 'border-gray-400'} flex w-fit items-center focus:border-black`}>
                            <input 
                                type="text" 
                                value={query} 
                                placeholder='Search products...'
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className='border-none focus:outline-none pl-2 dark:bg-neutral-900'
                            />
                            <IoIosSearch size={20}/>
                        </div>

                        <select id="sorting" name="price-sorting" onChange={handleSortingChange} className="border border-gray-500 py-2 w-fit dark:bg-neutral-900">
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Product card container */}
                    {loading && 
                        <div className='flex items-center justify-center h-[250px]'>
                            <ColorRing
                                visible={true}
                                height="100"
                                width="100"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        </div>
                    }
                    <div className={`p-2 space-y-4 md:flex md:flex-wrap md:space-y-4 ${products && products.length > 0 && products.length > 2 ? 'md:justify-between' : ''} `}>
                        {products && products.length > 0 && renderProducts()}
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}

export default Search