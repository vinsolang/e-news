<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite; // NEW: Import Socialite
use Exception;

class AuthController extends Controller
{
    // --- Standard Authentication ---

    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            // Ensure unique check works correctly across providers
            'email' => 'required|string|email|max:255|unique:users,email', 
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Revoke any existing tokens and create a new one
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $token,
        ], 201); // Use 201 Created status
    }

    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        $user = Auth::user();
        
        // Revoke all old tokens for security
        $user->tokens()->delete(); 
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Handle user logout (revoke token).
     */
    public function logout(Request $request)
    {
        // Delete the current access token being used
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }
    
    // --- Socialite Authentication (NEW) ---

    /**
     * Redirect the user to the provider authentication page.
     */
    public function redirectToProvider(string $provider)
    {
        // For Sanctum, we redirect and use the state-less mode.
        return Socialite::driver($provider)->stateless()->redirect();
    }

    /**
     * Obtain the user information from the provider.
     */
    public function handleProviderCallback(string $provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
        } catch (Exception $e) {
            // Log error and redirect to a client error page
            return redirect(env('http://localhost:5173', 'http://localhost:3000') . '/auth/socialite-error?message=Provider login failed');
        }

        // 1. Check if user already exists
        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            // 2. User does not exist, create a new one
            $user = User::create([
                'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                'email' => $socialUser->getEmail(),
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
                // Social login doesn't require a password, but we hash a placeholder
                'password' => Hash::make(str()->random(24)), 
            ]);
        } else if (is_null($user->provider_id)) {
            // 3. User exists via standard login, link the social account
            $user->update([
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
            ]);
        }

        // 4. Create new Sanctum token
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        // 5. Redirect back to the frontend with the token in the URL
        // The frontend will parse this and store it in localStorage.
        return redirect(env('http://localhost:5173', 'http://localhost:3000') . '/auth/socialite-callback?token=' . $token . '&user=' . urlencode(json_encode($user)));
    }
}