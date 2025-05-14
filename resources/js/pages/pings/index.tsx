import AppPagination from '@/components/app-pagination';
import Heading from '@/components/heading';
import PingList from '@/components/pings/PingList';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Ping, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Pings',
        href: '/pings',
    },
];

export default function Pings({ data }: { data: PaginatedResponse<Ping> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Your Pings" />

            <div className="px-4 py-6">
                <Heading title="Your Pings" description="View and manage your pings" />

                <div className="mb-6">
                    <Button asChild>
                        <Link href="/pings/create">Create New Ping</Link>
                    </Button>
                </div>

                <Separator />

                <div className="mt-6">
                    <div>{data.data && <PingList pings={data.data} />}</div>
                </div>

                <div className="mt-6">{data.total > data.per_page && <AppPagination<Ping> data={data} />}</div>
            </div>
        </AppLayout>
    );
}
