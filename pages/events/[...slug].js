import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";
import Head from 'next/head';

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://pre-rendering-fetching-nextjs-default-rtdb.firebaseio.com/events.json"
  );

  // Fetch and load events when data is available
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  // Ensure router and filterData are available
  if (!router.isReady || !filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // Check if the filter values are valid
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // Filter the events based on the year and month
  const filteredEvents = loadedEvents
    ? loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === numYear &&
          eventDate.getMonth() === numMonth - 1
        );
      })
    : [];

  // Handle case where no events are found
  if (filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the selected filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
        <Head>
                  <title>Filtered Events</title>
                  <meta name="description" 
                  content={`All Events for ${numMonth}/${numYear}.`}/>
            </Head> 
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
