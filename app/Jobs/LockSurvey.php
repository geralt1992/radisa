<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Survey;

class LockSurvey implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

   
    public function __construct()
    {
        //
    }

    public function handle()
    {
        $surveysToLock = Survey::where('created_at', '<=', now()->subWeek())
        ->where("isActive" , true)
        ->where('isFinished' , false)
        ->get();

        foreach ($surveysToLock as $survey) {
            $survey->isActive = false;
            $survey->isFinished = true;
            $survey->save();
        }
    }
}
