import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const { loadedEvent } = props;

  if (!loadedEvent) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <EventSummary title={loadedEvent.title} />
      <EventLogistics
        date={loadedEvent.date}
        address={loadedEvent.location}
        image={loadedEvent.image}
        imageAlt={loadedEvent.title}
      />
      <EventContent>
        <p>{loadedEvent.description}</p>
      </EventContent>
    </Fragment>
  );
}

async function getData() {
  const url =
    'https://nextjs-d55b4-default-rtdb.europe-west1.firebasedatabase.app/events.json';

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function getStaticProps(context) {
    const { params } = context;

    const eventTitle = params.eTitle;
  
    const data = await getData();
  
    const event = data.events.find((event) => event.title === eventTitle);
  
    if(!event) {
      return { notFound: true }
    }
  
    return {
      props: {
        loadedEvents: event,
      },
    };
}

export async function getStaticPaths() {
  const data = await getData();

  const titles = data.events.map((event) => event.title);

  const pathsWithParams = titles.map((title) => ({ params: { eTitle: title } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default EventDetailPage;
