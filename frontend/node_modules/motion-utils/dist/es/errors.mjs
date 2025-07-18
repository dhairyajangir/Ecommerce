let warning = () => { };
let invariant = () => { };
if (process.env.NODE_ENV !== "production") {
    const formatMessage = (message, errorCode) => {
        return errorCode
            ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}`
            : message;
    };
    warning = (check, message, errorCode) => {
        if (!check && typeof console !== "undefined") {
            console.warn(formatMessage(message, errorCode));
        }
    };
    invariant = (check, message, errorCode) => {
        if (!check) {
            throw new Error(formatMessage(message, errorCode));
        }
    };
}

export { invariant, warning };
