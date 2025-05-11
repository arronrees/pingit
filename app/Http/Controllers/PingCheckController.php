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
        $checks = PingCheck::where('ping_id', $ping->id)->orderBy('time_checked', 'desc')->simplePaginate(15);

        return Inertia::render('checks/index', ['data' => $checks, 'ping' => $ping]);
    }
}
