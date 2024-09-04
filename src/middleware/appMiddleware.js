export const appData = (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    req.langCode = req.headers['language-code'] || 'en';
    req.currencyCode = req.headers['currency-code'] || 'INR';
    req.timeZone = req.headers['time-zone'] || 'UTC';
    next();
}