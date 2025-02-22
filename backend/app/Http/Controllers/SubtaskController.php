<?php

namespace App\Http\Controllers;

use App\Models\Subtask;
use App\Models\Task;
use Illuminate\Http\Request;

class SubtaskController extends Controller
{
    // Get all subtasks for a specific task
    public function index(Task $task)
    {
        return response()->json($task->subtasks);
    }

    // Get a specific subtask
    public function show(Task $task, Subtask $subtask)
    {
        return response()->json($subtask);
    }

    // Create a new subtask under a task
    public function store(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,inprogress,complete',
        ]);

        $subtask = $task->subtasks()->create($request->all());
        return response()->json($subtask, 201);
    }

    // Update a subtask
    public function update(Request $request, Task $task, Subtask $subtask)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,inprogress,complete',
        ]);

        $subtask->update($request->all());
        return response()->json($subtask);
    }

    // Delete a subtask
    public function destroy(Task $task, Subtask $subtask)
    {
        $subtask->delete();
        return response()->json(['message' => 'Subtask deleted successfully']);
    }
}
