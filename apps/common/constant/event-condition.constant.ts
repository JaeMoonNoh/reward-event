export const EVENT_CONDITION = {
    SIGNUP_DAYS: {
        SUCCESS: '회원가입 후 기간 충족',
        FAIL: (maxDays: number) => `회원가입 후 ${maxDays}일 이내여야 합니다.`
    },

    SIGNUP_EVENT :{
        SATISFACTION: '이벤트 조건을 만족해 보상이 지급되었습니다.',
        DISSATISFACTION : '조건을 만족하지 않아 보상을 받을 수 없습니다.'
    }
};

export const EVENT_STATUS = {
    ACTIVE: 'active',
    IN_ACTIVE: 'inactive',
}

export const EVENT_STRATEGY = {
    DAY_SINCE_SIGN_UP : 'daysSinceSignUp',
}