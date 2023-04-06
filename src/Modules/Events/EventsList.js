import React from 'react';

const EventList = ({ events }) => {
  return (
    <div className="bg-white rounded-lg px-5 py-6 shadow-md">

      <section className="">
        <h2 className="font-semibold text-gray-900">Events for this day</h2>
        <ul role="list" className="divide-y divide-gray-200">
          {events.length === 0 ? (
            <p className='text-gray-700'>No events available</p>
          ) : (
            events.map((event, index) => (
              <li key={index} className="flex py-4">
                <div className="">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
              </li>
            )))}
        </ul>
      </section>
    </div>
  );
};

export default EventList;