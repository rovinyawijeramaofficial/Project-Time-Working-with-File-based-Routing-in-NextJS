import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

function AllEventsPage() {
    const events = getAllEvents();
    const router = useRouter();

    // Handler function for searching events
    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);  // Navigate to the dynamically constructed route
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler} /> {/* Passing function correctly */}
            <EventList items={events} />
        </Fragment>
    );
}

export default AllEventsPage;
