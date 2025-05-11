import { Badge } from '../ui/badge';

export default function PingStatus({ status }: { status: number }) {
    switch (status.toString()[0]) {
        case '2':
            return (
                <Badge className="border-green-200 bg-green-200/70 text-green-800 dark:border-green-700/70 dark:bg-green-800/50 dark:text-white">
                    {status}
                </Badge>
            );
        case '3':
            return (
                <Badge className="border-sky-200 bg-sky-200/70 text-sky-800 dark:border-sky-700/70 dark:bg-sky-800/50 dark:text-white">
                    {status}
                </Badge>
            );
        case '4':
            return (
                <Badge className="border-amber-200 bg-amber-200/70 text-amber-800 dark:border-amber-700/70 dark:bg-amber-800/50 dark:text-white">
                    {status}
                </Badge>
            );
        case '5':
            return (
                <Badge className="border-rose-200 bg-rose-200/70 text-rose-800 dark:border-rose-700/70 dark:bg-rose-800/50 dark:text-white">
                    {status}
                </Badge>
            );

        default:
            break;
    }

    return <Badge>{status}</Badge>;
}
