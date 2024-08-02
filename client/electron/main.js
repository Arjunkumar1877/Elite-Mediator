import { app, BrowserWindow } from 'electron';
import { fileURLToPath} from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL('http://localhost:5173/super_admin_login');
}

app.whenReady().then(()=>{
    createWindow();

    app.on('activate', ()=>{
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    })
});

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
})
