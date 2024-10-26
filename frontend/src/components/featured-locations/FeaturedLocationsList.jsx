import React from "react";
import LocationCard from "../../shared/LocationCard";
import {Col} from 'reactstrap';

import useFetch from "./../../hooks/useFetch";
import {BASE_URL} from "./../../utils/config";
import { useParams } from 'react-router-dom';

const FeaturedLocationsList = () => {
    const { modelType } = useParams();
    console.log(modelType)
    const {data : recommendedLocations, loading, error} = useFetch(
        `${BASE_URL}/allposts`  
        // `${BASE_URL}/location/search/recommended`  
    ); 

    {console.log(recommendedLocations)}

    

    return (
        <>
            {
                loading && <h4>Loading...</h4>
            }
            {
                error && <h4>{error}</h4>
            }

        {!loading && !error && recommendedLocations?.map(location => (
            <Col lg="3" md="6" sm="6" className="mb-4" key={location._id}>
                <LocationCard location={location} />
            </Col>
        ))}
        </>
    );
        
};
export default FeaturedLocationsList