import { Fragment } from 'react';

import { getEventById, getAllEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const { loadedEvent } = props.selectedEvent;

  if (!loadedEvent) {
    return <ErrorAlert>
    <p>No event found!</p></ErrorAlert>
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

export async function getStaticProps(context) {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);
  
    if(!event) {
      return { notFound: true }
    }
  
    return {
      props: {
        selectedEvent: event,
      },
    };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const pathsWithParams = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}

export default EventDetailPage;
