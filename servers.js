const express = require('express');
const ping = require('ping');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuración segura de CORS
const corsOptions = {
    origin: 'http://localhost:5500', // Ajusta esto según tu entorno
    methods: 'GET'
};

app.use(cors(corsOptions));

const servers = [
    { name: "eMuseumWinServer2016", ip: "34.192.111.187" },
    { name: "WindowsServer2016eMuseum", ip: "44.209.215.184" },
    { name: "WindowsServer2016TMS", ip: "44.194.58.189" },
    { name: "Ubuntu1804ProxyWeb", ip: "35.173.162.255" },
    { name: "Ubuntu1804SIGE2", ip: "44.206.129.186" },
    { name: "WindowsServer2012Educacion", ip: "54.86.6.16" },
    { name: "ubuntu-us-southeast-koha-mali-21.05", ip: "172.105.149.22" },
    { name: "ubuntu-us-southeast", ip: "45.56.117.217" },
    { name: "ubuntu-us-central-todoslosfaros", ip: "72.14.187.186" },
    { name: "debian-us-southeast-koha-mali", ip: "23.92.30.222" },
    { name: "Eppa", ip: "143.198.189.133" },
    { name: "Archivo MALI", ip: "137.184.116.59" },
    { name: "vps36015", ip: "173.236.205.147" }
];

app.get('/status', async (req, res) => {
    try {
        const results = await Promise.all(servers.map(async server => {
            try {
                const isAlive = await ping.promise.probe(server.ip, { timeout: 2 });
                return { name: server.name, ip: server.ip, status: isAlive.alive };
            } catch (error) {
                console.error(`❌ Error con ${server.name} (${server.ip}):`, error);
                return { name: server.name, ip: server.ip, status: false };
            }
        }));
        res.json(results);
    } catch (error) {
        console.error('Error en la consulta de estado:', error);
        res.status(500).json({ error: 'Error al obtener el estado de los servidores' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
