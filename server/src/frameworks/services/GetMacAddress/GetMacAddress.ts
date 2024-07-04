import { Req, Res } from "../../types/ServerTypes";
import { exec } from 'child_process';
import { IGetMacAddress } from "./IGetMacAddress";


class GetMacAddress implements IGetMacAddress {
     async findMacAddress(req: Req, res: Res): Promise<void> {
        const command = 'getmac'

        exec(command, (error, stdout, stderr) => {
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
            } else {
                res.status(500).send('Unable to retrieve MAC address');
            }
        });
    }
}


export const getMacAddressFromDevice = new GetMacAddress();