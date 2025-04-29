import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import Heading from '@/components/heading';
import CreatePingForm from '@/components/pings/CreatePingForm';
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
        title: 'Create Ping',
        href: '/pings/create',
    },
];

export default function CreatePing() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Ping" />

            <div className="px-4 py-6">
                <Heading title="Create Ping" description="Create a new ping" className="flex w-full items-end gap-4">
                    <Button asChild variant="secondary" className="ml-auto">
                        <Link href="/pings">
                            <ChevronLeft />
                            All Pings
                        </Link>
                    </Button>
                </Heading>

                <Separator />

                <div className="mt-6">
                    <Card>
                        <CardContent>
                            <CreatePingForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
