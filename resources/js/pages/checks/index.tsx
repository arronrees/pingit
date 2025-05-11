import Heading from '@/components/heading';
import PingChecks from '@/components/pings/PingChecks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Ping, PingCheck, SimplePaginatedResponse, type BreadcrumbItem } from '@/types';
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

export default function Checks({ data, ping }: { data: SimplePaginatedResponse<PingCheck>; ping: Ping }) {
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

                <div className="mt-6">
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
                                    <Pagination>
                                        <PaginationContent>
                                            {data.prev_page_url && (
                                                <PaginationItem>
                                                    <PaginationPrevious href={data.prev_page_url ?? ''} />
                                                </PaginationItem>
                                            )}
                                            {data.next_page_url && (
                                                <PaginationItem>
                                                    <PaginationNext href={data.next_page_url ?? ''} />
                                                </PaginationItem>
                                            )}
                                        </PaginationContent>
                                    </Pagination>
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
