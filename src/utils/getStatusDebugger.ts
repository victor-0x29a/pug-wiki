export const getStatusDebugger = () => ({
    isEnabledDebugger: process.env.NODE_ENV === 'dev'
})