import { PingWithChecksAndRetries, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import Heading from '@/components/heading';
import PingChecks from '@/components/pings/PingChecks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { intervals } from '@/lib/constants';
import { getFavicon } from '@/lib/utils';
import dayjs from 'dayjs';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Pings',
        href: '/pings',
    },
    {
        title: 'Ping details',
        href: `/pings/{ping}`,
    },
];

export default function ShowPing({ ping }: { ping: PingWithChecksAndRetries }) {
    const [nextPing, setNextPing] = useState<number | null>(null);

    useEffect(() => {
        if (ping.checks.length > 0) {
            const lastCheck = dayjs(ping.checks[0].time_checked);
            const interval = ping.interval;

            setNextPing(Math.round((lastCheck.diff() / 1000 + interval) / 60));
        }
    }, [ping]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ping details" />

            <div className="px-4 py-6">
                <Heading title="Ping details" description="View ping details" className="flex w-full items-end gap-4">
                    <Button asChild variant="secondary" className="ml-auto">
                        <Link href="/pings">
                            <ChevronLeft />
                            All Pings
                        </Link>
                    </Button>
                </Heading>

                <div className="mb-6">
                    <Button asChild>
                        <Link href={`/pings/${ping.id}/edit`}>Edit Ping</Link>
                    </Button>
                </div>

                <Separator />

                <div className="mt-6 flex flex-col gap-4">
                    <Card>
                        <CardHeader className="flex gap-2">
                            <span className="flex h-4 w-4 items-center justify-center">
                                <img src={getFavicon(ping.url) ?? undefined} width={16} height={16} className="size-4 object-contain" alt="favicon" />
                            </span>
                            <div className="flex flex-col gap-2">
                                <CardTitle className="flex items-start gap-2">
                                    <span>{ping.url.replace(/^https?:\/\//, '')}</span>
                                    <a href={ping.url} target="_blank" rel="noreferrer noopener">
                                        <ExternalLink className="size-4" />
                                    </a>
                                </CardTitle>
                                {ping.active ? (
                                    <CardDescription className="flex flex-col gap-1">
                                        <span>Pinging every {intervals.find((i) => i.value === ping.interval)?.label}</span>
                                        {nextPing && (
                                            <span>
                                                Next ping scheduled in {nextPing} {nextPing === 1 ? 'minute' : 'minutes'}
                                            </span>
                                        )}
                                    </CardDescription>
                                ) : (
                                    <CardDescription>Pinging currently paused. Please activate ping to resume.</CardDescription>
                                )}
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-end gap-2">
                            <div className="flex flex-col gap-2">
                                <CardTitle>Previous Checks</CardTitle>
                                <CardDescription>View 10 latest checks and their results</CardDescription>
                            </div>
                            <Button variant="secondary" className="ml-auto" asChild size="sm">
                                <Link href={`/pings/${ping.id}/checks`}>View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <PingChecks checks={ping.checks} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
