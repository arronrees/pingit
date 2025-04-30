import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PingCheck } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function PingChecks({ checks }: { checks: PingCheck[] }) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {checks.map((check) => (
                        <TableRow key={check.id}>
                            <TableCell>
                                <Status status={check.status} />
                            </TableCell>
                            <TableCell className="font-medium">{dayjs(check.time_checked).format('MMM D YYYY')}</TableCell>
                            <TableCell>{new Date(check.time_checked).toDateString()}</TableCell>
                            <TableCell>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={`/pings/${check.ping_id}/${check.id}`}>View</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function Status({ status }: { status: number }) {
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
