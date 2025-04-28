import { Ping, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { ChevronLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Pings',
        href: '/pings',
    },
];

export default function ShowPing({ ping }: { ping: Ping }) {
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

                <Separator />

                <div className="mt-6">
                    <div>{ping && ping.url}</div>
                </div>
            </div>
        </AppLayout>
    );
}
