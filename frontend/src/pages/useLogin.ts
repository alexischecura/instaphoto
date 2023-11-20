import { useState } from 'react';

export function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginApi = (credentials: { user: string; password: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(credentials);
    }, 5000);
  };

  return { loginApi, isLoading };
}
