import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Ping } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type EditPing = {
    url: string;
    interval: number;
    active: boolean;
};

export default function EditPingForm({ ping }: { ping: Ping }) {
    const intervals = [
        { value: 3600, label: '1 hour' },
        { value: 7200, label: '2 hours' },
        { value: 10800, label: '3 hours' },
        { value: 21600, label: '6 hours' },
        { value: 43200, label: '12 hours' },
        { value: 86400, label: '24 hours' },
    ];

    const { data, setData, put, errors, processing } = useForm<EditPing>({
        url: ping.url,
        interval: ping.interval,
        active: ping.active,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);
        put(route('pings.update', ping.id));
        console.log(errors);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>

                <Input
                    id="url"
                    className="mt-1 block w-full"
                    value={data.url ?? ''}
                    onChange={(e) => setData('url', e.target.value)}
                    placeholder="https://example.com"
                />

                <InputError className="mt-2" message={errors.url} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="interval">
                    Interval
                    <span className="text-muted-foreground">(seconds)</span>
                </Label>

                <Select onValueChange={(val) => setData('interval', parseInt(val))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={intervals.find((i) => i.value === data.interval)?.label ?? 'Select interval'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3600">1 hour</SelectItem>
                        <SelectItem value="7200">2 hours</SelectItem>
                        <SelectItem value="10800">3 hours</SelectItem>
                        <SelectItem value="21600">6 hours</SelectItem>
                        <SelectItem value="43200">12 hours</SelectItem>
                        <SelectItem value="86400">24 hours</SelectItem>
                    </SelectContent>
                </Select>

                <InputError className="mt-2" message={errors.interval} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="active">Is this ping active?</Label>

                <Switch id="active" className="mt-1" checked={data.active} onCheckedChange={(val) => setData('active', val)} />

                <InputError className="mt-2" message={errors.active} />
            </div>

            <div>
                <Button disabled={processing}>Save</Button>
            </div>
        </form>
    );
}
