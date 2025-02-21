<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Subtask;
use Illuminate\Http\Request;
use App\Mail\TaskCreated;
use App\Mail\TaskDueReminder;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Carbon\Carbon;

class TaskController extends Controller
{
    // Get all tasks
    public function index()
    {
        $tasks = Task::with('subtasks')->get();
        return response()->json($tasks);
    }

    // Get a specific task by ID
    public function show($id)
    {
        $task = Task::with('subtasks')->findOrFail($id);
        return response()->json($task);
    }

    // Add a new task
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tags' => 'nullable|string',
            'type' => 'required|in:task,milestone,form_response,bug,project',
            'status' => 'required|in:todo,inprogress,complete',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
            'priority' => 'required|in:urgent,high,normal,low',
            'locked' => 'nullable|boolean',
        ]);

        $task = Task::create($validated);

        // Send email notification 
        Mail::to($task->user->email)->queue(new TaskCreated($task->load('user')));


        return response()->json($task, 200);
    }

    // Edit a task by ID
 public function update(Request $request, Task $task)
{
    if ($task->user_id !== auth()->id()) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $validated = $request->validate([
        'title' => 'sometimes|string|max:255',
        'description' => 'nullable|string',
        'tags' => 'nullable|string',
        'type' => 'sometimes|in:task,milestone,form_response,bug,project',
        'status' => 'sometimes|in:todo,inprogress,complete',
        'priority' => 'sometimes|in:urgent,high,normal,low',
        'locked' => 'nullable|boolean',
    ]);

    $task->update($validated);
    return response()->json($task);
}



    // Search for tasks by query
  public function search($query)
{
    $tasks = Task::where('title', 'like', "%{$query}%")
        ->orWhere('description', 'like', "%{$query}%")
        ->orWhere('tags', 'like', "%{$query}%")
        ->get();

    return response()->json($tasks);
}


    // Send email notification when due date is less than 24 hours away
    public function sendDueDateReminders()
    {
       $tasks = Task::where('due_date', '<=', Carbon::now()->addHours(24))
    ->where('due_date', '>', Carbon::now())
    ->where('user_id', auth()->id())
    ->get();


        foreach ($tasks as $task) {
            Mail::to($task->user->email)->queue(new TaskDueReminder($task));
        }

        return response()->json(['message' => 'Due date reminders sent successfully']);
    }
    
    
    // Delete a task by ID
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
