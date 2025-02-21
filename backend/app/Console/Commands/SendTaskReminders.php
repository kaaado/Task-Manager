<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\TaskController;

class SendTaskReminders extends Command
{
    protected $signature = 'tasks:send-reminders';
    protected $description = 'Send email reminders for tasks due in 24 hours';

    public function handle()
    {
        (new TaskController)->sendDueDateReminders();
        $this->info('Task reminders sent.');
    }
}
