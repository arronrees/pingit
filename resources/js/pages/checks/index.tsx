import AppPagination from '@/components/app-pagination';
import Heading from '@/components/heading';
import PingChecks from '@/components/pings/PingChecks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { getFavicon } from '@/lib/utils';
import { PaginatedResponse, Ping, PingCheck, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
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

export default function Checks({ data, ping }: { data: PaginatedResponse<PingCheck>; ping: Ping }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ping Checks" />

            <div className="px-4 py-6">
                <Heading title="Ping Checks" description="View all checks of this ping" className="flex w-full items-end gap-4">
                    <Button asChild variant="secondary" className="ml-auto">
                        <Link href={`/pings/${ping.id}`}>
                            <ChevronLeft />
                            Back to Ping
                        </Link>
                    </Button>
                </Heading>

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
                                </CardTitle>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Previous Checks</CardTitle>
                            <CardDescription>View all previous checks and their results</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PingChecks checks={data.data} />
                        </CardContent>
                        {(data.next_page_url || data.prev_page_url) && (
                            <CardFooter className="flex justify-between gap-4">
                                <div>
                                    <AppPagination<Ping> data={data} />
                                </div>
                                <div className="text-xs font-bold tracking-wider uppercase">Page {data.current_page}</div>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
