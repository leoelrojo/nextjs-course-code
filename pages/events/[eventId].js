import { Fragment, useState } from 'react';
import Head from 'next/head';

import { getEventById } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';
import { getFeaturedEvents } from '../../dummy-data';
import { buildCommentsPath, extractComments } from '../api/comments';

function EventDetailPage(props) {
  const loadedEvent = props.selectedEvent;

  if (!loadedEvent) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{loadedEvent.title}</title>
        <meta name='description' content={loadedEvent.description} />
      </Head>
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
      <Comments eventId={loadedEvent.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  const filePath = buildCommentsPath();
  const data = extractComments(filePath);

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      selectedEvent: event,
      comments: data,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const pathsWithParams = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default EventDetailPage;
