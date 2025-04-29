import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type CreatePing = {
    url: string;
    interval: number;
    active: boolean;
};

export default function CreatePingForm() {
    const { data, setData, post, errors, processing } = useForm<CreatePing>({
        url: '',
        interval: 86400,
        active: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);
        post(route('pings.store'));
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
                        <SelectValue placeholder="Select interval" />
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
                <Button disabled={processing}>Create</Button>
            </div>
        </form>
    );
}
