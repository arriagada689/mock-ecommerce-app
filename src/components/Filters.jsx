import React from 'react'
import { Rating } from '@smastrom/react-rating'

const Filters = ({ handleCategoryChange, categoryFilter, handlePriceChange, priceFilter, handleRatingChange, ratingFilter }) => {
    
    return (
        <div className={`mx-auto md:flex-none w-fit md:border-r px-1 space-y-6`}>
            
            {/* Category Filter Section */}
            <div>
                <div className='text-lg'>Category Filter:</div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="all" name='category' value='all' onChange={handleCategoryChange} checked={!categoryFilter}/>
                    <label htmlFor="all">All</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="electronics" name='category' value='electronics' onChange={handleCategoryChange}/>
                    <label htmlFor="electronics">Electronics</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="jewelry" name='category' value='jewelery' onChange={handleCategoryChange}/>
                    <label htmlFor="jewelry">Jewelry</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="mens-clothing" name='category' value="men's clothing" onChange={handleCategoryChange}/>
                    <label htmlFor="mens-clothing">Men's Clothing</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="womens-clothing" name='category' value="women's clothing" onChange={handleCategoryChange}/>
                    <label htmlFor="womens-clothing">Women's Clothing</label>
                </div>
            </div>

            {/* Price Filter Section */}
            <div>
                <div className='text-lg'>Price Filter:</div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="price-all" name='price' value='all' onChange={handlePriceChange} checked={!priceFilter}/>
                    <label htmlFor="price-all">All</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="price-ten" name='price' value='ten' onChange={handlePriceChange}/>
                    <label htmlFor="price-ten">$0 - $10</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="price-twenty" name='price' value='twenty' onChange={handlePriceChange} />
                    <label htmlFor="price-twenty">$10 - $20</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="price-forty" name='price' value='forty' onChange={handlePriceChange} />
                    <label htmlFor="price-forty">$20 - $40</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="price-sixty" name='price' value='sixty' onChange={handlePriceChange} />
                    <label htmlFor="price-sixty">$40 - $60</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="price-one-twenty" name='price' value='one-twenty' onChange={handlePriceChange} />
                    <label htmlFor="price-one-twenty">$60 - $120</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="price-over" name='price' value='over' onChange={handlePriceChange} />
                    <label htmlFor="price-over">Over $120</label>
                </div>
            </div>

            {/* Rating Filter Section */}
            <div>
                <div className='text-lg'>Rating Filter:</div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="rating-all" name='rating' value='all' onChange={handleRatingChange} checked={!ratingFilter}/>
                    <label htmlFor="rating-all">All</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="rating-1" name='rating' value={1} onChange={handleRatingChange}/>
                    <label htmlFor="rating-1" className='flex space-x-1'><Rating style={{ maxWidth: 75 }} value={1} readOnly={true}/> <div>& up</div></label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="rating-2" name='rating' value={2} onChange={handleRatingChange}/>
                    <label htmlFor="rating-2" className='flex space-x-1'><Rating style={{ maxWidth: 75 }} value={2} readOnly={true}/> <div>& up</div></label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="rating-3" name='rating' value={3} onChange={handleRatingChange}/>
                    <label htmlFor="rating-3" className='flex space-x-1'><Rating style={{ maxWidth: 75 }} value={3} readOnly={true}/> <div>& up</div></label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input type="radio" id="rating-4" name='rating' value={4} onChange={handleRatingChange}/>
                    <label htmlFor="rating-4" className='flex space-x-1'><Rating style={{ maxWidth: 75 }} value={4} readOnly={true}/> <div>& up</div></label>
                </div>
            </div>
        </div>
        
    )
}

export default Filters