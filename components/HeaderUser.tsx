'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export default function HeaderUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/public';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
    );
  }

  // 🔴 Mostrar solo botón "Sign In" si no hay sesión
  if (!isSignedIn || !user) {
    return (
      <Link
        href="/sign-in"
        className="text-sm font-medium px-4 py-2 border border-gray-800 rounded-full hover:bg-gray-100 transition"
      >
        Sign In
      </Link>
    );
  }

  const displayName =
    user.fullName ||
    `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() ||
    user.emailAddresses[0]?.emailAddress ||
    'User';

  const email = user.emailAddresses[0]?.emailAddress || 'No email';

  const initials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user.firstName
      ? user.firstName[0].toUpperCase()
      : user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || 'U';

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
      {/* Avatar circle */}
      <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
        {initials}
      </div>

      {/* Info */}
      <div className="hidden md:flex flex-col text-left max-w-[160px] truncate">
        <span className="text-sm font-medium text-gray-900 truncate" title={displayName}>
          {displayName}
        </span>
        <span className="text-xs text-gray-500 truncate" title={email}>
          {email}
        </span>
      </div>

      {/* Sign out button */}
      <button
        onClick={handleSignOut}
        title="Sign out"
        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}