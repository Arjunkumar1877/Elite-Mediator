import React from 'react';

const Sign = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 md:flex-row">
      <div className="hidden md:flex md:w-1/2 lg:w-1/2 items-center justify-center">
        <img src="public/login.jpg" alt="Dummy" className="object-cover w-full h-full" />
      </div>
      <div className="flex w-full md:w-1/2 lg:w-1/2 p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <div className="w-full p-10">
          <h2 className="text-2xl font-bold text-center">Create an account</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your username" />
              <span className="text-green-500 text-xs ml-2">Valid</span>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" />
              <span className="text-green-500 text-xs ml-2">Valid</span>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" id="phone" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your phone" />
              <span className="text-green-500 text-xs ml-2">Valid</span>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your password" />
              <span className="text-green-500 text-xs ml-2">Valid</span>
            </div>
            <div>
              <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <button className="w-full px-4 py-2 mt-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <i className="fab fa-google mr-2"></i> Continue with Google
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">By clicking continue, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Sign;
