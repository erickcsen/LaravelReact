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

    /**
     * Reset Password Execute
     */
    public function resetPasswordExecute(Request $request){

        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);


        $status = Password::reset(
            $request->only(
                'email',
                'password',
                'password_confirmation',
                'token'
            ),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? request()->json(["Reset Password Success"])
            : back()->withErrors(['email' => [__($status)]]);
    }
}
