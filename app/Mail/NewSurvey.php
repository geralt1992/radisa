<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NewSurvey extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $userName;
    public $surveyName;

    public function __construct($userName, $surveyName)
    {
        $this->userName = $userName;
        $this->surveyName = $surveyName;
    }
    
    public function build()
    {   
        return $this->subject('Novi anketni upitnik je dostupan!')
                    ->view('emails.new_survey');
    }
}
