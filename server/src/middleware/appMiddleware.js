export const appData = (req, res, next) => {
    req.langCode = req.headers['language-code'] || 'en';
    req.currencyCode = req.headers['currency-code'] || 'INR';
    req.timeZone = req.headers['time-zone'] || 'UTC';
    next();
}