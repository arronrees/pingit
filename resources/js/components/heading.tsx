import { cn } from '@/lib/utils';

export default function Heading({
    title,
    description,
    children,
    className,
}: {
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('mb-8', className)}>
            <div className="space-y-0.5">
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
            {children}
        </div>
    );
}
