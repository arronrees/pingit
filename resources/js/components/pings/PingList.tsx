import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { intervals } from '@/lib/constants';
import { getFavicon } from '@/lib/utils';
import { Ping } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function PingList({ pings }: { pings: Ping[] }) {
    return (
        <div className="flex flex-col gap-4">
            {pings.map((ping) => (
                <Link href={`/pings/${ping.id}`} key={ping.id}>
                    <Card className="hover:bg-muted/50 dark:hover:bg-muted/25">
                        <CardHeader className="flex gap-2">
                            <span className="flex h-[1lh] w-[1lh] items-center justify-center">
                                <Img src={getFavicon(ping.url) ?? undefined} />
                            </span>
                            <div className="flex flex-col gap-2">
                                <CardTitle className="flex items-start gap-2">
                                    <span className="">{ping.url.replace(/^https?:\/\//, '')}</span>
                                </CardTitle>
                                <CardDescription className="flex flex-col gap-1">
                                    <span>Pinging every {intervals.find((i) => i.value === ping.interval)?.label}</span>
                                </CardDescription>
                            </div>
                            <Button variant="secondary" className="ml-auto hidden sm:flex">
                                View
                            </Button>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

function Img({ src }: { src?: string }) {
    const [isBroken, setIsBroken] = useState(false);

    function handleError() {
        setIsBroken(true);
    }

    if (isBroken) {
        return <span className="block w-5"></span>;
    }

    return (
        <picture>
            <img src={src} onError={handleError} width={16} height={16} className="size-5 object-contain" alt="favicon" />
        </picture>
    );
}
