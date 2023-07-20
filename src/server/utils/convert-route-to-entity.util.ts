const mapping: Record<string, string> = {
  'crypto-assets': 'crypto_asset',
  organizations: 'organization',
  stakings: 'staking',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
