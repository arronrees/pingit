<?php

namespace App\Http\Controllers;

use App\Models\Ping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
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

    public function create()
    {
        return Inertia::render('pings/create');
    }

    public function store(Request $request)
    {
        $validIntervals = [3600, 7200, 10800, 21600, 43200, 86400];

        $validated = $request->validate([
            'url' => ['required', 'url'],
            'interval' => ['required', Rule::in($validIntervals)],
            'active' => ['required', 'boolean'],
        ]);

        $ping = Ping::create([...$validated, 'user_id' => Auth::user()->id]);

        return redirect()->route('pings.index')->with('success', 'Ping created successfully.');
    }
}
