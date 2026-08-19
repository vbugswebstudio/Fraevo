export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface StreamChatParams {
  messages: ChatMessage[];
  signal?: AbortSignal;
}

export interface LLMProvider {
  readonly id: string;
  streamChat(params: StreamChatParams): AsyncIterable<string>;
}