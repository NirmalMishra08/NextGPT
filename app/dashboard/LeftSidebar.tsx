import React from 'react';

const LeftSidebar = () => {
  return (
    <div className="w-64 h-screen overflow-y-auto border-r border-gray-300 bg-gray-100 p-4">
      {/* Navbar */}
      <div className="navbar flex justify-between mb-5">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbklEQVR4nGNgGAUkAg8GBobHDAwM/8nEj6Bm4ASPKDD8P5IlOAFMEa3kGehqwX80PGAWNJBrATHyDWh8qvqgAU9KoooF5ZRaQIx8OS2DiOJIpnkyxQb+j1rwn9ZB9IjWxbUHhZY8IlThjAIGdAAAbpu8bnc8/hUAAAAASUVORK5CYII="
          alt="hide-sidepanel"
        />
        <div className="flex gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
          </svg>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="content flex flex-col gap-4">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2 p-3 bg-white rounded-lg shadow">
            <h1 className="text-sm font-semibold">Today</h1>
            <p  className="text-sm hover:bg-gray-100 rounded-2xl p-2">Decimal to Hexadecimal conversion</p>
            <p  className="text-sm hover:bg-gray-100 rounded-2xl p-2">Decimal to Hexadecimal conversion</p>
            <p  className="text-sm hover:bg-gray-100 rounded-2xl p-2">Decimal to Hexadecimal conversion</p>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
