import { ArrowRightIcon, BuildingOffice2Icon, UsersIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, ArrowTrendingDownIcon, ChartBarIcon, CreditCardIcon } from "@heroicons/react/24/solid";

export const summarystats = [
      {title: 'Total Income', value: '2500', icon:ChartBarIcon, color: 'bg-green-500'}, 
      {title: 'Total Expense', value: '1300', icon:ArrowTrendingDownIcon, color: 'bg-red-500'}, 
      {title: 'Income Today', value: '1100', icon:CreditCardIcon, color: 'bg-indigo-500'}, 
      {title: 'Expense Today', value: '1500', icon:ArrowLeftIcon, color: 'bg-orange-500'}, 
      {title: 'Income This Month', value: '1200', icon:ArrowLeftIcon, color: 'bg-teal-500'}, 
      {title: 'Expense This Month', value: '1800', icon:ArrowRightIcon, color: 'bg-purple-500'}, 

]

export const humanStats = [
    {title: 'Total Clients', value: '2500', icon:UsersIcon, color: 'bg-green-500', changeType: 'increase', change: '122'},
    {title: 'Total Companies', value: '2500', icon:BuildingOffice2Icon, color: 'bg-green-500', changeType: 'increase', change: '24'},
]