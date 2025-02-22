<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\Subtask;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create users
        //User::factory(5)->create();
        
        Task::factory(10)->create()->each(function ($task) {
            Subtask::factory(3)->create(['task_id' => $task->id]);
        });
    }
}
