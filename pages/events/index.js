import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../helpers/api-util";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import Head from 'next/head';

function AllEventsPage(props) {
    const {events} = props;
    const router = useRouter();

    // Handler function for searching events
    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);  // Navigate to the dynamically constructed route
    }

    return (
        <Fragment>
            <Head>
                  <title>All Events</title>
                  <meta name="description" 
                  content="Find a lot of great events that all you to evolve..."/>
            </Head>
            <EventsSearch onSearch={findEventsHandler} /> {/* Passing function correctly */}
            <EventList items={events} />
        </Fragment>
    );
}

export async function getStaticProps(){
     const events=await getAllEvents();

     return{
        props:{
            events:events,
        },
        revalidate:60
     };
}

export default AllEventsPage;
