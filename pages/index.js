import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/event-list';

function HomePage() {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <EventList items={featuredEvents}/>
        </div>
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
        location: data[key].location
      });
    }
  
    return { props: { events: transformedEvents }, revalidate: 120 };
  }

export default HomePage;