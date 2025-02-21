<p>Hello {{ $task->user->name ?? 'User' }},</p>
<p>You have created a new task: <strong>{{ $task->title }}</strong>.</p>
<p>Due Date: {{ $task->due_date ?? 'No due date' }}</p>

