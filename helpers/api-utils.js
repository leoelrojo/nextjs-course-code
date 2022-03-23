export async function getFeaturedEvents(events) {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
  const url =
    'https://nextjs-d55b4-default-rtdb.europe-west1.firebasedatabase.app/events.json';

  const response = await fetch(url);
  const data = await response.json();
  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      ...data[key],
    });
  }

  return transformedEvents;
}

export function getEventById(id) {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
}

// export function getFilteredEvents(dateFilter) {
//   const { year, month } = dateFilter;

//   let filteredEvents = DUMMY_EVENTS.filter((event) => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
//     );
//   });

//   return filteredEvents;
// }

// export function getEventById(id) {
//   return DUMMY_EVENTS.find((event) => event.id === id);
// }
