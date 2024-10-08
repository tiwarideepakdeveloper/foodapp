import Label from "./Label.js";

export default class Permission {
    #error = '';
    #langCode;

    constructor(langCode = 'en') {
        this.#langCode = langCode;
    }

    static getPermissions = function () {
        return [
            'user_view',
            'user_create',
            'user_update',
            'user_delete',
            'product_view',
            'product_create',
            'product_update',
            'product_delete',
            'cms_view',
            'cms_create',
            'cms_update',
            'cms_delete',
            'language_view',
            'language_create',
            'language_update',
            'language_delete',
            'pmethod_view',
            'pmethod_create',
            'pmethod_update',
            'pmethod_delete',
            'role_view',
            'role_create',
            'role_update',
            'role_delete',
        ];
    }

    validatePermissions = async (permissions) => {
        const exisitPermission = Permission.getPermissions().filter((elem) => !permissions.includes(elem));
        if (exisitPermission.length) {
            this.#error = await Label.getLabel('INVALID_PERMISSIONS', this.#langCode);
            return false;
        }
        return true;
    }

    getError = () => this.#error;
};