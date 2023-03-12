import React from 'react'

function UserProfile() {
  return (
   
    <main className="relative -mt-32">
    <div className="mx-auto max-w-screen-lg px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            

                <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                    {/* Profile section */}
                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                        <div>
                            <h2 className="text-lg font-medium leading-6 text-gray-900">Account Details</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Some of this information will be displayed publicly so be careful what you share.
                            </p>
                        </div>

                    

                        <div className="mt-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-8">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="given-name"
                                    value="user@gmail.com"
                                    disabled
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                />
                            </div>

                      
                        </div>
                        <div className="mt-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-8">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="given-name"
                                    value="user@xxxxxx"
                                    disabled
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                />
                            </div>

                      
                        </div>
                    </div>

               
                </form>
            </div>
        </div>
    </div>
</main>
  )
}

export default UserProfile