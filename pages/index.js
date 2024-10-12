import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";
import { Fragment } from "react";

function HomePage(){
    const featuredEvents= getFeaturedEvents();
    
    return(
        <Fragment>
            <EventsSearch/>
            <EventList items={featuredEvents}/>
        </Fragment>   
    );
}

export default HomePage;