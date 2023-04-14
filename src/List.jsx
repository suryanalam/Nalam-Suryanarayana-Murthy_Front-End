import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
	const [buffer, setBuffer] = useState(false); //creating a new state to hold boolean values for changing bg color.

	useEffect(() => {
		index === isSelected ? setBuffer(true) : setBuffer(false); //if index value in isSelected and index value in index is equal
	}, [index, isSelected]); //set the buffer value true or set buffer value false

	return (
		<li
			style={{
				//added style properties (cursor, padding ) for the list items
				cursor: "pointer",
				padding: "0.5rem",
				backgroundColor: buffer ? "green" : "red",
			}} // if buffer is true then background color is green else background color is red
			onClick={() => onClickHandler(index)} // calling the onClickHandler inside an anonymous function to follow the render stack.
		>
			{text}
		</li>
	);
};

WrappedSingleListItem.propTypes = {
	index: PropTypes.number,
	isSelected: PropTypes.number, //changed the prototype of isSelected from 'bool' to 'number'
	onClickHandler: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
	const [selectedIndex, setSelectedIndex] = useState(); // modified the destructing of useState()

	useEffect(() => {
		setSelectedIndex(null);
	}, [setSelectedIndex]); // changed dependency array to setSelectedIndex

	const handleClick = (index) => {
		setSelectedIndex(index);
	};

	return (                                                                        //added style properties (listStyleType, padding) to the ul tag.
		<ul style={{ listStyleType: "none", padding: "1rem", textAlign: "left" }}> 
			{items.map((item, index) => (
				<SingleListItem
					onClickHandler={() => handleClick(index)}
					text={item.text}
					index={index}
					isSelected={selectedIndex}
					key={index} // passing key value while mapping the items
				/>
			))}
		</ul>
	);
};

WrappedListComponent.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			//prototype of items(array) was modified
			text: PropTypes.string.isRequired,
		})
	),
};

WrappedListComponent.defaultProps = {
	items: null,
};

const List = memo(WrappedListComponent);

export default List;
