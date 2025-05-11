import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Ping {
    id: number;
    url: string;
    interval: number;
    active: boolean;
}

export interface PingCheck {
    id: number;
    status: number;
    time_checked: string;
    ping_id: number;
    ping: Ping;
}

export interface PingCheckRetry {
    id: number;
    status: number;
    time_checked: string;
    ping_check_id: number;
}

export interface PingWithChecks extends Ping {
    checks: PingCheck[];
}

export interface PingWithChecksAndRetries extends PingWithChecks {
    retries: PingCheckRetry[];
}

export interface PingCheckWithRetries extends PingCheck {
    retries: PingCheckRetry[];
}

export interface SimplePaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
}
