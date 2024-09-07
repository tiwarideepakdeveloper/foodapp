import Label from "../model/Label.js";

export const auth = async (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            next();
        } else {
            req.flash('error', await Label.getLabel('UNAUTHORISED_ACCESS'));
            res.redirect('/');
        }
    } catch (error) {
        req.flash('error', await Label.getLabel('SERVER_ERROR'));
        res.redirect('/');
    }
}