import { BanknotesIcon, ChevronRightIcon, HashtagIcon, ScaleIcon } from '@heroicons/react/24/outline'
import { sentenceCase } from 'change-case'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Axios from '../../../Shared/utils/axios_instance'

function AgentsDashboard() {
    const [earnings, setEarnings] = React.useState(0)
    const [payouts, setPayouts] = React.useState(0)
    const [fetchingPayouts, setFetchingPayouts] = React.useState(false)
    const cards = [
        { name: 'Earnings', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
        // More items...
      ]
      const transactions = [
        {
          id: 1,
          name: 'Payment to Molly Sanders',
          href: '#',
          amount: '$20,000',
          currency: 'USD',
          status: 'success',
          date: 'July 11, 2020',
          datetime: '2020-07-11',
        },
        // More transactions...
      ]
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
      const statusStyles = {
        success: 'bg-green-100 text-green-800',
        processing: 'bg-yellow-100 text-yellow-800',
        failed: 'bg-gray-100 text-gray-800',
    }
    const {agent} = useSelector(state => state.agentReducer)
    useEffect(() => {

      if(agent){
        const getEarnings = async () => {
          const response = await Axios.get("api/user/getCommissionByUser/" + agent.refCode, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
          })
          setEarnings(response.data)
        }

        const fetchPayouts = async () => {
          setFetchingPayouts(true)
          try{
          const response = await Axios.get("/api/payout/getPayoutsByUserId/" + agent.id, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
          })
          setPayouts(response.data)
        }catch(err){
          console.log(err)
          alert("Error fetching payouts")
        }
        finally{
          setFetchingPayouts(false)

        }
        }
        getEarnings()
        fetchPayouts()
      }
      
    }, [agent])
  return (
    <main className="flex-1 pb-8">
    {/* Page header */}
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="min-w-0 flex-1">
            {/* Profile */}
            <div className="flex items-center">
            <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
              <div>
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full sm:hidden"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                    alt=""
                  />
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                  Hello, {agent?.firstName || ""} {agent?.lastName || ""}
                  </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Company</dt>
                  <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                  <span>AGENT CODE: </span>
                    <HashtagIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    {agent?.refCode || ""}
                  </dd>
                  {/* <dt className="sr-only">Account status</dt>
                  <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                    <CheckCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                      aria-hidden="true"
                    />
                    Verified account
                  </dd> */}
                </dl>
              </div>
            </div>
          </div>
          {/* <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Add money
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Send money
            </button>
          </div> */}
        </div>
      </div>
    </div>

    <div className="mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
         
            <div  className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ScaleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Earnings</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{earnings ? `GHC ${earnings}` : <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg> }</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  {/* <a href={card.href} className="font-medium text-cyan-700 hover:text-cyan-900">
                    View all
                  </a> */}
                </div>
              </div>
            </div>
       
        </div>
      </div>

      <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
        Payouts
      </h2>

      {/* <div className="shadow sm:hidden">
                <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  {transactions.map((transaction) => (
                    <li key={transaction.id}>
                      <a href={transaction.href} className="block bg-white px-4 py-4 hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex flex-1 space-x-2 truncate">
                            <BanknotesIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span className="flex flex-col truncate text-sm text-gray-500">
                              <span className="truncate">{transaction.name}</span>
                              <span>
                                <span className="font-medium text-gray-900">{transaction.amount}</span>{' '}
                                {transaction.currency}
                              </span>
                              <time dateTime={transaction.datetime}>{transaction.date}</time>
                            </span>
                          </span>
                          <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <nav
                  className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
                  aria-label="Pagination"
                >
                  <div className="flex flex-1 justify-between">
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Next
                    </a>
                  </div>
                </nav>
              </div> */}

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              #
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Transaction
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Amount
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Payment Method
                            </th>
                            <th
                              className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                              scope="col"
                            >
                              Status
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {fetchingPayouts ?  
                            [0, 0, 0, 0].map((shimmer, index) => (
                            <tr key={index} className="animate-pulse">
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium h-2 bg-slate-700 rounded sm:w-auto sm:max-w-none sm:pl-6">
                                    <div className='h-5 w-5  bg-gray-300 rounded'></div>


                                </td>
                                <td className="hidden px-3 py-4 text-sm  rounded lg:table-cell">
                                    <div className='h-2 bg-gray-300 rounded'></div>
                                </td>
                                <td className="hidden px-3 py-4 text-sm h-2 bg-slate-700 rounded sm:table-cell">
                                    <div className='h-2 bg-gray-300 rounded'></div>


                                </td>
                                <td className="hidden px-3 py-4 text-sm h-2 bg-slate-700 rounded sm:table-cell">

                                    <div className='h-2 bg-gray-300 rounded'></div>

                                </td>
                                <td className="hidden px-3 py-4 text-sm h-2 bg-slate-700 rounded sm:table-cell">

                                    <div className='h-2 bg-gray-300 rounded'></div>

                                </td>

                                <td className="hidden px-3 py-4 text-sm text-center h-2 bg-slate-700 rounded sm:table-cell">
                                    <div className='h-2 bg-gray-300 rounded'></div>

                                </td>
                              
                            </tr>
                          ) ): payouts.length > 0 ?  payouts.map((payout) => (
                            <tr key={payout.id} className="bg-white">
                              <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                              {payout.id}
                              </td>
                              <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                <div className="flex">
                                  <a href={payout.href} className="group inline-flex space-x-2 truncate text-sm">
                                    <BanknotesIcon
                                      className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    <p className="truncate text-gray-500 group-hover:text-gray-900">
                                      {payout.description}
                                    </p>
                                  </a>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                <span className="font-medium text-gray-900">GHC{payout.amount}</span>
                              
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                <span className="font-medium text-gray-900">GHC{sentenceCase(payout.payment_method)}</span>
                              
                              </td>
                              <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                <span
                                  className={classNames(
                                    statusStyles[payout.status],
                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                  )}
                                >
                                  {payout.status}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                <time dateTime={payout.createdAt}>{payout.createdAt}</time>
                              </td>
                            </tr>
                          )) : (
                            <tr>
                            <td colspan={6} className="text-center py-4">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>


                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Payouts made yet</h3>
                                {/* <p className="mt-1 text-sm text-gray-500">Get started by filling a complaint.</p> */}
                                <div className="mt-6">

                                </div>

                            </td>
                        </tr>
                          )}
                        </tbody>
                      </table>
                      {/* Pagination */}
                      {/* <nav
                        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                        aria-label="Pagination"
                      >
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">20</span> results
                          </p>
                        </div>
                        <div className="flex flex-1 justify-between sm:justify-end">
                          <a
                            href="#"
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Previous
                          </a>
                          <a
                            href="#"
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Next
                          </a>
                        </div>
                      </nav> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

  </main>
  )
}

export default AgentsDashboard