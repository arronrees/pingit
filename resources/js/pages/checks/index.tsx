import Heading from '@/components/heading';
import PingChecks from '@/components/pings/PingChecks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Ping, PingCheck, type BreadcrumbItem } from '@/types';
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

export default function Checks({ checks, ping }: { checks: PingCheck[]; ping: Ping }) {
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
                            <PingChecks checks={checks} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
