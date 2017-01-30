<?php

namespace App\Http\Controllers;

use DB;
use App\Calls;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class Callcontroller extends Controller
{
    //use Helpers;
    public function __construct()
    {
        // Only authenticated users can make these calls
        $this->middleware('jwt.auth');
    }

    public function listcallstats()
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (! $user->can('read', Calls::class)) {
            abort(401, 'You are not authorized');
        }

        $calls = Calls::all();
        $stats = [];
        foreach ($calls as $call) {
            $call['stats'] = json_decode($call['stats']);
            $stats[] = $call;
        }
        $response = [
                    'status_code'    => 200,
                    'success'        => true,
                    'message'        => '',
                    'result'         => $stats,
                    ];

        return response()->json($response);
    }
	
	public function list_weeks_callstats()
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (! $user->can('read', Calls::class)) {
            abort(401, 'You are not authorized');
        }
		
		// THIS NEEDS WORK!!! 
		
		/*
		// week old results:
		// $fromDate = Carbon\Carbon::now()->subDays(8)->format('Y-m-d');
		// $tillDate = Carbon\Carbon::now()->subDay()->format('Y-m-d');

		// this week results
		$fromDate = Carbon\Carbon::now()->subDay()->startOfWeek()->toDateString(); // or ->format(..)
		$tillDate = Carbon\Carbon::now()->subDay()->toDateString();

		Calls::selectRaw('date(created_at) as date, COUNT(*) as count'))
			->whereBetween( DB::raw('date(created_at)'), [$fromDate, $tillDate] )
			->where('name',$name->f_name)
			->groupBy('date')
			->orderBy('date', 'DESC')
			->lists('count', 'date');
			
		*/

        $calls = Calls::all();
        $stats = [];
        foreach ($calls as $call) {
            $call['stats'] = json_decode($call['stats']);
            $stats[] = $call;
        }
        $response = [
                    'status_code'    => 200,
                    'success'        => true,
                    'message'        => '',
                    'result'         => $stats,
                    ];

        return response()->json($response);
    }

}
