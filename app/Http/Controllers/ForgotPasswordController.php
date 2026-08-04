<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\View\View;

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
            ? request()->json(['message' => 'Link reset password berhasil dikirim.'])
            : request()->json(['message' => __($status)]);
    }

    /**
     * Reset Password Page
     */
    public function resetPasswordPage(Request $request, $token):View{
        $email = $request->input('email');
        return view('app',["title"=>"Reset Password", "email"=>$email, "token"=>$token]);
    }
}
