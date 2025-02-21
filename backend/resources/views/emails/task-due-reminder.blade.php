<p>Hello {{ $task->user->name }},</p>
<p>This is a reminder that your task <strong>{{ $task->title }}</strong> is due soon.</p>
<p>Due Date: {{ $task->due_date->format('Y-m-d H:i:s') }}</p>
<p>Please complete it before the deadline.</p>
