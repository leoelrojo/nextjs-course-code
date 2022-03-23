import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import { Fragment } from 'react';

function AllEventsPage(props) {
  const [events2, setEvents2] = useState();
  const [isLoading, setIsLoading] = useState(false);  
  const events = props.events;

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://nextjs-d55b4-default-rtdb.europe-west1.firebasedatabase.app/events.json'
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedEvents = [];
        console.log(data);

        for (const key in data) {
          transformedEvents.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setEvents2(transformedEvents);
        setIsLoading(false);
      });
  }, []);


  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const url =
    'https://nextjs-d55b4-default-rtdb.europe-west1.firebasedatabase.app/events.json';

  const response = await fetch(url);
  const data = await response.json();
  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      title: data[key].title,
      description: data[key].description,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
      location: data[key].location,
    });
  }

  return { props: { events: transformedEvents }, revalidate: 120 };
}

export default AllEventsPage;
