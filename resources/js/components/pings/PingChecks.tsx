import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PingCheck } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Button } from '../ui/button';
import PingStatus from './PingStatus';

export default function PingChecks({ checks }: { checks: PingCheck[] }) {
    return (
        <div>
            <Table className="text-xs tracking-wider">
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
                                <PingStatus status={check.status} />
                            </TableCell>
                            <TableCell className="font-semibold">{dayjs(check.time_checked).format('MMM D YYYY')}</TableCell>
                            <TableCell>
                                <span className="">{dayjs(check.time_checked).format('HH:mm:ss')}</span>
                            </TableCell>
                            <TableCell align="right">
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={`/pings/${check.ping_id}/checks/${check.id}`}>View</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
