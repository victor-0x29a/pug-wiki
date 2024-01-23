export const getStatusDebugger = () => ({
    isEnabledDebugger: Boolean(process.env.DEBUGGER === 'true')
})