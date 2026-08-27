export function isLive(launchTime: Date) {
  return new Date() >= launchTime;
}