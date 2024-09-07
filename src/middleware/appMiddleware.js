import Label from "../model/Label.js";

export const appData = (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    req.langCode = req.headers['language-code'] || 'en';
    req.currencyCode = req.headers['currency-code'] || 'INR';
    req.timeZone = req.headers['time-zone'] || 'UTC';
    next();
}

export const homePageData = async (req, res, next) => {
    res.locals.labels = {
        'LBL_SIGN_IN': await Label.getLabel('SIGN_IN'),
        'LBL_SIGN_UP': await Label.getLabel('SIGN_UP'),
        'LBL_FIRST_NAME': await Label.getLabel('FIRST_NAME'),
        'LBL_LAST_NAME': await Label.getLabel('LAST_NAME'),
        'LBL_EMAIL_ADDRESS': await Label.getLabel('EMAIL_ADDRESS'),
        'LBL_PASSWORD': await Label.getLabel('PASSWORD'),
        'LBL_REMEMBER_ME': await Label.getLabel('REMEMBER_ME'),
        'LBL_FORGOT_PASSWORD': await Label.getLabel('FORGOT_PASSWORD'),
        'LBL_CONFIRM_PASSWORD': await Label.getLabel('FORGOT_PASSWORD'),
        'LBL_ACCHIVEMENT': await Label.getLabel('#1_FOOD_DELIVERY_SERVICE_SINCE_2010'),
        'LBL_BANNER_TEXT': await Label.getLabel('WE_DELIVER_YOUR_FAVORITE_FOOD_FRESH_&_FAST_IN'),
        'LBL_WHAT_DO_EAT': await Label.getLabel('WHAT_DO_YOU_WANT_TO_EAT?'),
        'LBL_TRENDING_HEADING': await Label.getLabel('TRENDING_FOOD_IN_YOUR_CITY'),
        'LBL_TRENDING_SUB_HEADING': await Label.getLabel('CHOOSE_WHAT_YOU_WANT_AND_WE_DELIVER_IT_TO_YOU'),
        'LBL_BECOME_COURIER': await Label.getLabel('BECOME_A_COURIER'),
        'LBL_BECOME_COURIER_TEXT': await Label.getLabel('EARN_COMPETITIVE_SALARY_AS_DELIVERY_COURIER_WORKING_FLEXIBLE_SCHEDULE'),
        'LBL_BECOME_PARTNER': await Label.getLabel('BECOME_A_PARTNER'),
        'LBL_BECOME_PARTNER_TEXT': await Label.getLabel('GROW_YOUR_BUSINESS_BY_REACHING_NEW_CUSTOMERS'),
        'LBL_PARTNER_WITH_US': await Label.getLabel('PARTNER_WITH_US'),
        'LBL_START_EARNING': await Label.getLabel('START_EARNING'),
        'LBL_RESTURANT_HEADING': await Label.getLabel('POPULAR_RESTAURANTS_IN_YOUR_CITY'),
        'LBL_RESTURANT_SUB_HEADING': await Label.getLabel('CHECK_THE_BEST_RESTAURANTS_NEAR_YOU'),
        'LBL_CUSTOMER_REVIEWS': await Label.getLabel('CUSTOMER_REVIEWS'),
        'LBL_APP_COMING': await Label.getLabel('STAY_TUNED_THE_TASTY_GO_APP_IS_COMING_VERY_SOON'),
        'LBL_APP_COMING_DESC': await Label.getLabel('FAST_DELIVERY_REAL_TIME_TRACKING_FLEXIBLE_PAYMENTS_PERSONALIZED_RECOMMENDATIONS_EXCLUSIVE_OFFERS_USER_REVIEWS_EASY_NAVIGATION'),
    };
    next();
}