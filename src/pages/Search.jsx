import React, { useEffect, useState } from 'react';
import './Search.css';
import Nav from '../components/Nav';
import EventCard from '../components/EventCard.jsx';
import Footer from '../components/Footer.jsx';
import searchClear from '../assets/searchClear.png';
import { db } from '../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [eventList, setEventList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
  const [selectedPriceRangeFilters, setSelectedPriceRangeFilters] = useState([]);
  const [selectedDateFilters, setSelectedDateFilters] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/event')
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, "Events");
        const querySnapshot = await getDocs(eventsCollectionRef);
        const eventsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setEventList(eventsData);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filteredItems = eventList;

      if (selectedCategoryFilters.length > 0) {
        filteredItems = filteredItems.filter((item) => selectedCategoryFilters.includes(item.Category));
      }

      if (selectedPriceRangeFilters.length > 0) {
        filteredItems = filteredItems.filter((item) => {
          return selectedPriceRangeFilters.some(({ minPrice, maxPrice }) => {
            return item.price >= minPrice && item.price <= maxPrice;
          });
        });
      }
      
      filteredItems = filteredItems.filter(item =>
        item.eventName.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredData(filteredItems);
    };
  
    applyFilters();
  }, [selectedCategoryFilters, selectedPriceRangeFilters, eventList, search]);

  const handleCategoryFilterClick = (category) => {
    const newSelectedCategoryFilters = selectedCategoryFilters.includes(category)
      ? selectedCategoryFilters.filter((item) => item !== category)
      : [...selectedCategoryFilters, category];
    setSelectedCategoryFilters(newSelectedCategoryFilters);
  };

  const handlePriceRangeFilterClick = (selectedPriceRange) => {
    let minPrice, maxPrice;
    
    if (selectedPriceRange === "Rs.0 - Rs.1000") {
      minPrice = 0;
      maxPrice = 1000;
    } else if (selectedPriceRange === "Rs.1000 - Rs.5000") {
      minPrice = 1000;
      maxPrice = 5000;
    } else if (selectedPriceRange === "Above 5000") {
      minPrice = 5000;
      maxPrice = 20000; 
    } else {
      console.error("Invalid price range format");
      return;
    }
  
    const isFilterSelected = selectedPriceRangeFilters.some(
      filter => filter.minPrice === minPrice && filter.maxPrice === maxPrice
    );
  
    if (isFilterSelected) {
      // If the filter is already selected, remove it
      const newSelectedPriceRangeFilters = selectedPriceRangeFilters.filter(
        filter => !(filter.minPrice === minPrice && filter.maxPrice === maxPrice)
      );
      setSelectedPriceRangeFilters(newSelectedPriceRangeFilters);
    } else {
      // If the filter is not selected, add it
      const newSelectedPriceRangeFilters = [...selectedPriceRangeFilters, { minPrice, maxPrice }];
      setSelectedPriceRangeFilters(newSelectedPriceRangeFilters);
    }
  
  
   
  };
  const handleDateFilterClick = (date) => {
    const newSelectedDateFilters = selectedDateFilters.includes(date)
      ? selectedDateFilters.filter((item) => item !== date)
      : [...selectedDateFilters, date];
    setSelectedDateFilters(newSelectedDateFilters);
  };
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const clearFilters = () => {
    setSelectedCategoryFilters([]);
    setSelectedPriceRangeFilters([]);
    setSelectedDateFilters([]);
    setSearch('');
  };

  return (
    <div>

      <Nav />

      <div className='navbar-search'>
        <input
          type='text'
          name='search'
          placeholder='Search'
          onChange={handleSearchChange}
          value={search}
        />
        {search ? (
          <img
            src={searchClear}
            alt='clear btn'
            className='nav-search-clear'
            onClick={() => setSearch('')}
          />
        ) : (
          <></>
        )}
      </div>
      
      <div className='container'>
        <div className="filters-left">
          <div className="price-filter">
            <h2>Category</h2>
            {["Comedy show", "Musical", "Workshop", "Performance", "Conference", "Award show", "other"].map((category, index) => (
              <label key={index}>
                <input type='checkbox' checked={selectedCategoryFilters.includes(category)} name='category' onChange={() => handleCategoryFilterClick(category)} />
                {category}
              </label>
            ))}
          </div>
          <div className="price-filter">
            <h2>Price Range</h2>
            {["Rs.0 - Rs.1000", "Rs.1000 - Rs.5000", "Above 5000"].map((category, index) => (
  <label key={index}>
    <input 
      type='checkbox' 
      checked={selectedPriceRangeFilters.some(filter => {
        if (category === "Rs.0 - Rs.1000" && filter.minPrice === 0 && filter.maxPrice === 1000) return true;
        if (category === "Rs.1000 - Rs.5000" && filter.minPrice === 1000 && filter.maxPrice === 5000) return true;
        if (category === "Above 5000" && filter.minPrice === 5000 && filter.maxPrice === 20000) return true;
        return false;
      })} 
      name='price' 
      onChange={() => handlePriceRangeFilterClick(category)} 
    />
    {category}
  </label>
))}
          </div>
          <div className="date-filter">
            <h2>Date</h2>
            {["Today", "Tomorrow", "This week", "This month"].map((category, index) => (
              <label key={index}>
                <input type='checkbox' checked={selectedDateFilters.includes(category)} name='date' onClick={() => handleDateFilterClick(category)} />
                {category}
              </label>
            ))}
          </div>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
        <div className="search-cards-right">
          {filteredData.map((item, index) => (
            <div className='search--cards-row' key={index}>
              <div className='search--cards'>
                <EventCard
                  date={item.date}
                  month={item.month}
                  rating={item.rating}
                  image={item.img}
                  title={item.eventName}
                  location={item.locationName}
                  price={item.price}
                  click={handleNavigate}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
export default Search;
