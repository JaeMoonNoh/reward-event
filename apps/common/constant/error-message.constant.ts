export const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: '아이디와 비밀번호를 다시 확인해주세요.',
    USER_NOT_FOUND: '사용자 정보가 사라졌습니다.',
    UNAUTHORIZED: '접근 권한이 없습니다.',
    DUPLICATE_USER: '이미 가입된 사용자입니다.',
    INVALID_MONGO_ID: '유효하지 않은 DB 아이디입니다.',
    ALREADY_REWARD: '이미 보상을 받은 이벤트입니다.',
    NOT_FOUND_EVENT: '이벤트를 찾지 못했습니다.',
    NOT_EVENT_PERIOD: '이벤트 기간이 아닙니다.',
    NOT_ACTIVE_EVENT: '이베트가 활성화되지 않았습니다.',
    HAVE_NOT_REWARD: '해당 이벤트에 보상이 존재하지 않습니다.',
    HAVE_NOT_UPDATEED: '업데이트된 이벤트가 없습니다.',
    
    UNSUPPORTED_CONDITION: (conditionKey: string) => `지원하지 않는 조건(${conditionKey})입니다.`,
};