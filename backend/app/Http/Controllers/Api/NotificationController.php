<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()
            ->notifications()
            ->latest()
            ->take(30)
            ->get();

        return response()->json($notifications);
    }

    public function markRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->update(['is_read' => true]);
        return response()->json(['message' => 'Marked as read']);
    }

    public function markAllRead(Request $request)
    {
        $request->user()->notifications()->update(['is_read' => true]);
        return response()->json(['message' => 'All notifications marked as read']);
    }
}
