export const EVENT_COMMANDS = {
    READ: 'event_read',
    READ_ALL: 'event_read_all',
    CREATE: 'event_create',
    UPDATE_STATUS: 'event_status',
    READ_REWARD: 'event_read_reward',
    READ_ALL_REWARD: 'event_read_all_reward',
    READ_REWARD_EVENT: 'event_read_reward_event',
    ADD_REWARD: 'event_add_reward',
    REWARD_EVENT: 'event_reward_event',
} as const;

export type EventCommand = typeof EVENT_COMMANDS[keyof typeof EVENT_COMMANDS];