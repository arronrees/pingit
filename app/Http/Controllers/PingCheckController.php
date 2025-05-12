<?php

namespace App\Http\Controllers;

use App\Models\Ping;
use App\Models\PingCheck;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PingCheckController extends Controller
{
    public function index(Ping $ping)
    {
        $checks = PingCheck::where('ping_id', $ping->id)->orderBy('time_checked', 'desc')->paginate(15);

        return Inertia::render('checks/index', ['data' => $checks, 'ping' => $ping]);
    }

    public function show(Ping $ping, PingCheck $check)
    {
        $check->load('ping');
        $check->load(['retries' => fn($query) => $query->orderBy('time_checked', 'desc')->take(10)]);

        return Inertia::render('checks/show', ['check' => $check]);
    }
}
