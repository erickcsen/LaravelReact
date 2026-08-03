<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    /**
     * Send Email Notification
     */
    public function sendNotification(Request $request){
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        return $status === Password::RESET_LINK_SENT
            ? back()->with('success', 'Link reset password berhasil dikirim.')
            : back()->withErrors(['email' => __($status)]);
    }
}
