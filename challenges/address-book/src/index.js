"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        this.contacts = [];
    }
    AddressBook.prototype.addContact = function (contact) {
        this.contacts.push(contact);
    };
    AddressBook.prototype.findContactByName = function (filter) {
        return this.contacts.filter(function (c) {
            if (typeof filter.firstName !== "undefined" &&
                c.firstName !== filter.firstName) {
                return false;
            }
            if (typeof filter.lastName !== "undefined" &&
                c.lastName !== filter.lastName) {
                return false;
            }
            return true;
        });
    };
    return AddressBook;
}());
exports.AddressBook = AddressBook;
function formatDate(date) {
    return (date
        .toISOString()
        .replace(/[-:]+/g, "")
        .split(".")[0] + "Z");
}
exports.formatDate = formatDate;
function getFullName(contact) {
    return [contact.firstName, contact.middleName, contact.lastName]
        .filter(Boolean)
        .join(" ");
}
function getVcardText(contact, date) {
    if (date === void 0) { date = new Date(); }
    var parts = __spreadArrays([
        "BEGIN:VCARD",
        "VERSION:2.1",
        "N:" + contact.lastName + ";" + contact.firstName + ";" + (contact.middleName ||
            "") + ";" + (contact.salutation || ""),
        "FN:" + getFullName(contact)
    ], Object.keys(contact.phones).map(function (phName) { return "TEL;" + phName.toUpperCase() + ";VOICE:" + contact.phones[phName]; }), Object.keys(contact.addresses)
        .map(function (addrName) {
        var address = contact.addresses[addrName];
        if (address) {
            return "ADR;" + addrName.toUpperCase() + ":;;" + address.houseNumber + " " + address.street + ";" + address.city + ";" + address.state + ";" + address.postalCode + ";" + address.country + "\nLABEL;" + addrName.toUpperCase() + ";ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:" + address.houseNumber + " " + address.street + ".=0D=0A=" + address.city + ", " + address.state + " " + address.postalCode + "=0D=0A" + address.country;
        }
        else {
            return "";
        }
    })
        .filter(Boolean));
    if (contact.email) {
        parts.push("EMAIL:" + contact.email);
    }
    var d = new Date();
    parts.push("REV:" + formatDate(date));
    parts.push("END:VCARD");
    return parts.join("\n");
}
exports.getVcardText = getVcardText;
