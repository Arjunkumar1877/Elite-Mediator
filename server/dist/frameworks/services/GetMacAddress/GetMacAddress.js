"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMacAddressFromDevice = void 0;
const child_process_1 = require("child_process");
class GetMacAddress {
    findMacAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = 'getmac';
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    res.status(500).send(`Error executing command: ${error.message}`);
                    return;
                }
                const lines = stdout.trim().split('\n');
                if (lines.length >= 3) {
                    const macAddressLine = lines[2].trim();
                    const macAddress = macAddressLine.split(/\s+/)[0];
                    console.log(`MAC Address: ${macAddress}`);
                    res.json(macAddress);
                }
                else {
                    res.status(500).send('Unable to retrieve MAC address');
                }
            });
        });
    }
}
exports.getMacAddressFromDevice = new GetMacAddress();
