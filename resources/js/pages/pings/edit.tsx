import { Ping, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import Heading from '@/components/heading';
import DeletePingForm from '@/components/pings/DeletePingForm';
import EditPingForm from '@/components/pings/EditPingForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { ChevronLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Pings',
        href: '/pings',
    },
    {
        title: 'Ping Details',
        href: `/pings/{ping}`,
    },
    {
        title: 'Edit Ping',
        href: '/pings/{ping}/edit',
    },
];

export default function EditPing({ ping }: { ping: Ping }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Ping" />

            <div className="px-4 py-6">
                <Heading title="Edit Ping" description="Edit ping details" className="flex w-full items-end gap-4">
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
                        <CardContent>
                            <EditPingForm ping={ping} />
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6">
                    <DeletePingForm ping={ping} />
                </div>
            </div>
        </AppLayout>
    );
}
