export type IPushStatusResponse = IApiResponse<IPushStatusPayload>

export interface IPushStatusPayload {
  pushConfigured: boolean;
  subscriptionCount: number;
  unreadCount: number;
}

