<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('tags')->nullable();
            $table->enum('type', ['task', 'milestone', 'form_response', 'bug', 'project'])->default('task');
            $table->enum('status', ['todo', 'inprogress', 'complete'])->default('todo');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('priority', ['urgent', 'high', 'normal', 'low'])->default('normal');
            $table->boolean('locked')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
