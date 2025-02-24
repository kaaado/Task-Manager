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
public function index(Request $request)
{
    $userId = auth()->id();

    $allTasks = Task::with('subtasks')->where('user_id', $userId)->get();

    $tasks = Task::with('subtasks')->where('user_id', $userId)->paginate($request->input('limit', 10));

    $finalResult = $request->input('limit') ? $tasks : $allTasks;
    
    return response()->json($finalResult);
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
    
    if (!empty($validated['start_date']) && !empty($validated['due_date']) && $validated['due_date'] < $validated['start_date']) {
    return back()->withErrors(['due_date' => 'The due date cannot be earlier than the start date.']);
}


    $task->update($validated);
    return response()->json($task);
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
    
    // Calculate percentages
    public function statistics()
{
    $totalTasks = Task::count();
    $completedTasks = Task::where('status', 'complete')->count();
    $inProgressTasks = Task::where('status', 'inprogress')->count();
    $todoTasks = Task::where('status', 'todo')->count();

    
    $completedPercentage = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100, 2) : 0;
    $inProgressPercentage = $totalTasks > 0 ? round(($inProgressTasks / $totalTasks) * 100, 2) : 0;
    $todoPercentage = $totalTasks > 0 ? round(($todoTasks / $totalTasks) * 100, 2) : 0;

    return response()->json([
        'total_tasks' => $totalTasks,
        'completed_tasks' => $completedTasks,
        'completed_percentage' => $completedPercentage,
        'inprogress_tasks' => $inProgressTasks,
        'inprogress_percentage' => $inProgressPercentage,
        'todo_tasks' => $todoTasks,
        'todo_percentage' => $todoPercentage,
    ]);
}
    
    // Delete a task by ID
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
