import Heading from '@/components/heading';
import PingStatus from '@/components/pings/PingStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { getFavicon } from '@/lib/utils';
import { PingCheckWithRetries, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ChevronLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Pings',
        href: '/pings',
    },
    {
        title: 'Ping details',
        href: `/pings/{ping}`,
    },
    {
        title: 'Ping Checks',
        href: '/pings/{ping}/checks',
    },
];

export default function CheckPage({ check }: { check: PingCheckWithRetries }) {
    console.log(check);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ping Check" />

            <div className="px-4 py-6">
                <Heading title="Ping Check" description="View details of this check" className="flex w-full items-end gap-4">
                    <Button asChild variant="secondary" className="ml-auto">
                        <Link href={`/pings/${check.ping.id}/checks`}>
                            <ChevronLeft />
                            All Checks
                        </Link>
                    </Button>
                </Heading>

                <Separator />

                <div className="mt-6 flex flex-col gap-4">
                    <Card>
                        <CardHeader className="flex gap-2">
                            <span className="flex h-4 w-4 items-center justify-center">
                                <img
                                    src={getFavicon(check.ping.url) ?? undefined}
                                    width={16}
                                    height={16}
                                    className="size-4 object-contain"
                                    alt="favicon"
                                />
                            </span>
                            <div className="flex flex-col gap-2">
                                <CardTitle className="flex items-start gap-2">
                                    <span>{check.ping.url.replace(/^https?:\/\//, '')}</span>
                                </CardTitle>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card className="text-sm">
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <PingStatus status={check.status} />
                                <div className="font-semibold">{dayjs(check.time_checked).format('MMM D YYYY')}</div>
                                <span className="">{dayjs(check.time_checked).format('HH:mm:ss')}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Retries</CardTitle>
                            <CardDescription>View all retries of this ping.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table className="text-xs tracking-wider">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {check.retries.map((check) => (
                                        <TableRow key={check.id}>
                                            <TableCell>
                                                <PingStatus status={check.status} />
                                            </TableCell>
                                            <TableCell className="font-medium">{dayjs(check.time_checked).format('MMM D YYYY')}</TableCell>
                                            <TableCell>
                                                <span className="">{dayjs(check.time_checked).format('HH:mm:ss')}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
