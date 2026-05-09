export function useAppInfo(): {
  appName: string;
  appNameCapital: string;
} {
  const appName = "Note Trainer";
  const appNameCapital = appName.toUpperCase();

  return {
    appName,
    appNameCapital,
  };
}
