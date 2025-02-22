<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;
use App\Models\User;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
    $startDate = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $dueDate = $this->faker->dateTimeBetween($startDate, '+2 months');

        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'tags' => $this->faker->word,
            'type' => $this->faker->randomElement(['task', 'milestone', 'form_response', 'bug', 'project']),
            'status' => $this->faker->randomElement(['todo', 'inprogress', 'complete']),
            'start_date' => $startDate,
            'due_date' => $dueDate,
            'user_id' => User::factory(),
            'priority' => $this->faker->randomElement(['urgent', 'high', 'normal', 'low']),
            'locked' => $this->faker->boolean,
        ];
    }
}

