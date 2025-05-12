import { Pagination, PaginationContent, PaginationFirst, PaginationItem, PaginationLast, PaginationLink } from '@/components/ui/pagination';
import { PaginatedResponse } from '@/types';

const isBeforeOrAfter = (label: string, current: number, last: number) => {
    if (parseInt(label) === current) return true;
    if (parseInt(label) === current - 1 || parseInt(label) === current + 1) return true;

    if (current === 1) {
        if (parseInt(label) === current + 2) return true;
    }
    if (current === last) {
        if (parseInt(label) === current - 2) return true;
    }

    return false;
};

export default function AppPagination<T>({ data }: { data: PaginatedResponse<T> }) {
    return (
        <div className="flex max-w-max items-start">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {data.first_page_url && data.current_page !== 1 && <PaginationFirst href={data.first_page_url} />}
                    </PaginationItem>
                    {data.links
                        .filter((link) => !!link.url && !!parseInt(link.label) && isBeforeOrAfter(link.label, data.current_page, data.last_page))
                        .map((link) => (
                            <PaginationItem key={link.label}>
                                <PaginationLink href={link.url ?? ''} isActive={link.active}>
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    <PaginationItem>
                        {data.last_page_url && data.current_page !== data.last_page && <PaginationLast href={data.last_page_url} />}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
