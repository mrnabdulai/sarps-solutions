import { ArrowRightIcon, BuildingOffice2Icon, CheckCircleIcon, ExclamationCircleIcon, UsersIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, ArrowTrendingDownIcon, ChartBarIcon, CreditCardIcon } from "@heroicons/react/24/solid";

export const summarystats = [
    {title: 'Total Completed Applications', value: '1100', icon:CheckCircleIcon, color: 'bg-green-500'}, 
      {title: 'Total Pending Applications', value: '1300', icon:ExclamationCircleIcon, color: 'bg-yellow-400'}, 
      {title: 'Total Rejected Applications', value: '1500', icon:XCircleIcon, color: 'bg-red-500'}, 


]

export const humanStats = [
    {title: 'Total Clients', value: '2500', icon:UsersIcon, color: 'bg-green-500', changeType: 'increase', change: '122'},
    {title: 'Total Companies', value: '2500', icon:BuildingOffice2Icon, color: 'bg-green-500', changeType: 'increase', change: '24'},
]