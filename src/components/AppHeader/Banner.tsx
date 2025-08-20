// src/components/Banner.tsx
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SyncLoader } from "react-spinners";
import { encodeId, generateSlug } from '../../utils/helpers';
const BASE_URL = import.meta.env.VITE_API_URL;
const Banner: React.FC = () => {
    const [inputSearchvlue, setInputSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);
    // const take = 5;
    // console.log(inputSearchvlue);
    
    

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputSearchvlue.trim().length === 0) {
                setSuggestions([]);
                setSkip(0);
                return;
            }

            fetchSuggestions(inputSearchvlue, 0);
        }, 300); // 300ms debounce

        return () => clearTimeout(delayDebounce);
    }, [inputSearchvlue]);


    //https://api.cooltrails.purchaseitnow.shop/API/Trail/Search
    const fetchSuggestions = async (searchTerm: string, skipCount = 0) => {
        setLoading(true);
        let result = [];

        try {
            const response = await axios.post(`${BASE_URL}/Trail/Search`, {
                take: take,
                skip: skipCount,
                searchkey: searchTerm,
                category: ''
            });
            //console.log("searchkey response", response.data);
            setSuggestions(response.data.data);
            // console.log("searchkey response:", {searchkey:searchTerm,category:''} );
            result = response.data.data || [];
            if (response.data?.status === "success" && response.data.data.length > 0) {
                setSuggestions(response.data.data);
            } else{
                // console.log("Trying category search:", { searchkey: '', category: searchTerm });
                const fallback = await axios.post(`${BASE_URL}/Trail/Search`, {
                take: take,
                skip: skipCount,
                searchkey: '',
                category: searchTerm
                });
                if (fallback.data?.status === "success" && fallback.data.data.length > 0) {
                    // console.log("category response", fallback.data);
                    setSuggestions(fallback.data.data); 
                } else {
                    setSuggestions([]); 
                }
                
            }       
        } catch (error) {

            console.error('Error fetching suggestions', error);
        }

    setLoading(false);
};


    const handleClose  = (e) =>{
        e.preventDefault();
        setInputSearchValue('');
        setSuggestions([]);
    }
   
// console.log(suggestions);
    return (
      <section className="home-hero-section">
        <div className="container-fluid  bg-image">
            <div className="row">
                <div className="col-xl-12">
                    <div className="home-hero-content text-center">
                        <h1 className="hh-title text-white mb-4"><span className="d-block text-1">Find Your</span> <span
                                className="d-block text-2">Next Adventure</span></h1>
                        <div className='autocompleteContainer'>
                        <form action="#!" className="hh-search-form position-relative">
                            <input type="text" placeholder="Search by City, Park or Trail Name" 
                            className="inputbox"
                            name="Searchbox" 
                            value={inputSearchvlue}
                            onChange={(e)=>setInputSearchValue(e.target.value)}
                            autoComplete="off"/>
                            <button className="search-btn"> 
                                <i className="bi bi-search"></i>
                            </button>
                            {
                                inputSearchvlue && <button className="search-close" onClick={handleClose}>
                                    <i className="bi bi-x-circle"></i>
                                </button>
                            }
                            
                        </form>  
                        {loading && <div className="section-local-favorite d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
                            <SyncLoader color="#FC673C" size={15} />
                            </div>} 
                        {
                        inputSearchvlue && (
                            suggestions.length > 0 ? (
                                <ul className="suggestions">
                                {suggestions.map((item: any, index: number) => {
                                    const trailurl = `/${generateSlug(item.type)}s/${generateSlug(item.country)}/${generateSlug(item.state)}/${generateSlug(item.city)}/${item.urlTitle ? item.urlTitle : generateSlug(item.title)}`;
                                    const parkUrl = `/${generateSlug(item.type)}s/${generateSlug(item.country)}/${generateSlug(item.state)}/${generateSlug(item.city)}/${item.urlTitle ? item.urlTitle : generateSlug(item.title)}`;

                                    return(
                                    <li
                                    key={index}
                                    className="flex items-start px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    style={{textAlign:'left'}}
                                    >
                                    <div> 
                                        <div className="font-medium text-gray-900">
                                        
                                        {/* <Link to={`/affiliate-details/${item.trailId}`} className="a-text">
                                            {item.title}
                                        </Link> */}
                                        {/* <Link to={`/affiliate-details/${generateSlug(item.title)}`} className="a-text">
                                            {item.title}
                                        </Link> */}
                                        
                                        <Link className="a-text"
                                            to={
                                                item.type === 'Trail'
                                                ? trailurl
                                                : parkUrl
                                            }
                                            >
                                           {`${item.title} (${item.type})`}
                                        </Link>
                                        </div>
                                    </div>
                                    </li>
                                    )
                                    })}
                                </ul>
                            ) : (
                                <ul className="suggestions">   
                                    <li className="flex items-start px-3 py-2 hover:bg-gray-100">
                                    <div>
                                        <div className="font-medium text-gray-900" style={{color:'#fff'}}>
                                            No results found.
                                        </div>
                                    </div>
                                    </li>
                                </ul>
                            )
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
  );
};

export default Banner;
