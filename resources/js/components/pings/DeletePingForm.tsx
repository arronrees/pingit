import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Ping } from '@/types';

export default function DeletePingForm({ ping }: { ping: Ping }) {
    const deletionTextInput = useRef<HTMLInputElement>(null);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm<Required<{ deletionText: string }>>({ deletionText: '' });

    const handleDelete: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('pings.destroy', ping.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => deletionTextInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Delete Ping</p>
                    <p className="text-sm">Remove this ping and all it's history.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Are you sure you want to delete this ping?</DialogTitle>
                        <DialogDescription>
                            Once the ping is deleted, all of its history and data will also be permanently deleted. Please enter 'DELETE' to confirm
                            you would like to permanently delete this ping.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={handleDelete}>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>

                                <Input
                                    id="deletionText"
                                    type="text"
                                    name="deletionText"
                                    ref={deletionTextInput}
                                    value={data.deletionText}
                                    onChange={(e) => setData('deletionText', e.target.value)}
                                    placeholder="DELETE"
                                />

                                <InputError message={errors.deletionText} />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Delete Ping</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
