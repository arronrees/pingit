import { Ping, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Pings',
        href: '/pings',
    },
];

export default function Pings({ pings }: { pings: Ping[] }) {
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
                    <div>
                        {pings &&
                            pings.map((ping) => (
                                <div key={ping.id}>
                                    <Link href={`/pings/${ping.id}`}>{ping.url}</Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
