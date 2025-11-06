import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
// import ParticipantList from './pages/ParticipantList';
// import Timeline from './pages/Timeline';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-7">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-500 text-lg">
                    Attendance System
                  </span>
                </div>
                
                <div className="hidden md:flex items-center space-x-1">
                  <Link
                    to="/"
                    className="py-4 px-2 text-gray-500 hover:text-blue-500 transition duration-300"
                  >
                    Scanner
                  </Link>
                  <Link
                    to="/participants"
                    className="py-4 px-2 text-gray-500 hover:text-blue-500 transition duration-300"
                  >
                    Participants
                  </Link>
                  <Link
                    to="/timeline"
                    className="py-4 px-2 text-gray-500 hover:text-blue-500 transition duration-300"
                  >
                    Timeline
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/participants" element={<ParticipantList />} /> */}
          {/* <Route path="/timeline" element={<Timeline />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App