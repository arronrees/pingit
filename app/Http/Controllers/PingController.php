<?php

namespace App\Http\Controllers;

use App\Models\Ping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PingController extends Controller
{
    public function index()
    {
        $pings = Ping::where('user_id', Auth::user()->id)->get();

        return Inertia::render('pings/index', ['pings' => $pings]);
    }

    public function show(Ping $ping)
    {
        $ping->load('checks');

        return Inertia::render('pings/show', ['ping' => $ping]);
    }
}
