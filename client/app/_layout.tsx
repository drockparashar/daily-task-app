import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { TaskProvider } from '@/context/TaskContext';
import { useRouter } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  useFrameworkReady();
  const router = useRouter();
  // Wrap children with AuthProvider
  return (
    <AuthProvider>
      <AuthGate>{/* children below will only render if authenticated */}
        <TaskProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="auth" />
          </Stack>
          <StatusBar style="auto" />
        </TaskProvider>
      </AuthGate>
    </AuthProvider>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth'); // Correctly route to the auth screen
    }
  }, [user, loading]);
  if (loading) return null;
  if (!user) return null;
  return <>{children}</>;
}