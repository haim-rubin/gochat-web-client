import React from 'react'

const SearchContactPanel = ({ onChange=(event) => {}, value}) => {
    return (
        <div id='search'>
			<label htmlFor=''>
                <i className='fa fa-search' aria-hidden='true'></i>
            </label>
			<input type='text' value={value} placeholder='Search contacts...' onChange={(event) => {}}/>
		</div>
    )
}

export default SearchContactPanel